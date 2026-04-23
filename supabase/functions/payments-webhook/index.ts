import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Types
type WebhookEvent = {
  event_type: string;
  type: string;
  stripe_event_id: string;
  created_at: string;
  modified_at: string;
  data: any;
};

type SubscriptionData = {
  stripe_id: string;
  user_id: string;
  price_id: string;
  stripe_price_id: string;
  currency: string;
  interval: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  amount: number;
  started_at: number;
  customer_id: string;
  metadata: Record<string, any>;
  canceled_at?: number;
  ended_at?: number;
};

// Credit constants
const TRIAL_CREDIT_CAP = 10_000;        // ~30 screened calls during 7-day trial
const PAID_CREDIT_CAP  = 1_000_000;     // 1M fair-use cap for "Unlimited" paid plan

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Look up the Supabase user_id for a given stripe subscription.
 * Checks subscription metadata first, then falls back to customer email → profiles.
 */
async function resolveUserId(
  supabaseClient: any,
  subscription: any
): Promise<string | null> {
  let userId: string | null =
    subscription.metadata?.user_id ||
    subscription.metadata?.userId ||
    null;

  if (userId) return userId;

  try {
    const customer = await stripe.customers.retrieve(subscription.customer) as any;
    const email = customer.email;
    if (!email) return null;

    const { data } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    return data?.id ?? null;
  } catch (err) {
    console.error('resolveUserId fallback failed:', err);
    return null;
  }
}

/**
 * Apply credit allocation to a user's profile and log it as a credit_grant webhook_event.
 */
async function applyCredits(
  supabaseClient: any,
  userId: string,
  credits: number,
  cap: number,
  planTier: string,
  reason: string,
  stripeEventId: string
): Promise<void> {
  // Fetch current balance for delta calculation
  const { data: profileBefore } = await supabaseClient
    .from('profiles')
    .select('credits_balance')
    .eq('id', userId)
    .maybeSingle();

  const previousBalance: number = profileBefore?.credits_balance ?? 0;
  const delta = credits - previousBalance;

  const { error } = await supabaseClient
    .from('profiles')
    .update({
      credits_balance: credits,
      credit_cap: cap,
      plan_tier: planTier,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Error applying credits to profile:', error);
    throw error;
  }

  // Log to credit_transactions for audit trail
  // Columns: id, user_id, amount, transaction_type, reference_id, description, balance_after, metadata, created_at
  const { error: txError } = await supabaseClient.from('credit_transactions').insert({
    user_id: userId,
    amount: delta,
    balance_after: credits,
    transaction_type: 'credit_grant',
    description: reason,
    metadata: {
      credit_cap: cap,
      plan_tier: planTier,
      stripe_event_id: stripeEventId,
    },
  });

  if (txError) {
    console.error('Error inserting credit_transaction:', txError);
  }

  await supabaseClient.from('webhook_events').insert({
    event_type: 'credit_grant',
    type: 'credit',
    stripe_event_id: stripeEventId,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    data: {
      user_id: userId,
      credits_granted: credits,
      credit_cap: cap,
      plan_tier: planTier,
      reason,
    },
  });
}

async function logAndStoreWebhookEvent(
  supabaseClient: any,
  event: any,
  data: any
): Promise<void> {
  const { error } = await supabaseClient
    .from("webhook_events")
    .insert({
      event_type: event.type,
      type: event.type.split('.')[0],
      stripe_event_id: event.id,
      created_at: new Date(event.created * 1000).toISOString(),
      modified_at: new Date(event.created * 1000).toISOString(),
      data
    } as WebhookEvent);

  if (error) {
    console.error('Error logging webhook event:', error);
    throw error;
  }
}

async function updateSubscriptionStatus(
  supabaseClient: any,
  stripeId: string,
  status: string
): Promise<void> {
  const { error } = await supabaseClient
    .from("subscriptions")
    .update({ status })
    .eq("stripe_id", stripeId);

  if (error) {
    console.error('Error updating subscription status:', error);
    throw error;
  }
}

// ─── Event handlers ──────────────────────────────────────────────────────────

async function handleSubscriptionCreated(supabaseClient: any, event: any) {
  const subscription = event.data.object;
  console.log('Handling subscription created:', subscription.id, 'status:', subscription.status);

  const userId = await resolveUserId(supabaseClient, subscription);
  if (!userId) {
    console.error('Cannot find user for subscription', subscription.id);
    return new Response(
      JSON.stringify({ error: "Unable to find associated user" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const subscriptionData: SubscriptionData = {
    stripe_id: subscription.id,
    user_id: userId,
    price_id: subscription.items.data[0]?.price.id,
    stripe_price_id: subscription.items.data[0]?.price.id,
    currency: subscription.currency,
    interval: subscription.items.data[0]?.plan.interval,
    status: subscription.status,
    current_period_start: subscription.current_period_start,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    amount: subscription.items.data[0]?.plan.amount ?? 0,
    started_at: subscription.start_date ?? Math.floor(Date.now() / 1000),
    customer_id: subscription.customer,
    metadata: subscription.metadata || {},
    canceled_at: subscription.canceled_at,
    ended_at: subscription.ended_at,
  };

  const { data: existingSubscription } = await supabaseClient
    .from('subscriptions')
    .select('id')
    .eq('stripe_id', subscription.id)
    .maybeSingle();

  const { error } = await supabaseClient
    .from('subscriptions')
    .upsert(
      {
        ...(existingSubscription?.id ? { id: existingSubscription.id } : {}),
        ...subscriptionData,
      },
      { onConflict: 'stripe_id' }
    );

  if (error) {
    console.error('Error creating subscription:', error);
    return new Response(
      JSON.stringify({ error: "Failed to create subscription" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // ── Credit allocation ──────────────────────────────────────────────────────
  // 'trialing' = 7-day free trial after card is validated by Stripe
  if (subscription.status === 'trialing') {
    console.log(`Allocating trial credits (${TRIAL_CREDIT_CAP}) to user ${userId}`);
    await applyCredits(
      supabaseClient, userId,
      TRIAL_CREDIT_CAP, TRIAL_CREDIT_CAP,
      'secure_cloud_trial', 'trial_started', event.id
    );
  } else if (subscription.status === 'active') {
    // Activated without a trial (e.g. direct subscription)
    console.log(`Allocating paid credits (${PAID_CREDIT_CAP}) to user ${userId}`);
    await applyCredits(
      supabaseClient, userId,
      PAID_CREDIT_CAP, PAID_CREDIT_CAP,
      'secure_cloud', 'subscription_activated', event.id
    );
  }

  return new Response(
    JSON.stringify({ message: "Subscription created successfully" }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleSubscriptionUpdated(supabaseClient: any, event: any) {
  const subscription = event.data.object;
  const previousAttributes = event.data.previous_attributes ?? {};
  console.log('Handling subscription updated:', subscription.id, 'status:', subscription.status);

  const { error } = await supabaseClient
    .from("subscriptions")
    .update({
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      metadata: subscription.metadata,
      canceled_at: subscription.canceled_at,
      ended_at: subscription.ended_at,
    })
    .eq("stripe_id", subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
    return new Response(
      JSON.stringify({ error: "Failed to update subscription" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // ── Credit state machine ───────────────────────────────────────────────────
  const prevStatus: string | undefined = previousAttributes.status;
  const newStatus: string = subscription.status;

  const userId = await resolveUserId(supabaseClient, subscription);
  if (!userId) {
    console.warn('No user found for subscription update', subscription.id);
    return new Response(
      JSON.stringify({ message: "Subscription updated (no user credits applied)" }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Trial → Active: card successfully charged → upgrade to full 1M credits
  if (prevStatus === 'trialing' && newStatus === 'active') {
    console.log(`Trial converted → active for user ${userId} — upgrading to paid credits`);
    await applyCredits(
      supabaseClient, userId,
      PAID_CREDIT_CAP, PAID_CREDIT_CAP,
      'secure_cloud', 'trial_converted_to_active', event.id
    );
  }

  // Any terminal status: revoke credits & downgrade to free
  if (
    ['canceled', 'incomplete_expired', 'unpaid'].includes(newStatus) &&
    !['canceled', 'incomplete_expired', 'unpaid'].includes(prevStatus ?? '')
  ) {
    console.log(`Subscription ended (${newStatus}) for user ${userId} — revoking credits`);
    await supabaseClient
      .from('profiles')
      .update({ credits_balance: 0, credit_cap: 0, plan_tier: 'free', updated_at: new Date().toISOString() })
      .eq('id', userId);

    await supabaseClient.from('webhook_events').insert({
      event_type: 'credit_revoked',
      type: 'credit',
      stripe_event_id: event.id,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      data: { user_id: userId, reason: `subscription_${newStatus}`, plan_tier: 'free' },
    });
  }

  // Past due: flag on profile for UI warning but don't cut off immediately
  if (newStatus === 'past_due' && prevStatus !== 'past_due') {
    console.log(`Subscription past_due for user ${userId}`);
    await supabaseClient
      .from('profiles')
      .update({ plan_tier: 'secure_cloud_past_due', updated_at: new Date().toISOString() })
      .eq('id', userId);
  }

  return new Response(
    JSON.stringify({ message: "Subscription updated successfully" }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleSubscriptionDeleted(supabaseClient: any, event: any) {
  const subscription = event.data.object;
  console.log('Handling subscription deleted:', subscription.id);

  try {
    await updateSubscriptionStatus(supabaseClient, subscription.id, "canceled");

    const userId = await resolveUserId(supabaseClient, subscription);
    if (userId) {
      console.log(`Subscription deleted — revoking credits for user ${userId}`);
      await supabaseClient
        .from('profiles')
        .update({ credits_balance: 0, credit_cap: 0, plan_tier: 'free', updated_at: new Date().toISOString() })
        .eq('id', userId);

      await supabaseClient.from('webhook_events').insert({
        event_type: 'credit_revoked',
        type: 'credit',
        stripe_event_id: event.id,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
        data: { user_id: userId, reason: 'subscription_deleted', plan_tier: 'free' },
      });
    }

    return new Response(
      JSON.stringify({ message: "Subscription deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return new Response(
      JSON.stringify({ error: "Failed to process subscription deletion" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleCheckoutSessionCompleted(supabaseClient: any, event: any) {
  const session = event.data.object;
  console.log('Handling checkout session completed:', session.id);

  const subscriptionId = typeof session.subscription === 'string'
    ? session.subscription
    : session.subscription?.id;

  if (!subscriptionId) {
    console.log('No subscription ID found in checkout session');
    return new Response(
      JSON.stringify({ message: "No subscription in checkout session" }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = session.metadata?.userId || session.metadata?.user_id;

    // Propagate user_id metadata to the Stripe subscription so resolveUserId works later
    if (userId) {
      await stripe.subscriptions.update(subscriptionId, {
        metadata: {
          ...session.metadata,
          user_id: userId,
          checkoutSessionId: session.id,
        },
      });
    }

    // Update Supabase subscription record
    const supabaseUpdateResult = await supabaseClient
      .from("subscriptions")
      .update({
        metadata: { ...session.metadata, checkoutSessionId: session.id },
        user_id: userId,
        status: stripeSubscription.status,
        current_period_start: stripeSubscription.current_period_start,
        current_period_end: stripeSubscription.current_period_end,
        cancel_at_period_end: stripeSubscription.cancel_at_period_end,
      })
      .eq("stripe_id", subscriptionId);

    if (supabaseUpdateResult.error) {
      throw new Error(`Supabase update failed: ${supabaseUpdateResult.error.message}`);
    }

    // ── Safety-net credit grant ────────────────────────────────────────────
    // subscription.created fires before checkout.session.completed, but user_id
    // may not be set yet — so we ensure credits are allocated here if missed.
    if (userId) {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('credit_cap')
        .eq('id', userId)
        .maybeSingle();

      if (stripeSubscription.status === 'trialing' && (!profile || profile.credit_cap === 0)) {
        console.log(`Checkout (trial) safety-net — granting ${TRIAL_CREDIT_CAP} credits to ${userId}`);
        await applyCredits(
          supabaseClient, userId,
          TRIAL_CREDIT_CAP, TRIAL_CREDIT_CAP,
          'secure_cloud_trial', 'checkout_trial_safety_net', event.id
        );
      } else if (stripeSubscription.status === 'active' && (!profile || profile.credit_cap < PAID_CREDIT_CAP)) {
        console.log(`Checkout (active) safety-net — granting ${PAID_CREDIT_CAP} credits to ${userId}`);
        await applyCredits(
          supabaseClient, userId,
          PAID_CREDIT_CAP, PAID_CREDIT_CAP,
          'secure_cloud', 'checkout_active_safety_net', event.id
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "Checkout session completed successfully", subscriptionId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing checkout completion:', error);
    return new Response(
      JSON.stringify({ error: "Failed to process checkout completion", details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleInvoicePaymentSucceeded(supabaseClient: any, event: any) {
  const invoice = event.data.object;
  console.log('Handling invoice payment succeeded:', invoice.id, 'billing_reason:', invoice.billing_reason);

  const subscriptionId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id;

  try {
    const { data: subscription } = await supabaseClient
      .from("subscriptions")
      .select("*")
      .eq("stripe_id", subscriptionId)
      .maybeSingle();

    await supabaseClient.from("webhook_events").insert({
      event_type: event.type,
      type: "invoice",
      stripe_event_id: event.id,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      data: {
        invoiceId: invoice.id,
        subscriptionId,
        amountPaid: String(invoice.amount_paid / 100),
        currency: invoice.currency,
        status: "succeeded",
        email: subscription?.email || invoice.customer_email,
        billingReason: invoice.billing_reason,
      },
    });

    // ── Monthly renewal: reset credits back to full cap ──────────────────
    // billing_reason = 'subscription_cycle' is only set on recurring charges
    if (invoice.billing_reason === 'subscription_cycle' && subscription?.user_id) {
      const userId = subscription.user_id;
      console.log(`Renewal — topping up ${PAID_CREDIT_CAP} credits for user ${userId}`);
      await applyCredits(
        supabaseClient, userId,
        PAID_CREDIT_CAP, PAID_CREDIT_CAP,
        'secure_cloud', 'monthly_renewal', event.id
      );
    }

    return new Response(
      JSON.stringify({ message: "Invoice payment succeeded" }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing successful payment:', error);
    return new Response(
      JSON.stringify({ error: "Failed to process successful payment" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleInvoicePaymentFailed(supabaseClient: any, event: any) {
  const invoice = event.data.object;
  console.log('Handling invoice payment failed:', invoice.id);

  const subscriptionId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id;

  try {
    const { data: subscription } = await supabaseClient
      .from("subscriptions")
      .select("*")
      .eq("stripe_id", subscriptionId)
      .maybeSingle();

    await supabaseClient.from("webhook_events").insert({
      event_type: event.type,
      type: "invoice",
      stripe_event_id: event.id,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      data: {
        invoiceId: invoice.id,
        subscriptionId,
        amountDue: String(invoice.amount_due / 100),
        currency: invoice.currency,
        status: "failed",
        email: subscription?.email || invoice.customer_email,
      },
    });

    if (subscriptionId) {
      await updateSubscriptionStatus(supabaseClient, subscriptionId, "past_due");
    }

    return new Response(
      JSON.stringify({ message: "Invoice payment failed" }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing failed payment:', error);
    return new Response(
      JSON.stringify({ error: "Failed to process failed payment" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Main webhook handler
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      console.log("IT DIDN'T WORK")
      return new Response(
        JSON.stringify({ error: "No signature found" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );      
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let event;
    
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Error verifying webhook signature:', err);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Processing webhook event:', event.type);

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Log the webhook event
    await logAndStoreWebhookEvent(supabaseClient, event, event.data.object);

    // Handle the event based on type
    switch (event.type) {
      case 'customer.subscription.created':
        return await handleSubscriptionCreated(supabaseClient, event);
      case 'customer.subscription.updated':
        return await handleSubscriptionUpdated(supabaseClient, event);
      case 'customer.subscription.deleted':
        return await handleSubscriptionDeleted(supabaseClient, event);
      case 'checkout.session.completed':
        return await handleCheckoutSessionCompleted(supabaseClient, event);
      case 'invoice.payment_succeeded':
        return await handleInvoicePaymentSucceeded(supabaseClient, event);
      case 'invoice.payment_failed':
        return await handleInvoicePaymentFailed(supabaseClient, event);
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return new Response(
          JSON.stringify({ message: `Unhandled event type: ${event.type}` }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
    }
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});


