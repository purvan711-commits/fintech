import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold">
          FinTrack
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link className="hover:text-cyan-400" to="/">Dashboard</Link>
          <Link className="hover:text-cyan-400" to="/income">Income</Link>
          <Link className="hover:text-cyan-400" to="/expenses">Expenses</Link>
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/15"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}