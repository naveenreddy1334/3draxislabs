export default function Mission() {
  return (
    <section className="mission" id="about">
      <div className="wrap mission-grid">
        <div>
          <span className="kicker">Who we are</span>
          <h2>A small team that ships hardware and software together.</h2>
          <p>
            Most studios pick a lane — drones, or code, or manufacturing. We
            work across all three, because the best hardware projects need
            software to run them, and the best software projects benefit from
            people who&apos;ve actually held a soldering iron.
          </p>
          <p>
            Every project starts with the same question: what does this
            actually need to work, not just look finished.
          </p>
          <div className="mission-tags">
            <span>FPV & aerial cinematography</span>
            <span>3D printing & rapid prototyping</span>
            <span>Robotics & automation</span>
          </div>
        </div>

        <div className="stat-panel">
          <span className="mono">// capability index</span>
          <div className="stat-row">
            <span>Drone builds</span>
            <span>Cinewhoop → long range</span>
          </div>
          <div className="stat-row">
            <span>Print tolerance</span>
            <span>± 0.1 mm</span>
          </div>
          <div className="stat-row">
            <span>Prototype turnaround</span>
            <span>24–72 hrs · Pan-India</span>
          </div>
          <div className="stat-row">
            <span>Response time</span>
            <span>6–24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
