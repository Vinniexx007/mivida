import type { ReactNode } from "react";

/** Content card used for services, audience segments and steps. */
export function Card({
  title,
  children,
  eyebrow,
  className = "",
}: {
  title: string;
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[--radius-brand] border border-slate/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
      <h3 className="text-xl font-semibold text-navy">{title}</h3>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-slate">
        {children}
      </div>
    </div>
  );
}
