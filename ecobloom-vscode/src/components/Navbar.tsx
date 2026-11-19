
import { useState } from "react";
// @ts-ignore CSS side-effect imports are resolved by the bundler.
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/ideas" },
    { name: "Recycling", href: "/recycling" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Quiz", href: "/quiz" },
  ];

  return (
    <header className="eco-navbar">
      <a href="/" className="eco-logo">
        <span>✿</span> EcoBloom
      </a>

      <button
        className="eco-menu-button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        ☰
      </button>

      <nav className={open ? "eco-links open" : "eco-links"}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
