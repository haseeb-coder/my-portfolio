import { Sparkles } from "lucide-react";

export function AIBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300 shadow-[0_0_12px_rgba(79,70,229,0.4)]">
      <Sparkles className="h-3 w-3" /> AI
    </span>
  );
}
