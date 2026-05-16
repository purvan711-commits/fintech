import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

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

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative z-10">

        {/* Logo */}
        <div className="mb-10">
          <img
            src={logo}
            alt="FinTrack"
            className="logo-image"
          />
        </div>

        {/* Tag */}
        <div className="inline-flex w-fit items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-200 backdrop-blur-xl">
          ✦ Modern Finance Platform
        </div>

        {/* Hero */}
        <h1 className="hero-title mt-8 max-w-2xl">
          Take Control
          <br />
          Of Your Money
          <br />
          With Confidence.
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-8 max-w-xl">
          Track expenses, manage income,
          monitor financial growth,
          and build smarter habits —
          all inside one beautifully crafted dashboard.
        </p>

        {/* Quote */}
        <p className="quote-text mt-6">
          “Financial freedom begins when you understand where your money flows.”
        </p>

        {/* Stats */}
        <div className="mt-14 flex gap-6">

          <div className="dashboard-card w-48">
            <p className="text-sm text-slate-400">
              Monthly Savings
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-400">
              ₹24K
            </h2>

            <p className="mt-2 text-sm text-green-300">
              +12% this month
            </p>
          </div>

          <div className="dashboard-card w-48">
            <p className="text-sm text-slate-400">
              Investment Growth
            </p>

            <h2 className="mt-3 text-3xl font-bold text-violet-400">
              +18%
            </h2>

            <p className="mt-2 text-sm text-violet-300">
              Stable portfolio rise
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 relative z-10">

        <form
          onSubmit={handleSubmit}
          className="glass-card w-full max-w-lg p-10"
        >

          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <img
              src={logo}
              alt="FinTrack"
              className="w-44"
            />
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mt-3 text-slate-400 leading-7">
            Sign in to continue managing your finances securely and intelligently.
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
            Don’t have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-violet-300 transition hover:text-white hover:underline"
            >
              Create Account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}