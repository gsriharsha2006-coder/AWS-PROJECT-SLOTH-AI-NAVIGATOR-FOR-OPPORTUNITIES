import { Link } from "@tanstack/react-router";
import slothLogoAsset from "@/assets/sloth-master-logo.png.asset.json";

export function BrandMark({
  compact = false,
  context,
  className = "",
}: {
  compact?: boolean;
  context?: string;
  className?: string;
}) {
  return (
    <Link
      to="/"
      aria-label="SLOTH home"
      className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}
    >
      <img
        src={slothLogoAsset.url}
        alt=""
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        className={`${compact ? "size-9 rounded-lg" : "size-11 rounded-xl"} shrink-0 object-cover`}
      />
      <span className="min-w-0">
        <span className="block font-display text-base font-bold leading-none text-ink">SLOTH</span>
        {context ? (
          <span className="mt-1 block truncate text-[10px] leading-none text-muted-foreground">
            {context}
          </span>
        ) : null}
      </span>
    </Link>
  );
}