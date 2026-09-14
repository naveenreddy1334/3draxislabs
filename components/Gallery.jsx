"use client";

import { useState } from "react";

const ITEMS = [
  {
    cat: "drones",
    label: "Drones",
    title: "Aerial cinematography",
    desc: "Cinewhoop footage for a live event opener, shot and stabilized in-house.",
  },
  {
    cat: "drones",
    label: "Drones",
    title: "Urban FPV racing",
    desc: "High-speed FPV runs through tight urban courses for a sponsor reel.",
  },
  {
    cat: "print",
    label: "Manufacturing",
    title: "Printed enclosures",
    desc: "Custom enclosures for a client's sensor rig, printed to ± 0.1 mm.",
  },
  {
    cat: "print",
    label: "Manufacturing",
    title: "Rapid iteration set",
    desc: "Six print revisions in three days to lock a mounting bracket design.",
  },
  {
    cat: "web",
    label: "Web",
    title: "Live ops dashboard",
    desc: "Real-time dashboard tracking fleet telemetry across active shoots.",
  },
  {
    cat: "web",
    label: "Web",
    title: "Booking interface",
    desc: "A quote-and-booking flow built for a client's mobile-first audience.",
  },
  {
    cat: "robotics",
    label: "Robotics",
    title: "Assembly-line arm",
    desc: "A pick-and-place arm integrated into an existing production line.",
  },
  {
    cat: "robotics",
    label: "Robotics",
    title: "Calibration rig",
    desc: "A jig built to calibrate robotic joints against a fixed reference.",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "drones", label: "Drones" },
  { id: "print", label: "Manufacturing" },
  { id: "web", label: "Web" },
  { id: "robotics", label: "Robotics" },
];

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [flipped, setFlipped] = useState(() => new Set());
  const items = active === "all" ? ITEMS : ITEMS.filter((i) => i.cat === active);

  function toggleFlip(title) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  return (
    <section className="gallery" id="gallery">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Selected work</span>
          <h2>From the workshop floor</h2>
          <p>Placeholder plates for now — real project photos are coming soon.</p>
        </div>

        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={active === f.id ? "active" : ""}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {items.map((item) => (
            <button
              type="button"
              className={`flip-outer${flipped.has(item.title) ? " flipped" : ""}`}
              key={item.title}
              onClick={() => toggleFlip(item.title)}
              aria-label={`${item.title} — tap for details`}
            >
              <div className="flip-inner">
                <div className="flip-face flip-front">
                  <span className="cat-tag">{item.label}</span>
                  <h4>{item.title}</h4>
                </div>
                <div className="flip-face flip-back">
                  <p>{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}