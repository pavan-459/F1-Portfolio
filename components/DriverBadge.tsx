export default function DriverBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-rb-yellow/40 bg-rb-yellow/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-rb-yellow">
      <span className="h-1.5 w-1.5 rounded-full bg-rb-yellow" />
      {label}
    </span>
  );
}
