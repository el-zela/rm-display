import { describe, expect, it, vi } from "vitest";
import { sendOtp, signIn, verifyOtp, validateNewPassword } from "./auth";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/lib/supabase/client", () => ({
  createSupabaseClient: () => ({ functions: { invoke } }),
}));

describe("sendOtp", () => {
  it("returns the service's error instead of the generic non-2xx error", async () => {
    invoke.mockResolvedValueOnce({
      data: null,
      error: {
        message: "Edge Function returned a non-2xx status code",
        context: new Response(JSON.stringify({ error: "Failed to generate OTP" }), { status: 500 }),
      },
    });
    await expect(sendOtp("0712345678")).rejects.toThrow("Failed to generate OTP");
  });
});

describe("authentication service failures", () => {
  it("preserves password sign-in failures", async () => {
    invoke.mockResolvedValueOnce({ data: null, error: {
      context: new Response(JSON.stringify({ error: "Namba ya simu au password si sahihi." }), { status: 401 }),
    } });
    await expect(signIn("0712345678", "wrong-password")).rejects.toThrow("Namba ya simu au password si sahihi.");
  });

  it("preserves OTP verification failures", async () => {
    invoke.mockResolvedValueOnce({ data: null, error: {
      context: new Response(JSON.stringify({ error: "Invalid or expired OTP" }), { status: 401 }),
    } });
    await expect(verifyOtp("0712345678", "000000", "salama123")).rejects.toThrow("Invalid or expired OTP");
  });

  it("uses the operation fallback when the service returns no readable reason", async () => {
    invoke.mockResolvedValueOnce({ data: null, error: {
      message: "Edge Function returned a non-2xx status code",
      context: new Response("unavailable", { status: 502 }),
    } });
    await expect(sendOtp("0712345678")).rejects.toThrow("Imeshindwa kutuma OTP");
  });
});

describe("validateNewPassword", () => {
  it("rejects passwords shorter than 8 characters", () => {
    expect(validateNewPassword("1234567", "1234567")).toBe(
      "Password lazima iwe na herufi 8 au zaidi",
    );
  });

  it("accepts a matching password of exactly 8 characters", () => {
    expect(validateNewPassword("12345678", "12345678")).toBeNull();
  });

  it("rejects passwords longer than 128 characters", () => {
    const password = "a".repeat(129);
    expect(validateNewPassword(password, password)).toBe("Password isizidi herufi 128");
  });

  it("rejects a confirmation that does not match", () => {
    expect(validateNewPassword("salama123", "salama124")).toBe("Password hazilingani");
  });
});
