"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { scaleIn, fadeSlideUp } from "@/lib/motionVariants";

/* ── SVG mockup visuals ── */
function NBAMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }} fill="none">
      {/* Bar chart */}
      <rect x="20" y="110" width="28" height="70" rx="3" fill="#7c3aed" opacity=".7"/>
      <rect x="60" y="80" width="28" height="100" rx="3" fill="#a78bfa" opacity=".75"/>
      <rect x="100" y="50" width="28" height="130" rx="3" fill="#7c3aed"/>
      <rect x="140" y="65" width="28" height="115" rx="3" fill="#a78bfa" opacity=".75"/>
      <rect x="180" y="30" width="28" height="150" rx="3" fill="#c4b5fd"/>
      <rect x="220" y="20" width="28" height="160" rx="3" fill="#a78bfa"/>
      <rect x="260" y="45" width="28" height="135" rx="3" fill="#7c3aed" opacity=".8"/>
      {/* Trend line */}
      <polyline points="34,108 74,78 114,48 154,63 194,28 234,18 274,43"
        stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
      <circle cx="234" cy="18" r="4.5" fill="#fff"/>
      {/* Accuracy badge */}
      <rect x="170" y="152" width="130" height="22" rx="4" fill="rgba(124,58,237,0.18)" stroke="rgba(124,58,237,0.4)" strokeWidth="1"/>
      <text x="182" y="167" fontSize="9" fill="#a78bfa" fontFamily="monospace">92% ACCURACY · XGBOOST</text>
    </svg>
  );
}

function LogisticsMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.42 }} fill="none">
      {/* Map grid */}
      {[0,1,2,3,4].map(i => (
        <line key={`h${i}`} x1="20" y1={30+i*36} x2="300" y2={30+i*36} stroke="#06b6d4" strokeWidth=".5" opacity=".2"/>
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`v${i}`} x1={20+i*46} y1="20" x2={20+i*46} y2="175" stroke="#06b6d4" strokeWidth=".5" opacity=".2"/>
      ))}
      {/* Route path */}
      <polyline points="55,148 110,112 160,95 210,65 265,42"
        stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 3" opacity=".8"/>
      {/* Driver icon */}
      <circle cx="160" cy="95" r="8" fill="#06b6d4" opacity=".7"/>
      <circle cx="160" cy="95" r="14" stroke="#06b6d4" strokeWidth="1.5" opacity=".3"/>
      {/* Origin / destination */}
      <circle cx="55" cy="148" r="5" fill="#a78bfa"/>
      <circle cx="265" cy="42" r="5" fill="#06b6d4"/>
      {/* LLM badge */}
      <rect x="60" y="158" width="140" height="20" rx="4" fill="rgba(6,182,212,0.14)" stroke="rgba(6,182,212,0.35)" strokeWidth="1"/>
      <text x="72" y="171" fontSize="8.5" fill="#06b6d4" fontFamily="monospace">LLAMA 3.1 · GPS TRACKING</text>
    </svg>
  );
}

function RAGMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.42 }} fill="none">
      {/* Two columns representing Vector vs Vectorless RAG */}
      <rect x="30" y="30" width="110" height="130" rx="6" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="5 3"/>
      <rect x="180" y="30" width="110" height="130" rx="6" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="5 3"/>
      <text x="55" y="52" fontSize="8" fill="#a78bfa" fontFamily="monospace" opacity=".8">VECTOR RAG</text>
      <text x="188" y="52" fontSize="8" fill="#06b6d4" fontFamily="monospace" opacity=".8">VECTORLESS RAG</text>
      {/* Bars for comparison */}
      <rect x="55" y="110" width="60" height="36" rx="3" fill="#a78bfa" opacity=".35"/>
      <rect x="200" y="122" width="60" height="24" rx="3" fill="#06b6d4" opacity=".35"/>
      {/* Labels */}
      <text x="60" y="106" fontSize="7" fill="#a78bfa" fontFamily="monospace" opacity=".7">92% acc</text>
      <text x="202" y="118" fontSize="7" fill="#06b6d4" fontFamily="monospace" opacity=".7">78% acc</text>
      {/* Query arrow */}
      <line x1="160" y1="95" x2="175" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <text x="78" y="180" fontSize="8.5" fill="#a78bfa" fontFamily="monospace" opacity=".6">RAG BENCHMARKING PLATFORM</text>
    </svg>
  );
}

function ExamMockup() {
  return (
    <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }} fill="none">
      {/* Detection box */}
      <rect x="90" y="22" width="140" height="150" rx="4" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="7 4"/>
      {/* Face circle */}
      <circle cx="160" cy="85" r="38" stroke="#d946ef" strokeWidth="1.5"/>
      {/* Eyes */}
      <circle cx="147" cy="77" r="6" fill="#d946ef" opacity=".5"/>
      <circle cx="173" cy="77" r="6" fill="#d946ef" opacity=".5"/>
      {/* Smile */}
      <path d="M146 97 Q160 109 174 97" stroke="#d946ef" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Scan line */}
      <line x1="90" y1="85" x2="230" y2="85" stroke="#d946ef" strokeWidth="1" opacity=".35" strokeDasharray="4 3"/>
      {/* Corner markers */}
      {([[90,22],[230,22],[90,172],[230,172]] as [number,number][]).map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill="#d946ef" opacity=".8"/>
      ))}
      {/* Runner up badge */}
      <rect x="64" y="178" width="192" height="18" rx="4" fill="rgba(217,70,239,0.14)" stroke="rgba(217,70,239,0.35)" strokeWidth="1"/>
      <text x="78" y="190" fontSize="8.5" fill="#d946ef" fontFamily="monospace">🏆 RUNNER UP · ELIXIR 2024</text>
    </svg>
  );
}

const projects = [
  {
    num: "01",
    title: "NBA Trade Analyzer",
    desc: "Trained an XGBoost model on 5 seasons of NBA data to predict post-trade player scoring at 92% accuracy. Features Monte Carlo win simulations, SHAP explainability, and a React dashboard for composite Trade Score evaluation.",
    tags: ["React", "Flask", "XGBoost", "SHAP", "MongoDB"],
    glow: "rgba(255,255,255,0.12)",
    Mockup: NBAMockup,
    link: "https://github.com/SatyamChaturvedi39/NBA-Trade-Analyser",
  },
  {
    num: "02",
    title: "Digvijay Express — Shipment Tracker",
    desc: "Production B2B logistics mobile app with live GPS tracking over WebSockets and Meta Llama 3.1 70B powering natural-language SQL queries against live shipment data. Full FastAPI backend with JWT auth & rate limiting.",
    tags: ["React Native", "TypeScript", "FastAPI", "PostgreSQL", "Llama 3.1"],
    glow: "rgba(255,255,255,0.1)",
    Mockup: LogisticsMockup,
    link: "https://github.com/SatyamChaturvedi39/DGVJ-Shipment-Tracker",
  },
  {
    num: "03",
    title: "RAG Arena",
    desc: "AI research platform benchmarking Vector RAG against Vectorless RAG in parallel on the same query. PDF ingestion pipeline generates both vector embeddings and hierarchical document trees for live accuracy comparison.",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "Groq API"],
    glow: "rgba(255,255,255,0.11)",
    Mockup: RAGMockup,
    link: "https://github.com/SatyamChaturvedi39/RAG-Arena",
  },
  {
    num: "04",
    title: "ExamNinja — AI Proctoring",
    desc: "Secure online exam platform with live face recognition via InsightFace, tab-switch detection, auto-submission, and a real-time invigilator dashboard over WebSocket. Runner Up at ELIXIR 2024.",
    tags: ["Flask", "Python", "OpenCV", "MongoDB", "SocketIO"],
    glow: "rgba(255,255,255,0.09)",
    Mockup: ExamMockup,
    link: "https://github.com/SatyamChaturvedi39/ExamNinja",
  },
];

function ProjectCard({
  num, title, desc, tags, glow, Mockup, link, index,
}: typeof projects[0] & { index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // 3D tilt on mouse move
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 11,
        rotateX: -y * 9,
        transformPerspective: 900,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "center center",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.a
      ref={cardRef}
      href={link}
      target="_blank"
      rel="noreferrer"
      className="proj-card card-accent proj-card-3d"
      variants={fadeSlideUp}
      custom={index % 2}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Mockup image area */}
      <div className="proj-card-img">
        <div className="proj-card-grid" />
        <div
          className="proj-card-glow"
          style={{
            width: "55%", height: "55%",
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            top: "5%", left: "20%",
          }}
        />
        <Mockup />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.05)",
            position: "absolute",
            bottom: "0.6rem",
            right: "1rem",
            zIndex: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {num}
        </span>
      </div>

      {/* Card info */}
      <div style={{ padding: "1rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.65rem" }}>
          {tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
        </div>

        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem", lineHeight: 1.2 }}>
          {title}
        </h3>

        <p style={{ fontSize: "0.79rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, flex: 1 }}>
          {desc}
        </p>

        <div
          className="proj-link-inner"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "0.85rem",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.35)",
            transition: "color 0.2s",
          }}
        >
          View on GitHub
          <svg
            width="13" height="13"
            viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            className="proj-link-arrow"
            style={{ transition: "transform 0.25s ease" }}
          >
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 3%", background: "transparent" }}>
      <motion.div className="glass-heading-wrap" variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
        <div className="glass-heading">Projects</div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.num} {...p} index={i} />
        ))}
      </motion.div>

      <style>{`
        .proj-card:hover .proj-link-inner { color: rgba(255,255,255,0.9); }
        .proj-card:hover .proj-link-arrow { transform: translate(3px,-3px); color: var(--color-cyan); }
        @media (max-width: 580px) {
          #projects > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
