import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Loads the signed-in account's saved profile in the browser.
 * Returns null while unknown / signed out so screens can fall back gracefully.
 */
export function useProfile() {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        if (active) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }
      const { data: row } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      if (row) {
        setProfile(row);
      } else {
        setProfile(null);
      }
      setLoading(false);
    }

    void load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") void load();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { profile, loading };
}

export function displayName(profile: ProfileRow | null): string {
  const name = profile?.full_name?.trim();
  return name && name.length > 0 ? name : "there";
}

export function firstName(profile: ProfileRow | null): string {
  const name = profile?.full_name?.trim();
  if (!name) return "there";
  return name.split(/\s+/)[0] ?? name;
}

export function initials(profile: ProfileRow | null): string {
  const name = profile?.full_name?.trim();
  if (!name) return "··";
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase() || "··";
}
