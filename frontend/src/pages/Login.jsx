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
      setError(err?.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">

      {/* Glow Effects */}
      <div className="glow-purple"></div>
      <div className="glow-blue"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-md p-10"
      >

        {/* Logo */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-2xl font-bold text-white shadow-lg">
            F
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              FinTrack
            </h2>

            <p className="text-sm text-violet-200">
              Smart Finance Dashboard
            </p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          Own Your
          <br />
          Financial Future
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-5">
          Smart insights. Elegant budgeting.
          Powerful financial tracking for modern life.
        </p>

        {/* Quote */}
        <p className="quote-text">
          “Money flows where clarity grows.”
        </p>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="mt-8 space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="premium-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="premium-input"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="primary-btn mt-7 w-full rounded-2xl py-4 text-lg font-semibold text-white"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-300">
          New here?{" "}
          <Link
            to="/register"
            className="font-semibold text-violet-300 transition hover:text-white hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}