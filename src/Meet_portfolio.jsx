import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --card: #16161f;
    --accent: #00ff88;
    --accent2: #7b5ea7;
    --text: #e8e8f0;
    --muted: #6b6b80;
    --border: rgba(255,255,255,0.07);
    --glow: 0 0 30px rgba(0,255,136,0.15);
  }

  body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; }

  .portfolio {
    min-height: 100vh;
    background: var(--bg);
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 18px 40px;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem; color: var(--accent);
    letter-spacing: 0.05em;
  }
  .nav-links { display: flex; gap: 32px; }
  .nav-links a {
    font-size: 0.85rem; color: var(--muted); text-decoration: none;
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.08em; text-transform: uppercase;
    transition: color 0.2s;
    cursor: pointer;
  }
  .nav-links a:hover { color: var(--accent); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 120px 40px 60px;
    position: relative;
    overflow: hidden;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%);
    top: -100px; right: -100px;
    pointer-events: none;
  }
  .hero-glow2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(123,94,167,0.1) 0%, transparent 70%);
    bottom: 0; left: -100px;
    pointer-events: none;
  }
  .hero-content { position: relative; max-width: 800px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem; color: var(--accent);
    border: 1px solid rgba(0,255,136,0.3);
    padding: 6px 14px; border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.1em;
  }
  .hero-badge span { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  .hero-name {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    margin-bottom: 12px;
  }
  .hero-name .first { color: var(--text); }
  .hero-name .last {
    display: block;
    -webkit-text-stroke: 2px var(--accent);
    color: transparent;
  }
  .hero-title {
    font-family: 'Space Mono', monospace;
    font-size: 1rem; color: var(--muted);
    margin-bottom: 24px; letter-spacing: 0.05em;
  }
  .hero-desc {
    font-size: 1.05rem; color: var(--muted); line-height: 1.7;
    max-width: 520px; margin-bottom: 40px;
  }
  .hero-desc em { color: var(--accent); font-style: normal; font-weight: 600; }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    padding: 14px 32px;
    background: var(--accent); color: #0a0a0f;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: none; border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,255,136,0.3); }
  .btn-outline {
    padding: 14px 32px;
    background: transparent; color: var(--text);
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid var(--border); border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  /* SECTION */
  .section { padding: 100px 40px; max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem; color: var(--accent);
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800; letter-spacing: -0.02em;
    margin-bottom: 60px;
  }
  .section-line {
    display: inline-block;
    border-bottom: 3px solid var(--accent);
    padding-bottom: 4px;
  }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px; }
  .skill-chip {
    padding: 16px 20px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    text-align: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.82rem; color: var(--text);
    transition: all 0.25s;
    cursor: default;
    position: relative; overflow: hidden;
  }
  .skill-chip::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,255,136,0.05), transparent);
    opacity: 0; transition: opacity 0.25s;
  }
  .skill-chip:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: var(--glow); }
  .skill-chip:hover::before { opacity: 1; }
  .skill-chip .skill-icon { font-size: 1.5rem; margin-bottom: 8px; display: block; }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .project-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .project-card::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .project-card:hover { border-color: rgba(0,255,136,0.2); transform: translateY(-6px); }
  .project-card:hover::after { transform: scaleX(1); }
  .project-num {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.15em; margin-bottom: 16px;
  }
  .project-name {
    font-size: 1.3rem; font-weight: 700; margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .project-desc {
    font-size: 0.9rem; color: var(--muted); line-height: 1.65;
    margin-bottom: 24px;
  }
  .project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem; padding: 4px 10px;
    background: rgba(0,255,136,0.07);
    border: 1px solid rgba(0,255,136,0.2);
    border-radius: 100px; color: var(--accent);
  }

  /* EDUCATION */
  .edu-timeline { display: flex; flex-direction: column; gap: 32px; position: relative; }
  .edu-timeline::before {
    content: '';
    position: absolute; left: 16px; top: 0; bottom: 0;
    width: 1px; background: var(--border);
  }
  .edu-item { display: flex; gap: 32px; padding-left: 0; position: relative; }
  .edu-dot {
    width: 33px; height: 33px; flex-shrink: 0;
    background: var(--card); border: 2px solid var(--accent);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; position: relative; z-index: 1;
  }
  .edu-body {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px 28px; flex: 1;
    transition: border-color 0.2s;
  }
  .edu-body:hover { border-color: rgba(0,255,136,0.25); }
  .edu-year {
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem; color: var(--accent);
    letter-spacing: 0.1em; margin-bottom: 8px;
  }
  .edu-degree { font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
  .edu-school { font-size: 0.88rem; color: var(--muted); margin-bottom: 12px; }
  .edu-desc { font-size: 0.87rem; color: var(--muted); line-height: 1.6; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .contact-info { display: flex; flex-direction: column; gap: 20px; }
  .contact-item {
    display: flex; gap: 16px; align-items: center;
    padding: 18px 22px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; transition: all 0.2s;
  }
  .contact-item:hover { border-color: rgba(0,255,136,0.25); }
  .contact-icon { font-size: 1.2rem; }
  .contact-label { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent); letter-spacing: 0.1em; margin-bottom: 4px; }
  .contact-val { font-size: 0.9rem; color: var(--text); }
  .contact-cta {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 40px;
  }
  .contact-cta h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; }
  .contact-cta p { font-size: 0.9rem; color: var(--muted); line-height: 1.6; margin-bottom: 28px; }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    padding: 32px 40px;
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem; color: var(--muted);
  }
  .footer-accent { color: var(--accent); }

  /* LANG */
  .lang-grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .lang-card {
    flex: 1; min-width: 140px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px;
    text-align: center; transition: all 0.2s;
  }
  .lang-card:hover { border-color: rgba(0,255,136,0.25); transform: translateY(-4px); }
  .lang-name { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
  .lang-level {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .lang-bar {
    height: 3px; background: var(--border); border-radius: 2px;
    margin-top: 12px; overflow: hidden;
  }
  .lang-fill { height: 100%; background: var(--accent); border-radius: 2px; }

  @media (max-width: 700px) {
    .nav { padding: 16px 20px; }
    .nav-links { gap: 18px; }
    .hero { padding: 100px 20px 60px; }
    .section { padding: 70px 20px; }
    .contact-grid { grid-template-columns: 1fr; }
    .footer { flex-direction: column; gap: 12px; text-align: center; }
  }

  /* ANIMATIONS */
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: none; }
`;

const skills = [
  { icon: "🍃", name: "MongoDB" },
  { icon: "⚡", name: "Express.js" },
  { icon: "⚛️", name: "React.js" },
  { icon: "🟢", name: "Node.js" },
  { icon: "🟡", name: "JavaScript" },
  { icon: "🎨", name: "HTML & CSS" },
  { icon: "📦", name: "Bootstrap" },
];

const softSkills = ["Quick Learner", "Problem Solving", "Communication", "Creative Thinking", "Tech Explorer"];

const projects = [
  {
    num: "01",
    name: "AI Powered Chatbot",
    desc: "An AI-powered chatbot with a clean, interactive UI and real-time conversational responses. Features seamless API integration for intelligent replies.",
    tags: ["HTML", "CSS", "JavaScript", "API Integration"],
  },
  {
    num: "02",
    name: "E-Commerce Platform",
    desc: "A fully functional e-commerce platform built with the complete MERN Stack. Includes product listing, user authentication, and cart management.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
  },
];

const education = [
  {
    icon: "🎓",
    year: "2024 – 2027",
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Sutex Bank College, VNSGU · Surat",
    desc: "Building a strong foundation in programming and software development. Sharpening logical thinking and problem-solving skills for a tech career.",
  },
  {
    icon: "💻",
    year: "2025 – 2026",
    degree: "Full Stack Web Development (MERN Stack)",
    school: "Toptel Multimedia · Surat",
    desc: "Certified course with hands-on experience in MongoDB, Express.js, React.js and Node.js. Focused on real-world project development covering both frontend and backend.",
  },
];

const languages = [
  { name: "Gujarati", level: "Native", fill: "100%" },
  { name: "Hindi", level: "Fluent", fill: "85%" },
  { name: "English", level: "Basic", fill: "45%" },
];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeIn({ children, delay = 0, style: s = {} }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} className={`fade-in${vis ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...s }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="portfolio">
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">MG.dev</div>
        <div className="nav-links">
          {["about", "skills", "projects", "education", "contact"].map(s => (
            <a key={s} onClick={() => scrollTo(s)}>{s}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="about">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-badge">
            <span /> Available for Internship
          </div>
          <h1 className="hero-name">
            <span className="first">Meet</span>
            <span className="last">Gadhiya</span>
          </h1>
          <p className="hero-title">// Full Stack Developer (MERN)</p>
          <p className="hero-desc">
            A passionate developer pursuing <em>BCA at VNSGU</em>, certified in the
            full MERN Stack. Eager to build real-world web applications and grow
            into a well-rounded engineer.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Get In Touch</button>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section">
          <FadeIn>
            <p className="section-label">// 02. Arsenal</p>
            <h2 className="section-title"><span className="section-line">Skills</span></h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: "0.95rem" }}>Technical Stack</p>
            <div className="skills-grid">
              {skills.map((sk, i) => (
                <FadeIn key={sk.name} delay={i * 60}>
                  <div className="skill-chip">
                    <span className="skill-icon">{sk.icon}</span>
                    {sk.name}
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ color: "var(--muted)", margin: "40px 0 20px", fontSize: "0.95rem" }}>Soft Skills</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {softSkills.map(s => (
                <div key={s} style={{
                  padding: "10px 18px",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  background: "var(--card)",
                }}>{s}</div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "var(--surface)" }}>
        <div className="section">
          <FadeIn>
            <p className="section-label">// 03. Work</p>
            <h2 className="section-title"><span className="section-line">Projects</span></h2>
          </FadeIn>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <FadeIn key={p.num} delay={i * 120}>
                <div className="project-card">
                  <div className="project-num">{p.num}</div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section">
          <FadeIn>
            <p className="section-label">// 04. Background</p>
            <h2 className="section-title"><span className="section-line">Education</span></h2>
          </FadeIn>
          <div className="edu-timeline">
            {education.map((e, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="edu-item">
                  <div className="edu-dot">{e.icon}</div>
                  <div className="edu-body">
                    <div className="edu-year">{e.year}</div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-desc">{e.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Languages */}
          <FadeIn delay={100}>
            <p style={{ color: "var(--muted)", margin: "60px 0 20px", fontSize: "0.95rem", fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", fontSize: "0.75rem", color: "var(--accent)" }}>// LANGUAGES</p>
            <div className="lang-grid">
              {languages.map((l, i) => (
                <FadeIn key={l.name} delay={i * 80}>
                  <div className="lang-card">
                    <div className="lang-name">{l.name}</div>
                    <div className="lang-level">{l.level}</div>
                    <div className="lang-bar"><div className="lang-fill" style={{ width: l.fill }} /></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "var(--surface)" }}>
        <div className="section">
          <FadeIn>
            <p className="section-label">// 05. Connect</p>
            <h2 className="section-title"><span className="section-line">Contact</span></h2>
          </FadeIn>
          <div className="contact-grid">
            <div className="contact-info">
              {[
                { icon: "📞", label: "PHONE", val: "+91 8488884002" },
                { icon: "✉️", label: "EMAIL", val: "mitgadhiya16@gmail.com" },
                { icon: "📍", label: "LOCATION", val: "Pasodra, Surat, Gujarat" },
                { icon: "🌐", label: "WEBSITE", val: "reallygreatsite.com" },
              ].map((c, i) => (
                <FadeIn key={c.label} delay={i * 80}>
                  <div className="contact-item">
                    <span className="contact-icon">{c.icon}</span>
                    <div>
                      <div className="contact-label">{c.label}</div>
                      <div className="contact-val">{c.val}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={200}>
              <div className="contact-cta">
                <h3>Let's Build Something Together</h3>
                <p>I'm actively looking for internship and junior developer opportunities. If you have a project in mind or just want to connect — let's talk!</p>
                <a href="mailto:mitgadhiya16@gmail.com">
                  <button className="btn-primary" style={{ width: "100%" }}>Send Me a Message</button>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2025 <span className="footer-accent">Meet Gadhiya</span></span>
        <span>Built with <span className="footer-accent">React</span> · MERN Stack Developer</span>
      </footer>
    </div>
  );
}
