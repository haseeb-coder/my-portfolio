export function ThemeBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Gradient mesh */}
      <div className="absolute -top-48 left-1/2 h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-indigo-700/25 blur-[130px]" />
      <div className="absolute bottom-0 right-[-10%] h-[35rem] w-[35rem] rounded-full bg-cyan-700/20 blur-[130px]" />
      <div className="absolute left-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-700/15 blur-[130px]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
