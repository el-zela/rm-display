CREATE TABLE public.otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  otp text NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '5 minutes')
);
GRANT ALL ON public.otp_codes TO service_role;
REVOKE ALL ON public.otp_codes FROM anon, authenticated;
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;
CREATE INDEX otp_codes_phone_created_at_idx ON public.otp_codes (phone, created_at DESC);
NOTIFY pgrst, 'reload schema';