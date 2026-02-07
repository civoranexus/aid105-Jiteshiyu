import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Button from "../components/ui/Button";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <NavLink to="/" className="navbar__logo">
          SchemeAssist<span>AI</span>
        </NavLink>
        <p className="navbar__tagline">
          Intelligent Government Scheme Discovery
        </p>
      </div>

      <nav className="navbar__nav" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/schemes"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Schemes
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>
      </nav>

      <div className="navbar__actions">
        <Button className="btn btn-outline">
          Sign In
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
