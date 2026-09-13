import RadarGame from "./RadarGame";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Bangalore, India</span>
          <h1>
            We build things that fly, print, and <em>think</em>.
          </h1>
          <p className="lead">
            3dr Axis Labs designs and builds custom FPV drones, 3D-printed
            hardware, and the software and robotics that bring them to life.
          </p>
          <div className="hero-actions">
            <a href="#gallery" className="btn btn-primary">
              See our work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a project
            </a>
          </div>
          <p className="hero-aside mono">psst — the radar&apos;s not just for show.</p>
        </div>

        <div className="rig">
          <div className="hud-corner tl"></div>
          <div className="hud-corner tr"></div>
          <div className="hud-corner bl"></div>
          <div className="hud-corner br"></div>

          <div className="telemetry t-alt">
            ALT&nbsp; <b>142.6 m</b>
            <br />
            SPD&nbsp; <b>18.2 m/s</b>
          </div>
          <div className="telemetry t-hdg">
            HDG&nbsp; <b>047°</b>
            <br />
            BAT&nbsp; <b>86%</b>
          </div>
          <div className="telemetry t-status">
            STATUS <b>ARMED</b>
          </div>

          <RadarGame />
        </div>
      </div>
    </section>
  );
}
