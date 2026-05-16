import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-violet-300 opacity-20 blur-3xl"></div>

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-300 opacity-20 blur-3xl"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-purple-200"
      >
        <h1 className="mb-2 text-4xl font-extrabold text-slate-800">
          Login
        </h1>

        <p className="mb-8 text-slate-500">
          Access your finance dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-300 bg-rose-100 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-slate-700 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-200"
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-slate-700 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 py-4 font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          No account?{" "}
          <Link
            to="/register"
            className="font-medium text-violet-600 transition hover:text-violet-800 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}