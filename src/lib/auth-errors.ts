export type AuthProblem = {
  title: string;
  detail?: string;
  kind: "credentials" | "unverified" | "suspended" | "throttled" | "network" | "exists" | "generic";
};

/** Turns a Supabase auth error into human copy plus a state we can branch on. */
export function describeAuthError(error: unknown): AuthProblem {
  const message =
    typeof error === "object" && error && "message" in error
      ? String((error as { message: unknown }).message)
      : String(error ?? "");
  const lower = message.toLowerCase();

  if (lower.includes("failed to fetch") || lower.includes("network")) {
    return {
      kind: "network",
      title: "We couldn't complete the sign-in request.",
      detail: "Check your connection and try again. Nothing was submitted.",
    };
  }
  if (lower.includes("invalid login credentials") || lower.includes("invalid_credentials")) {
    return {
      kind: "credentials",
      title: "Incorrect email or password. Please try again.",
      detail: "Passwords are case-sensitive.",
    };
  }
  if (lower.includes("email not confirmed") || lower.includes("not confirmed")) {
    return {
      kind: "unverified",
      title: "Please verify your account before continuing.",
      detail: "We sent a verification link when you signed up.",
    };
  }
  if (lower.includes("banned") || lower.includes("suspend")) {
    return {
      kind: "suspended",
      title: "This account is currently unavailable.",
      detail: "If you think this is a mistake, report it and our team will look into it.",
    };
  }
  if (lower.includes("rate limit") || lower.includes("too many") || lower.includes("429")) {
    return {
      kind: "throttled",
      title: "Too many attempts.",
      detail: "For your security we've paused sign-in for a few minutes. Try again shortly.",
    };
  }
  if (lower.includes("already registered") || lower.includes("already been registered")) {
    return {
      kind: "exists",
      title: "This email is already registered.",
      detail: "Log in instead, or reset your password if you've forgotten it.",
    };
  }
  if (lower.includes("weak") || lower.includes("password should")) {
    return { kind: "generic", title: "That password is too weak.", detail: message };
  }
  return {
    kind: "generic",
    title: "We couldn't complete that request.",
    detail: message || "Please try again.",
  };
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
export const phonePattern = /^(\+91[\s-]?)?[6-9]\d{9}$/;
