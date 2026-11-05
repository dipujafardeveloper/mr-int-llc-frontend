"use server";

import { cookies } from "next/headers";
import { envConfig } from "@/config";
import type { AuthActionState } from "./auth.types";

type ApiResponse = {
  success?: unknown;
  message?: unknown;
  error?: unknown;
  data?: unknown;
};

type ApiRequestResult =
  | { ok: true; payload: ApiResponse }
  | { ok: false; message: string };

const signupEmailCookie = "signup-email";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getApiMessage(payload: ApiResponse): string | undefined {
  if (typeof payload.message === "string") return payload.message;
  if (typeof payload.error === "string") return payload.error;
  if (isRecord(payload.error) && typeof payload.error.message === "string") {
    return payload.error.message;
  }
  return undefined;
}

async function requestApi(
  path: string,
  init: RequestInit,
): Promise<ApiRequestResult> {
  const baseUrl = envConfig.baseUrl?.replace(/\/+$/, "");
  if (!baseUrl) {
    return {
      ok: false,
      message: "The API base URL is not configured.",
    };
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      message: "Unable to connect to the API. Please try again.",
    };
  }

  const responseText = await response.text();
  let payload: ApiResponse = {};

  if (responseText) {
    try {
      const parsed: unknown = JSON.parse(responseText);
      if (!isRecord(parsed)) {
        return {
          ok: false,
          message: "The API returned an invalid response.",
        };
      }
      payload = parsed;
    } catch {
      if (response.ok) {
        return {
          ok: false,
          message: "The API returned an invalid response.",
        };
      }
    }
  }

  if (!response.ok || payload.success === false) {
    return {
      ok: false,
      message:
        getApiMessage(payload) ??
        `The request failed (${response.status}). Please try again.`,
    };
  }

  return { ok: true, payload };
}

function getFormValue(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getRawFormValue(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function registerUserAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email").toLowerCase();
  const password = getRawFormValue(formData, "password");
  const confirmPassword = getRawFormValue(formData, "confirmPassword");
  const role = getFormValue(formData, "role");
  const agreedToTerms = formData.get("agreeToTerms") === "on";

  if (name.length < 2) {
    return { status: "error", message: "Please enter your full name." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters.",
    };
  }
  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords do not match." };
  }
  if (role !== "retail" && role !== "wholesale") {
    return { status: "error", message: "Please select a valid customer type." };
  }
  if (!agreedToTerms) {
    return {
      status: "error",
      message: "You must agree to the Terms & Conditions.",
    };
  }

  const body = new FormData();
  body.set("name", name);
  body.set("email", email);
  body.set("password", password);
  body.set("role", role);

  const result = await requestApi("/users", {
    method: "POST",
    body,
  });

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  const cookieStore = await cookies();
  cookieStore.set(signupEmailCookie, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return {
    status: "success",
    message: "Account created. Enter the verification code sent to your email.",
  };
}

export async function resendSignupOtpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  void _previousState;
  void formData;

  const email = (await cookies()).get(signupEmailCookie)?.value;
  if (!email || !isValidEmail(email)) {
    return {
      status: "error",
      message: "Your sign-up session expired. Please sign up again.",
    };
  }

  const result = await requestApi("/otp/resend-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  return {
    status: "success",
    message: "A new verification code has been sent to your email.",
  };
}

export async function verifySignupOtpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const otp = getFormValue(formData, "otp");
  if (!/^\d{6}$/.test(otp)) {
    return { status: "error", message: "Enter the 6-digit verification code." };
  }

  const cookieStore = await cookies();
  const email = cookieStore.get(signupEmailCookie)?.value;
  if (!email) {
    return {
      status: "error",
      message: "Your sign-up session expired. Please sign up again.",
    };
  }

  const result = await requestApi("/otp/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp: Number(otp) }),
  });

  console.log("=================================>", result);

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  cookieStore.delete(signupEmailCookie);
  return {
    status: "success",
    message: "Email verified. You can now sign in.",
  };
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getFormValue(formData, "email").toLowerCase();
  const password = getRawFormValue(formData, "password");

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!password) {
    return { status: "error", message: "Password is required." };
  }

  const result = await requestApi("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  const data = isRecord(result.payload.data) ? result.payload.data : {};
  const accessToken =
    typeof data.accessToken === "string" ? data.accessToken : undefined;
  if (!accessToken) {
    return {
      status: "error",
      message: "The login response did not include an access token.",
    };
  }

  const user = isRecord(data.user) ? data.user : { email };
  return {
    status: "success",
    message: "Login successful.",
    accessToken,
    refreshToken:
      typeof data.refreshToken === "string" ? data.refreshToken : undefined,
    user,
  };
}
