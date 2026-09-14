import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormAlert, PrimaryButton } from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";
import { destinationAfterLogin } from "@/lib/session";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Signing you in — AI Opportunity Navigator" },
      { name: "description", content: "Completing your sign-in and taking you to your workspace." },
      { property: "og:title", content: "Signing you in" },
      { property: "og:description", content: "Completing your sign-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CallbackPage,
});

function CallbackPage() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < 12; i++) {
        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        if (data.session) {
          navigate({ to: await destinationAfterLogin(), replace: true });
          return;
        }
        await new Promise((r) => setTimeout(r, 400));
      }
      if (!cancelled) setFailed(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <AuthShell eyebrow="One moment">
      {failed ? (
        <FormAlert
          title="We couldn't complete the sign-in request."
          action={
            <PrimaryButton onClick={() => navigate({ to: "/auth/login" })}>Try Again</PrimaryButton>
          }
        >
          Your link may have already been used or expired.
        </FormAlert>
      ) : (
        <div className="py-6 text-center">
          <span
            aria-hidden
            className="mx-auto block size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          />
          <p className="mt-4 text-sm font-semibold">Signing you in…</p>
          <p className="mt-1 text-xs text-muted-foreground">Preparing your workspace.</p>
        </div>
      )}
    </AuthShell>
  );
}
