-- Fix create_credit_account trigger: remove 1M signup bonus, new users start with 0 credits
CREATE OR REPLACE FUNCTION public.create_credit_account()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.credit_accounts (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$function$;
