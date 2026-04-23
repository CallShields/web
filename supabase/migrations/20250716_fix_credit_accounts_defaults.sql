-- Fix credit_accounts table: remove 1M default on balance and total_earned
ALTER TABLE public.credit_accounts ALTER COLUMN balance SET DEFAULT 0.00;
ALTER TABLE public.credit_accounts ALTER COLUMN total_earned SET DEFAULT 0.00;
