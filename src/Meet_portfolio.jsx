import { useState, useEffect, useRef } from "react";

/* ─── Inject keyframes & Google Fonts ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #060612;
      color: #e2e2f0;
      overflow-x: hidden;
    }

    .font-display { font-family: 'Bebas Neue', sans-serif; }
    .font-mono    { font-family: 'JetBrains Mono', monospace; }

    /* Marquee */
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track { animation: marquee 18s linear infinite; }
    .marquee-track:hover { animation-play-state: paused; }

    /* Floating grid bg */
    .grid-bg {
      background-image:
        linear-gradient(rgba(99,255,170,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,255,170,0.04) 1px, transparent 1px);
      background-size: 56px 56px;
    }

    /* Glow blob */
    @keyframes blobFloat {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(30px,-20px) scale(1.05); }
      66%      { transform: translate(-20px,15px) scale(0.96); }
    }
    .blob { animation: blobFloat 12s ease-in-out infinite; }
    .blob2 { animation: blobFloat 16s ease-in-out infinite reverse; }

    /* Fade-in on scroll */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
    .reveal.show { opacity: 1; transform: translateY(0); }

    /* Card hover lift */
    .card-lift { transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease; }
    .card-lift:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(99,255,170,0.1);
      border-color: rgba(99,255,170,0.35) !important;
    }

    /* Accent underline */
    .accent-line { position:relative; display:inline-block; }
    .accent-line::after {
      content:'';
      position:absolute; left:0; bottom:-4px;
      width:100%; height:3px;
      background: linear-gradient(90deg,#63ffaa,#7b5ea7);
      border-radius:2px;
    }

    /* Skill chip */
    .skill-chip {
      transition: all .22s ease;
      position: relative; overflow: hidden;
    }
    .skill-chip::before {
      content:'';
      position:absolute; inset:0;
      background: linear-gradient(135deg,rgba(99,255,170,.08),transparent);
      opacity:0; transition:opacity .22s;
    }
    .skill-chip:hover { transform: translateY(-4px); border-color: rgba(99,255,170,.5) !important; }
    .skill-chip:hover::before { opacity:1; }

    /* Progress bar animate */
    .bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }

    /* Nav link */
    .nav-link { position:relative; }
    .nav-link::after {
      content:''; position:absolute; left:0; bottom:-2px;
      width:0; height:1.5px; background:#63ffaa;
      transition:width .25s ease;
    }
    .nav-link:hover::after { width:100%; }
    .nav-link:hover { color:#63ffaa !important; }

    /* Scrollbar */
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:#060612; }
    ::-webkit-scrollbar-thumb { background:#63ffaa44; border-radius:4px; }

    /* Pulse dot */
    @keyframes ping { 75%,100% { transform:scale(2); opacity:0; } }
    .ping { animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite; }

    .hero-name .first { color: var(--text); }
    .hero-name .last {
      display: block;
      -webkit-text-stroke: 2px var(--accent);
      color: transparent;
    }
  `}</style>
);

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── DATA ─── */
const skills = [
  { icon: "🍃", name: "MongoDB", color: "#47A248" },
  { icon: "⚡", name: "Express.js", color: "#ffffff" },
  { icon: "⚛️", name: "React.js", color: "#61DAFB" },
  { icon: "🟢", name: "Node.js", color: "#339933" },
  { icon: "🟡", name: "JavaScript", color: "#F7DF1E" },
  { icon: "🎨", name: "HTML & CSS", color: "#E34F26" },
  { icon: "📦", name: "Bootstrap", color: "#7952B3" },
];

const softSkills = [
  "Quick Learner",
  "Problem Solving",
  "Communication",
  "Creative Thinking",
  "Tech Explorer",
];

const projects = [
  {
    num: "01",
    emoji: "🤖",
    name: "AI Powered Chatbot",
    desc: "Built an AI-powered chatbot with a clean interactive UI and real-time conversational responses. Integrated external AI APIs with seamless frontend handling.",
    tags: ["HTML", "CSS", "JavaScript", "API"],
  },
  {
    num: "02",
    emoji: "🛒",
    name: "E-Commerce Platform",
    desc: "Full MERN Stack e-commerce platform with product listing, user authentication, and cart management. End-to-end development from UI to database.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
];

const education = [
  {
    icon: "🎓",
    year: "2024 – 2027",
    degree: "Bachelor of Computer Applications",
    abbr: "BCA",
    school: "Sutex Bank College, VNSGU · Surat",
    desc: "Building a strong foundation in programming, software development, logical thinking and problem-solving for a tech career.",
  },
  {
    icon: "💻",
    year: "2025 – 2026",
    degree: "Full Stack Web Development",
    abbr: "MERN",
    school: "Toptel Multimedia · Surat",
    desc: "Certified hands-on training in MongoDB, Express.js, React.js & Node.js. Real-world full-stack project development covering frontend and backend.",
  },
];

const languages = [
  { name: "Gujarati", level: "Native", pct: 100 },
  { name: "Hindi", level: "Fluent", pct: 85 },
  { name: "English", level: "Basic", pct: 45 },
];

const contacts = [
  { icon: "📞", label: "Phone", val: "+91 8488884002" },
  { icon: "✉️", label: "Email", val: "mitgadhiya16@gmail.com" },
  { icon: "📍", label: "Location", val: "Pasodra, Surat, Gujarat" },
  { icon: "🌐", label: "Website", val: "meetgadhiya.netlify.app" },
];

/* ─── MARQUEE TICKER ─── */
const marqueeItems = [
  "✦ MERN Stack Developer",
  "✦ Available for Internship",
  "✦ Open to Freelance",
  "✦ Available for Internship",
  "✦ Let's Build Together",
  "✦ Available for Internship",
  "✦ React · Node · MongoDB",
];

function MarqueeBanner() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="w-full overflow-hidden py-3 relative"
      style={{
        background: "#63ffaa",
        borderTop: "1px solid rgba(99,255,170,0.3)",
        borderBottom: "1px solid rgba(99,255,170,0.3)",
      }}
    >
      <div
        className="marquee-track flex whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="font-mono font-semibold text-sm tracking-widest uppercase px-8 select-none"
            style={{ color: "#060612" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Portfolio() {
  const [barVisible, setBarVisible] = useState(false);
  const barRef = useRef(null);
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setBarVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (barRef.current) obs.observe(barRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{ minHeight: "100vh", background: "#060612", color: "#e2e2f0" }}
    >
      <GlobalStyles />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          background: "rgba(6,6,18,0.88)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="font-mono"
          style={{
            color: "#63ffaa",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.2em",
          }}
        >
          MG.DEV
        </span>
        <div style={{ display: "flex", gap: 32 }}>
          {["about", "skills", "projects", "education", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="nav-link font-mono"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <a
          href="mailto:mitgadhiya16@gmail.com"
          className="font-mono"
          style={{
            background: "#63ffaa",
            color: "#060612",
            padding: "8px 20px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Hire Me
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        id="about"
        className="grid-bg"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 80,
        }}
      >
        <div
          className="blob"
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(99,255,170,0.10) 0%,transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="blob2"
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(123,94,167,0.12) 0%,transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "80px 40px",
            width: "100%",
          }}
        >
          {/* Status pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(99,255,170,0.07)",
              border: "1px solid rgba(99,255,170,0.25)",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                width: 8,
                height: 8,
              }}
            >
              <span
                className="ping"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#63ffaa",
                  opacity: 0.75,
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#63ffaa",
                  display: "block",
                }}
              />
            </span>
            <span
              className="font-mono"
              style={{
                color: "#63ffaa",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Open to Work
            </span>
          </div>

          <h1
            className="hero-name"
            style={{
              fontSize: "clamp(4rem,12vw,9rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              marginBottom: 16,
            }}
          >
            <span className="first" style={{ color: "#e2e2f0" }}>MEET</span>
            <br />
            <span 
              style={{ WebkitTextStroke: "2px #63ffaa", color: "transparent" }}
            >
              GADHIYA
            </span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <span
              className="font-mono"
              style={{ color: "#63ffaa", fontSize: 13, letterSpacing: "0.1em" }}
            >
              // Full Stack Developer
            </span>
            <span
              style={{
                width: 60,
                height: 1,
                background: "linear-gradient(90deg,#63ffaa,transparent)",
              }}
            />
            <span
              className="font-mono"
              style={{ color: "#555", fontSize: 11, letterSpacing: "0.1em" }}
            >
              MERN Stack
            </span>
          </div>

          <p
            style={{
              maxWidth: 500,
              color: "#999",
              fontSize: 15,
              lineHeight: 1.75,
              marginBottom: 40,
              fontWeight: 300,
            }}
          >
            Passionate developer pursuing{" "}
            <span style={{ color: "#63ffaa", fontWeight: 500 }}>
              BCA at VNSGU
            </span>
            , certified in the full MERN Stack. Eager to build real-world web
            applications and grow as a developer.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("projects")}
              className="font-mono"
              style={{
                background: "#63ffaa",
                color: "#060612",
                padding: "14px 32px",
                borderRadius: 10,
                border: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "")}
            >
              View Projects →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="font-mono"
              style={{
                background: "transparent",
                color: "#e2e2f0",
                padding: "14px 32px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#63ffaa";
                e.target.style.color = "#63ffaa";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.color = "#e2e2f0";
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <MarqueeBanner />
      </section>

      {/* ── MARQUEE ── */}

      {/* ── SKILLS ── */}
      <section
        id="skills"
        style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}
      >
        <Reveal>
          <p
            className="font-mono"
            style={{
              color: "#63ffaa",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            02 — Arsenal
          </p>
          <h2
            className="font-display accent-line"
            style={{
              fontSize: "clamp(3rem,7vw,5.5rem)",
              marginBottom: 64,
              display: "inline-block",
            }}
          >
            SKILLS
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p
            className="font-mono"
            style={{
              fontSize: 10,
              color: "#444",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Technical Stack
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px,1fr))",
              gap: 14,
              marginBottom: 48,
            }}
          >
            {skills.map((sk, i) => (
              <Reveal key={sk.name} delay={i * 55}>
                <div
                  className="skill-chip"
                  style={{
                    background: "#0f0f1e",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: "20px 16px",
                    textAlign: "center",
                    cursor: "default",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>
                    {sk.icon}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: sk.color,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {sk.name}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p
            className="font-mono"
            style={{
              fontSize: 10,
              color: "#444",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Soft Skills
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {softSkills.map((s) => (
              <span
                key={s}
                className="font-mono"
                style={{
                  fontSize: 11,
                  padding: "9px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "#0f0f1e",
                  color: "#aaa",
                  letterSpacing: "0.08em",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{ background: "#0a0a18", padding: "100px 0" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <p
              className="font-mono"
              style={{
                color: "#63ffaa",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              03 — Work
            </p>
            <h2
              className="font-display accent-line"
              style={{
                fontSize: "clamp(3rem,7vw,5.5rem)",
                marginBottom: 64,
                display: "inline-block",
              }}
            >
              PROJECTS
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 24,
            }}
          >
            {projects.map((p, i) => (
              <Reveal key={p.num} delay={i * 130}>
                <div
                  className="card-lift"
                  style={{
                    background: "#0f0f1e",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 20,
                    padding: "36px 32px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "linear-gradient(90deg,#63ffaa,#7b5ea7)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: "#63ffaa",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {p.num}
                    </span>
                    <span style={{ fontSize: 32 }}>{p.emoji}</span>
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 40,
                      color: "#e2e2f0",
                      marginBottom: 14,
                      lineHeight: 1.1,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      color: "#777",
                      fontSize: 14,
                      lineHeight: 1.7,
                      marginBottom: 24,
                      fontWeight: 300,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          fontSize: 10,
                          padding: "4px 12px",
                          borderRadius: 999,
                          background: "rgba(99,255,170,0.07)",
                          border: "1px solid rgba(99,255,170,0.2)",
                          color: "#63ffaa",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section
        id="education"
        style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}
      >
        <Reveal>
          <p
            className="font-mono"
            style={{
              color: "#63ffaa",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            04 — Background
          </p>
          <h2
            className="font-display accent-line"
            style={{
              fontSize: "clamp(3rem,7vw,5.5rem)",
              marginBottom: 64,
              display: "inline-block",
            }}
          >
            EDUCATION
          </h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {education.map((e, i) => (
              <Reveal key={i} delay={i * 140}>
                <div
                  style={{ display: "flex", gap: 28, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "#0f0f1e",
                      border: "2px solid #63ffaa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      zIndex: 1,
                      position: "relative",
                    }}
                  >
                    {e.icon}
                  </div>
                  <div
                    className="card-lift"
                    style={{
                      flex: 1,
                      background: "#0f0f1e",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 18,
                      padding: "28px 32px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                        marginBottom: 10,
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: 48,
                          color: "#63ffaa",
                          lineHeight: 1,
                        }}
                      >
                        {e.abbr}
                      </span>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 10,
                          padding: "5px 12px",
                          borderRadius: 999,
                          background: "rgba(99,255,170,0.07)",
                          border: "1px solid rgba(99,255,170,0.2)",
                          color: "#63ffaa",
                        }}
                      >
                        {e.year}
                      </span>
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#e2e2f0",
                        marginBottom: 4,
                      }}
                    >
                      {e.degree}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: "#555",
                        marginBottom: 14,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {e.school}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#888",
                        lineHeight: 1.65,
                        fontWeight: 300,
                      }}
                    >
                      {e.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{ background: "#0a0a18", padding: "100px 40px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p
              className="font-mono"
              style={{
                color: "#63ffaa",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              05 — Connect
            </p>
            <h2
              className="font-display accent-line"
              style={{
                fontSize: "clamp(3rem,7vw,5.5rem)",
                marginBottom: 64,
                display: "inline-block",
              }}
            >
              CONTACT
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contacts.map((c, i) => (
                <Reveal key={c.label} delay={i * 80}>
                  <div
                    className="card-lift"
                    style={{
                      background: "#0f0f1e",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 14,
                      padding: "18px 20px",
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(99,255,170,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 9,
                          color: "#63ffaa",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}
                      >
                        {c.label}
                      </div>
                      <div style={{ fontSize: 13, color: "#ccc" }}>{c.val}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={220}>
              <div
                style={{
                  background: "#0f0f1e",
                  border: "1px solid rgba(99,255,170,0.15)",
                  borderRadius: 22,
                  padding: "44px 40px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(99,255,170,0.08),transparent)",
                    transform: "translate(30%,-30%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <h3
                    className="font-display"
                    style={{ fontSize: 52, lineHeight: 1.1, marginBottom: 16 }}
                  >
                    Let's Build
                    <br />
                    <span style={{ color: "#63ffaa" }}>Together.</span>
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#888",
                      lineHeight: 1.7,
                      marginBottom: 32,
                      fontWeight: 300,
                    }}
                  >
                    I'm actively looking for internship & junior developer
                    opportunities. Have a project or idea? Let's make it happen.
                  </p>
                  <a
                    href="mailto:mitgadhiya16@gmail.com"
                    style={{ display: "block" }}
                  >
                    <button
                      className="font-mono"
                      style={{
                        width: "100%",
                        background: "#63ffaa",
                        color: "#060612",
                        border: "none",
                        borderRadius: 12,
                        padding: "16px",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "opacity .2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = ".88")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Send Me a Message →
                    </button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span className="font-mono" style={{ fontSize: 11, color: "#444" }}>
          © 2025 <span style={{ color: "#63ffaa" }}>Meet Gadhiya</span>
        </span>
        <span className="font-mono" style={{ fontSize: 11, color: "#444" }}>
          Built with <span style={{ color: "#63ffaa" }}>React</span> + Tailwind
          CSS
        </span>
      </footer>
    </div>
  );
}
