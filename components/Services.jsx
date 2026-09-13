const SERVICES = [
  {
    title: "FPV drone builds",
    desc: "Custom cinewhoop and long-range rigs, tuned for stable, cinematic footage.",
    features: [
      "4K stabilized capture",
      "Real-time video transmission",
      "Built and flight-tested in-house",
    ],
    price: "Custom quote",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="5" cy="5" r="2.4" />
        <circle cx="19" cy="5" r="2.4" />
        <circle cx="5" cy="19" r="2.4" />
        <circle cx="19" cy="19" r="2.4" />
        <path d="M6.8 6.8L11 11M17.2 6.8L13 11M6.8 17.2L11 13M17.2 17.2L13 13" />
        <rect x="10" y="10" width="4" height="4" rx="0.5" />
      </svg>
    ),
  },
  {
    title: "Rapid prototyping",
    desc: "3D printing and light machining for parts that need to exist fast.",
    features: [
      "± 0.1 mm dimensional accuracy",
      "24–72 hour turnaround",
      "Pan-India delivery",
      "PLA, PETG, resin & nylon",
    ],
    price: "From ₹12",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="3" width="16" height="7" rx="1" />
        <rect x="6" y="14" width="12" height="7" rx="1" />
        <path d="M8 10v4M16 10v4" />
      </svg>
    ),
  },
  {
    title: "Robotics & automation",
    desc: "Custom-engineered systems for manufacturing lines and repetitive tasks.",
    features: [
      "Sensor & motor integration",
      "Industrial-grade builds",
      "Full automation pipelines",
    ],
    price: "Custom quote",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="7" width="14" height="11" rx="2" />
        <circle cx="9" cy="12.5" r="1.4" />
        <circle cx="15" cy="12.5" r="1.4" />
        <path d="M9 4h6M7 7V5.5M17 7V5.5" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">What we offer</span>
          <h2>Services built around one workshop</h2>
          <p>
            Three disciplines, one team — so your project doesn&apos;t get lost
            between vendors.
          </p>
        </div>

        <div className="card-grid">
          {SERVICES.map((s) => (
            <div className="card-3d" key={s.title}>
              <div className="card-inner">
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="card-features">
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="card-footer">
                  <span className="card-price">{s.price}</span>
                  <a href="#contact" className="card-link">
                    Request quote
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
