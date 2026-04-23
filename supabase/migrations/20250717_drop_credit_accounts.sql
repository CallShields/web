-- Remove credit_accounts table and its associated trigger/function
-- Credits are now tracked in profiles.credits_balance
DROP TRIGGER IF EXISTS on_auth_user_created_credit ON auth.users;
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
DROP FUNCTION IF EXISTS public.create_credit_account() CASCADE;
DROP TABLE IF EXISTS public.credit_accounts;
