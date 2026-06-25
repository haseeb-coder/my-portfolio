export function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">
        {title} {accent && <span className="gradient-text">{accent}</span>}
      </h2>
    </div>
  );
}
