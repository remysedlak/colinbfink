import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex gap-4 p-3 border-b px-6 items-center relative">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img
            src="/Signature.png"
            alt="Signature"
            style={{ maxWidth: '180px' }}
          />
        </Link>
      </div>
      {/* Desktop NavLinks */}
      <div className="ml-auto gap-6 text-3xl hidden md:flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/films"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Films
        </NavLink>
        <NavLink
          to="/resume"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Resume
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Contact
        </NavLink>
      </div>
      {/* Mobile Dropdown Button */}
      <button
        className="ml-auto md:hidden p-2"
        aria-label="Open menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img src="/open-menu.svg" alt="Open menu" className="w-8 h-8" />
      </button>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full right-4 bg-white shadow-lg rounded z-50 flex flex-col text-xl p-4 md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/films"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Films
          </NavLink>
          <NavLink
            to="/resume"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}
