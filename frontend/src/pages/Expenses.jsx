import { useEffect, useState } from "react";
import { addExpense, deleteExpense, getExpenses, updateExpense } from "../api/financeApi";

const emptyForm = {
  title: "",
  amount: "",
  category: "Other",
  description: "",
  date: "",
};

const CATS = ["Food", "Transport", "Utilities", "Health", "Entertainment", "Other"];

export default function Expenses() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await getExpenses();
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await updateExpense(editing.id, form);
      setEditing(null);
    } else {
      await addExpense(form);
    }

    setForm(emptyForm);
    await load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteExpense(id);
    await load();
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      amount: item.amount,
      category: item.category,
      description: item.description,
      date: item.date,
    });
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{editing ? "Edit Expense" : "Add Expense"}</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
        />
        <input
          required
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
        >
          {CATS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="md:col-span-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
        />

        <div className="md:col-span-2 flex gap-3">
          <button className="rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950">
            {editing ? "Save Changes" : "Add Expense"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(emptyForm);
              }}
              className="rounded-xl border border-white/10 px-5 py-3"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">All Expenses</h2>
        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-slate-400">No expenses yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 border-b border-white/10 pb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-slate-400">
                    {item.category} • {item.date} • {item.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-rose-400">₹{item.amount}</span>
                  <button onClick={() => startEdit(item)} className="rounded-lg border border-white/10 px-3 py-1">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg border border-rose-500/20 px-3 py-1 text-rose-400">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}