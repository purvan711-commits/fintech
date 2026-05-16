export default function StatCard({ label, value, tone = "default" }) {
  const toneClass =
    tone === "green"
      ? "text-emerald-400"
      : tone === "red"
      ? "text-rose-400"
      : "text-cyan-400";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}