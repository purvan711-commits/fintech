import { useEffect, useState } from "react";
import { getSummary } from "../api/financeApi";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSummary()
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load summary"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-rose-400">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-slate-400">Track your income and expenses.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Income" value={`₹${data.total_income}`} tone="green" />
        <StatCard label="Total Expense" value={`₹${data.total_expense}`} tone="red" />
        <StatCard label="Balance" value={`₹${data.balance}`} tone={data.balance >= 0 ? "green" : "red"} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <div className="mt-4 space-y-3">
          {data.recent.length === 0 ? (
            <p className="text-slate-400">No transactions yet.</p>
          ) : (
            data.recent.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-slate-400">
                    {item.category} • {item.date}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    item.type === "income" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}₹{item.amount}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}