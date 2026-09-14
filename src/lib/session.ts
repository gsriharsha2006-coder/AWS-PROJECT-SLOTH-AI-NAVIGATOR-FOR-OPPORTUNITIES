import { supabase } from "@/integrations/supabase/client";

/**
 * Where a freshly signed-in account belongs: unfinished onboarding first,
 * otherwise their workspace home.
 */
export async function destinationAfterLogin(): Promise<
  "/home" | "/onboarding" | "/poster" | "/poster-onboarding"
> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return "/onboarding";

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, onboarding_complete")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? (user.user_metadata?.["role"] as string | undefined) ?? "user";

  if (role === "poster") {
    const { data: org } = await supabase
      .from("organizations")
      .select("id, verification_status")
      .eq("owner_id", user.id)
      .maybeSingle();
    return org ? "/poster" : "/poster-onboarding";
  }
  return profile?.onboarding_complete ? "/home" : "/onboarding";
}
