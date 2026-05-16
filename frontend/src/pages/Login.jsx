import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/icons.svg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(form);

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">

      {/* Glow Effects */}
      <div className="glow-purple"></div>
      <div className="glow-blue"></div>

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative z-10">

        {/* Logo */}
        <div className="mb-10">
          <img
            src={logo}
            alt="FinTrack"
            className="logo-image"
          />
        </div>

        {/* Hero */}
        <h1 className="hero-title max-w-xl">
          Financial Clarity
          <br />
          Starts Here.
        </h1>

        <p className="hero-subtitle mt-8 max-w-lg">
          Track expenses, monitor income,
          and gain intelligent insights into your financial life
          with a beautifully crafted modern dashboard.
        </p>

        <p className="quote-text mt-6">
          “Wealth is built through clarity, not chaos.”
        </p>

        {/* Dashboard Stats */}
        <div className="mt-12 flex gap-6">

          <div className="dashboard-card w-44">
            <p className="text-sm text-slate-400">
              Monthly Savings
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-400">
              ₹24K
            </h2>
          </div>

          <div className="dashboard-card w-44">
            <p className="text-sm text-slate-400">
              Investment Growth
            </p>

            <h2 className="mt-3 text-3xl font-bold text-violet-400">
              +18%
            </h2>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 relative z-10">

        <form
          onSubmit={handleSubmit}
          className="glass-card w-full max-w-lg p-10"
        >

          {/* Heading */}
          <h2 className="text-4xl font-bold text-white">
            Sign In
          </h2>

          <p className="mt-3 text-slate-400 leading-7">
            Welcome back. Continue managing your finances securely.
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
    </div>
  );
}