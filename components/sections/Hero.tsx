"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const ROLES = [
  "Aspiring AI/ML Engineer",
  "Full-Stack Developer",
  "Python Developer",
  "Data Analyst",
  "Problem Solver",
];

const BADGES = [
  { label: "Python", icon: "🐍", x: "3%", y: "12%" },
  { label: "React", icon: "⚛️", x: "82%", y: "8%" },
  { label: "FastAPI", icon: "⚡", x: "2%", y: "50%" },
  { label: "TypeScript", icon: "🔥", x: "85%", y: "40%" },
  { label: "ML / DL", icon: "📊", x: "1%", y: "80%" },
  { label: "LLM / RAG", icon: "🧠", x: "81%", y: "77%" },
  { label: "Android Studio", icon: "🟦", x: "23%", y: "91%" },
  { label: "Next.js", icon: "🐳", x: "64%", y: "90%" },
];

const BADGE_STYLE: React.CSSProperties = {
  position: "absolute",
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  padding: "0.4rem 0.9rem",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "999px",
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem", fontWeight: 500,
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.65)",
  whiteSpace: "nowrap",
  opacity: 0,
  animation: "badge-float 3.5s ease-in-out infinite",
  pointerEvents: "none",
};

const LINE1 = "SATYAM";
const LINE2 = "CHATURVEDI";

function HeroName({ ready }: { ready: boolean }) {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const spans1 = ref1.current?.querySelectorAll(".char");
    const spans2 = ref2.current?.querySelectorAll(".char");
    if (spans1) gsap.fromTo(spans1, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.045, ease: "power4.out", delay: 0.1 });
    if (spans2) gsap.fromTo(spans2, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.04, ease: "power4.out", delay: 0.35 });
  }, [ready]);

  const renderLine = (ref: React.RefObject<HTMLDivElement>, text: string, isOutline: boolean) => (
    <div ref={ref} className="hero-name" style={{ display: "block" }} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: "inline-block",
            opacity: 0,
            color: isOutline ? "transparent" : "#fff",
            WebkitTextStroke: isOutline ? "2px rgba(255,255,255,0.35)" : undefined,
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  );

  return (
    <div style={{ lineHeight: 0.9 }}>
      {renderLine(ref1, LINE1, false)}
      {renderLine(ref2, LINE2, true)}
    </div>
  );
}

function TypedRole() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let ri = 0, ci = 0, deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = ROLES[ri];
      if (!deleting) {
        ci++;
        ref.current!.textContent = word.slice(0, ci);
        if (ci === word.length) { timeout = setTimeout(() => { deleting = true; tick(); }, 2600); return; }
      } else {
        ci--;
        ref.current!.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % ROLES.length; }
      }
      timeout = setTimeout(tick, deleting ? 36 : 58);
    };
    const t = setTimeout(tick, 2200);
    return () => { clearTimeout(t); clearTimeout(timeout); };
  }, []);
  return (
    <span>
      <span ref={ref} style={{ color: "rgba(255,255,255,0.85)" }} />
      <span style={{ color: "#fff", animation: "cursor-blink .85s step-end infinite" }}>▌</span>
      <style>{`@keyframes cursor-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  );
}

export default function Hero() {
  const pillRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener("preloader:done", onDone);
    const fb = setTimeout(() => setReady(true), 2800);
    return () => { window.removeEventListener("preloader:done", onDone); clearTimeout(fb); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(pillRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(subRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "+=0.2")
      .fromTo(btnsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
      .fromTo(socialRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.25");

    badgeRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, scale: 0.75, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: 0.7 + i * 0.1, ease: "back.out(1.6)" }
      );
    });
  }, [ready]);

  // CSS handles the float — no perpetual GSAP loops

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: "6rem 3% 4rem" }}
    >
      <div className="hero-grid" />
      <div className="hero-vignette" />

      {/* Floating badges */}
      <div className="hero-badges" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        {BADGES.map((b, i) => (
          <div
            key={b.label}
            ref={(el) => { badgeRefs.current[i] = el; }}
            style={{ ...BADGE_STYLE, left: b.x, top: b.y, animationDelay: `${i * 0.45}s` }}
          >
            <span style={{ fontSize: "0.82rem" }}>{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes badge-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      {/* Role pill — above the name */}
      <div ref={pillRef} className="role-pill" style={{ opacity: 0, zIndex: 3, marginBottom: "2rem" }}>
        <span className="role-pill-dot" />
        Aspiring ML Engineer &amp; Full-Stack Developer
      </div>

      {/* Giant two-line name */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", textAlign: "center" }}>
        <HeroName ready={ready} />
      </div>

      {/* Subtitle + typed role */}
      <p
        ref={subRef}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.72rem, 1.2vw, 0.88rem)",
          color: "rgba(255,255,255,0.42)",
          maxWidth: 560,
          opacity: 0,
          zIndex: 3,
          lineHeight: 1.75,
          marginTop: "1.75rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        MSc AI &amp; ML · Christ University &nbsp;·&nbsp; <TypedRole />
      </p>

      {/* CTA buttons */}
      <div
        ref={btnsRef}
        style={{
          opacity: 0, zIndex: 3,
          display: "flex", gap: "1rem", justifyContent: "center",
          flexWrap: "wrap", marginBottom: "1.5rem",
        }}
      >
        <MagneticButton><a href="#projects" className="btn btn-white">View My Work →</a></MagneticButton>
        <MagneticButton><a href="#contact" className="btn btn-ghost">Contact Me</a></MagneticButton>
      </div>

      {/* Social icons */}
      <div
        ref={socialRef}
        style={{
          opacity: 0, zIndex: 3,
          display: "flex", gap: "0.75rem", justifyContent: "center",
        }}
      >
        <a href="https://github.com/SatyamChaturvedi39" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/satyamchaturvediii" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href="mailto:satyamchaturvedi39@gmail.com" className="social-btn" title="Email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes badge-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </section>
  );
}
