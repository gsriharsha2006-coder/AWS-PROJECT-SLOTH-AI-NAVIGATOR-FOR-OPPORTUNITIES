import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getMembership } from "@/lib/razorpay.functions";

export type MembershipState = {
  tier: string;
  isDemo: boolean;
  loading: boolean;
};

const TIER_LABELS: Record<string, string> = {
  free: "Sloth Free",
  plus: "Sloth Plus",
  leader: "Sloth Leader",
};

export function tierLabel(tier: string) {
  return TIER_LABELS[tier] ?? "Sloth Free";
}

export function useMembership(): MembershipState {
  const loadMembership = useServerFn(getMembership);
  const [tier, setTier] = useState("free");
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void loadMembership()
      .then((row) => {
        if (!alive) return;
        if (row && row.status === "active") {
          setTier(row.tier);
          setIsDemo(row.is_demo);
        }
        setLoading(false);
      })
      .catch(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [loadMembership]);

  return { tier, isDemo, loading };
}
