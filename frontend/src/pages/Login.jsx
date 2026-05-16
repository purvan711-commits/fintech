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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">

      {/* Background Glow Effects */}
      <div className="glow-purple"></div>
      <div className="glow-blue"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="glass-card relative w-full max-w-md p-10"
      >

        {/* Logo Glow */}
        <div className="absolute top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl"></div>

        {/* Logo Section */}
        <div className="mb-10 flex flex-col items-center">

          <img
            src={logo}
            alt="FinTrack Logo"
            className="relative z-10 w-52 object-contain drop-shadow-[0_0_25px_rgba(139,92,246,0.35)] transition duration-300 hover:scale-[1.02]"
          />

          <p className="mt-3 text-center text-sm uppercase tracking-[0.25em] text-violet-200">
            Smart Finance Dashboard
          </p>

        </div>

        {/* Heading */}
        <h1 className="hero-title text-center">
          Own Your
          <br />
          Financial Future
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-5 text-center">
          Smart insights. Secure tracking.
          Elegant finance management built for modern life.
        </p>

        {/* Catchy Quote */}
        <p className="quote-text text-center">
          “Money flows where clarity grows.”
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="mt-8 space-y-5">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="premium-input"
          />

          {/* Password */}
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

        {/* Login Button */}
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