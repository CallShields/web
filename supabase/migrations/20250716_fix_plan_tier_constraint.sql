-- Fix plan_tier check constraint to include secure_cloud plan tiers used by payments-webhook
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_plan_tier_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_plan_tier_check
  CHECK (plan_tier IN (
    'free',
    'pro',
    'enterprise',
    'secure_cloud',
    'secure_cloud_trial',
    'secure_cloud_past_due'
  ));
