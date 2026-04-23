-- Add credit fields to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS credits_balance integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS credit_cap integer NOT NULL DEFAULT 0;

-- Add plan_tier if not exists (was added in earlier migration but safety check)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan_tier text NOT NULL DEFAULT 'free';

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS profiles_plan_tier_idx ON public.profiles(plan_tier);
