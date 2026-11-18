 # Project architecture

- Keep OTP codes service-only with RLS and no browser grants; signup codes must not be exposed through the public Data API.
- Extract authentication error messages from function response bodies so users receive the actual failure rather than an SDK status message.
- Signup SMS uses a TanStack server function and a server-only NextSMS client; credentials remain server-side and private OTP storage stays compatible with the imported verification flow.
- Password creation opens in a controlled drawer after a server-side OTP check; the final signup operation must revalidate and consume the code to prevent bypassing verification.
- Website and installed-app signup popups share SignupPasswordDrawer so their OTP screens cannot drift into displaying password fields before confirmation.