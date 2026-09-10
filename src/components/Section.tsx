import type { ElementType, ReactNode } from "react";

type Tone = "white" | "mist" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white text-navy",
  mist: "bg-mist text-navy",
  navy: "bg-navy text-white",
};

/** Full-bleed section with a centred, width-constrained container. */
export function Section({
  children,
  tone = "white",
  className = "",
  containerClassName = "",
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <Tag id={id} className={`${tones[tone]} ${className}`}>
      <div
        className={`mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24 ${containerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}

/** Small eyebrow label used above section headings. */
export function Eyebrow({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "white";
}) {
  const color = tone === "amber" ? "text-amber-600" : "text-amber-300";
  return (
    <p
      className={`mb-3 font-heading text-sm font-semibold uppercase tracking-widest ${color}`}
    >
      {children}
    </p>
  );
}
