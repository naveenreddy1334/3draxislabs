export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <a href="#home" className="brand" style={{ fontSize: "1rem" }}>
          <img
            src="/logo.png"
            alt="3dr Axis Labs logo"
            className="brand-mark"
            style={{ width: "24px", height: "24px" }}
          />
          3dr Axis Labs
        </a>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Work</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-fine">© 2026 3dr Axis Labs, Bangalore</div>
      </div>
    </footer>
  );
}
