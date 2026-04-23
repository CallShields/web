-- Call analyses tracking table
CREATE TABLE IF NOT EXISTS public.call_analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(user_id) ON DELETE CASCADE,
  analyzed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  credits_used integer NOT NULL DEFAULT 300,
  verdict text NOT NULL DEFAULT 'safe', -- 'safe' | 'scam'
  language text,
  duration_seconds integer,
  summary text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS call_analyses_user_id_idx ON public.call_analyses(user_id);
CREATE INDEX IF NOT EXISTS call_analyses_analyzed_at_idx ON public.call_analyses(analyzed_at);

ALTER TABLE public.call_analyses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own analyses" ON public.call_analyses;
CREATE POLICY "Users can view own analyses"
  ON public.call_analyses FOR SELECT
  USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can insert own analyses" ON public.call_analyses;
CREATE POLICY "Users can insert own analyses"
  ON public.call_analyses FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);
