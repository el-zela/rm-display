 # Project architecture

- Keep OTP codes service-only with RLS and no browser grants; signup codes must not be exposed through the public Data API.
- Extract authentication error messages from function response bodies so users receive the actual failure rather than an SDK status message.