export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info">
          <span className="kicker">Get in touch</span>
          <h2 style={{ fontSize: "2rem", marginBottom: "18px" }}>
            Tell us what you&apos;re building.
          </h2>
          <p>
            Aerial coverage, a robotics build, or a piece of software — send
            the details and we&apos;ll reply within a day.
          </p>

          <div className="info-row">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </div>
            <div>
              <h4>Email</h4>
              <div className="val">3draxislabs@gmail.com</div>
            </div>
          </div>

          <div className="info-row">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.6.6a2 2 0 0 1 1.7 2z" />
              </svg>
            </div>
            <div>
              <h4>Phone</h4>
              <div className="val">+91 74834 82350</div>
            </div>
          </div>

          <div className="info-row">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4>Location</h4>
              <div className="val">Bangalore, India</div>
            </div>
          </div>

          <div className="info-row">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div>
              <h4>Response time</h4>
              <div className="val">6–24 hours</div>
            </div>
          </div>
        </div>

        <form className="console" action="https://formspree.io/f/xgaejabp" method="POST">
          <span className="console-label">transmission // new project</span>
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="field">
            <label htmlFor="message">Project details</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
