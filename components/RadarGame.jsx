"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["#5ee1ff", "#ffb04d", "#ff5fa8"];
const MAX_BLIPS = 3;
const SPAWN_INTERVAL = 1300;
const BLIP_LIFETIME = 3600;

const HINT_MESSAGES = [
  "check this out, if you're bored",
  "okay but have you tried clicking these",
  "not just decoration, promise",
  "psst — these actually do something",
];

let idCounter = 0;

function randomPoint() {
  // uniform random point inside a circle, kept away from the very edge
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(Math.random()) * 36; // percent from center
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

export default function RadarGame() {
  const [blips, setBlips] = useState([]);
  const [pops, setPops] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintFading, setHintFading] = useState(false);
  const [hintText] = useState(
    () => HINT_MESSAGES[Math.floor(Math.random() * HINT_MESSAGES.length)]
  );
  const timers = useRef({});

  useEffect(() => {
    try {
      if (!localStorage.getItem("radarHintSeen")) {
        setHintVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing etc.) — just skip the hint
    }
  }, []);

  useEffect(() => {
    const spawn = setInterval(() => {
      setBlips((prev) => {
        if (prev.length >= MAX_BLIPS) return prev;
        const id = ++idCounter;
        const { x, y } = randomPoint();
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        timers.current[id] = setTimeout(() => {
          setBlips((p) => p.filter((b) => b.id !== id));
          delete timers.current[id];
        }, BLIP_LIFETIME);

        return [...prev, { id, x, y, color }];
      });
    }, SPAWN_INTERVAL);

    return () => {
      clearInterval(spawn);
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, []);

  function dismissHint() {
    setHintFading(true);
    setTimeout(() => setHintVisible(false), 300);
    try {
      localStorage.setItem("radarHintSeen", "1");
    } catch {
      // ignore — worst case the hint reappears next visit
    }
  }

  function handleHit(blip) {
    clearTimeout(timers.current[blip.id]);
    delete timers.current[blip.id];

    setBlips((prev) => prev.filter((b) => b.id !== blip.id));
    setScore((s) => {
      const next = s + 1;
      setBest((b) => Math.max(b, next));
      return next;
    });

    if (hintVisible) dismissHint();

    const popId = ++idCounter;
    setPops((prev) => [...prev, { id: popId, x: blip.x, y: blip.y, color: blip.color }]);
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== popId));
    }, 500);
  }

  return (
    <>
      <div className="radar-frame">
        <div className="hud-ring"></div>
        <div className="hud-ring inner"></div>

        <div className="radar" id="radar-hitzone">
          <div className="radar-sweep"></div>
          <div className="radar-center"></div>

          {hintVisible && (
            <div className={`radar-hint${hintFading ? " fading" : ""}`}>
              <span>{hintText}</span>
              <svg viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {blips.map((b) => (
            <button
              key={b.id}
              type="button"
              className="radar-blip"
              style={{ top: `${b.y}%`, left: `${b.x}%`, "--blip-color": b.color }}
              onClick={() => handleHit(b)}
              aria-label="Neutralize radar contact"
            >
              <span className="dot"></span>
            </button>
          ))}

          {pops.map((p) => (
            <span
              key={p.id}
              className="radar-pop"
              style={{ top: `${p.y}%`, left: `${p.x}%`, "--blip-color": p.color }}
            />
          ))}
        </div>
      </div>

      <div className="rig-note mono">
        contacts neutralized <b>{String(score).padStart(2, "0")}</b>
        {best > 0 && <span className="rig-note-best"> · best {best}</span>}
      </div>
    </>
  );
}
