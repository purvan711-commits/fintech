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

      {/* Background Glow */}
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

        {/* Badge */}
        <div className="hero-badge">
          SMART FINANCE DASHBOARD
        </div>

        {/* Main Hero */}
        <h1 className="hero-title mt-8 max-w-xl">
          Empowering
          <br />
          Strategies For
          <br />
          Financial Success
        </h1>

        {/* Description */}
        <p className="hero-subtitle mt-8 max-w-lg">
          Embrace a growth mindset, educate yourself on financial
          literacy, and leverage technology to empower your journey
          towards financial success.
        </p>

        {/* Quote */}
        <p className="quote-text mt-6">
          “Smart money management begins with disciplined tracking.”
        </p>

        {/* Stats Cards */}
        <div className="mt-14 flex gap-6">

          <div className="dashboard-card w-52">
            <p className="text-sm text-slate-400">
              Monthly Savings
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-400">
              ₹24K
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              +12% increase this month
            </p>
          </div>

          <div className="dashboard-card w-52">
            <p className="text-sm text-slate-400">
              Investment Growth
            </p>

            <h2 className="mt-3 text-3xl font-bold text-violet-400">
              +18%
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Stable portfolio performance
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
            Access Your Dashboard
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-slate-400 leading-7">
            Smart finance tracking, intelligent insights,
            and secure money management — all in one place.
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
              Create one
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}