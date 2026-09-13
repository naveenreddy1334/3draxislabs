"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header>
      <nav className="nav wrap">
        <a href="#home" className="brand" onClick={close}>
          <img src="/logo.png" alt="3dr Axis Labs logo" className="brand-mark" />
          3dr Axis Labs
        </a>

        <button
          type="button"
          className="nav-toggle-label"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links${open ? " open" : ""}`}>
          <li>
            <a href="#home" onClick={close}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={close}>
              About
            </a>
          </li>
          <li>
            <a href="#services" onClick={close}>
              Services
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={close}>
              Work
            </a>
          </li>
          <li>
            <a href="#contact" onClick={close}>
              Contact
            </a>
          </li>
        </ul>

        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary">
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}
