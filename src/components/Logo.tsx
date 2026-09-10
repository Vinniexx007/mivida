import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Site logo linking home. Uses the full-colour transparent logo (amber M +
 * cursor, white wordmark, transparent background) so it reads clearly on the
 * navy header/footer without a baked-in background box. Native aspect ratio is
 * 2010x782 (~2.57:1).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/brand/logo-transparent.png"
        alt={site.name}
        width={2010}
        height={782}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}
