export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  align = "center",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`mb-12 flex flex-col ${alignment}`}>
      {(index || eyebrow) && (
        <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
          {index && <span className="text-indigo-500/70">{index}</span>}
          {index && eyebrow && <span className="h-px w-8 bg-indigo-500/40" />}
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title} {accent && <span className="gradient-text">{accent}</span>}
      </h2>
    </div>
  );
}
