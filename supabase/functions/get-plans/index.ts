import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders, status: 200 });
    }

    try {
        // Fetch active products with their prices expanded
        const products = await stripe.products.list({
            active: true,
            expand: ['data.default_price'],
        });

        // Also fetch all active prices to cover products without default_price
        const prices = await stripe.prices.list({
            active: true,
            type: 'recurring',
        });

        // Build a combined list: one entry per product+price combo
        const plans = products.data.flatMap((product) => {
            const productPrices = prices.data.filter(
                (p) => p.product === product.id
            );

            // If no prices found for product, skip it
            if (productPrices.length === 0) return [];

            return productPrices.map((price) => ({
                id: price.id,                          // price ID — used for checkout
                name: product.name,
                description: product.description || '',
                amount: price.unit_amount ?? 0,
                currency: price.currency,
                interval: price.recurring?.interval ?? 'month',
                interval_count: price.recurring?.interval_count ?? 1,
                popular: product.metadata?.popular === 'true',
                metadata: product.metadata || {},
                product_id: product.id,
            }));
        });

        // Sort by amount ascending
        plans.sort((a, b) => a.amount - b.amount);

        return new Response(
            JSON.stringify(plans),
            { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200 
            }
        );
    } catch (error) {
        console.error("Error getting plans:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400 
            }
        );
    }
});