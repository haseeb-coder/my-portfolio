export function ThemeBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-blue-700/20 blur-[120px]" />
      <div className="absolute left-0 top-1/3 h-[24rem] w-[24rem] rounded-full bg-fuchsia-700/10 blur-[120px]" />
    </div>
  );
}
