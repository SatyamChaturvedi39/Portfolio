"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { scaleIn, fadeSlideUp } from "@/lib/motionVariants";

const ROW_1 = [
  { icon: "🐍", name: "Python",      color: "#3572A5" },
  { icon: "⚛️", name: "React",       color: "#61dafb" },
  { icon: "🟦", name: "TypeScript",  color: "#3178c6" },
  { icon: "🟢", name: "Node.js",     color: "#68a063" },
  { icon: "🗄️", name: "PostgreSQL",  color: "#336791" },
  { icon: "⚡", name: "FastAPI",     color: "#009688" },
  { icon: "🌶️", name: "Flask",       color: "#a78bfa" },
  { icon: "🔥", name: "TensorFlow",  color: "#FF6F00" },
  { icon: "📊", name: "XGBoost",     color: "#00C853" },
  { icon: "📷", name: "OpenCV",      color: "#4caf50" },
];

const ROW_2 = [
  { icon: "🔀", name: "Git / GitHub",    color: "#f14e32" },
  { icon: "🐳", name: "Docker",          color: "#2496ed" },
  { icon: "📱", name: "React Native",    color: "#61dafb" },
  { icon: "🍃", name: "MongoDB",         color: "#4db33d" },
  { icon: "☁️", name: "AWS",             color: "#ff9900" },
  { icon: "🧠", name: "LLM / RAG",       color: "#7c3aed" },
  { icon: "🚀", name: "Express.js",      color: "#c0c0c0" },
  { icon: "🔌", name: "WebSockets",      color: "#0288d1" },
  { icon: "🤖", name: "scikit-learn",    color: "#f7931e" },
  { icon: "⚙️", name: "C++",             color: "#00599C" },
];

function Tile({ icon, name, color }: { icon: string; name: string; color: string }) {
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const onEnter = () => {
      gsap.to(el, {
        boxShadow: "0 0 28px rgba(255,255,255,0.18)",
        borderColor: "rgba(255,255,255,0.38)",
        duration: 0.3,
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        boxShadow: "none",
        borderColor: "rgba(255,255,255,0.1)",
        duration: 0.4,
      });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [color]);

  return (
    <div
      ref={tileRef}
      className="skill-tile"
      style={{ "--skill-color": `${color}22` } as React.CSSProperties}
    >
      <span className="skill-icon">{icon}</span>
      <span className="skill-name">{name}</span>
    </div>
  );
}

function MarqueeRow({ tiles, reverse = false }: { tiles: typeof ROW_1; reverse?: boolean }) {
  const all = [...tiles, ...tiles];
  return (
    <div className={`marquee-track ${reverse ? "rev" : ""}`}>
      {all.map((t, i) => (
        <Tile key={`${t.name}-${i}`} icon={t.icon} name={t.name} color={t.color} />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 0", background: "transparent", overflow: "hidden" }}>
      {/* Badge */}
      <div style={{ padding: "0 3%" }}>
        <motion.div
          className="glass-heading-wrap"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className="glass-heading">
            <span className="dim">My</span> Skills
          </div>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        className="marquee-wrap"
        style={{ position: "relative" }}
        variants={fadeSlideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Fade edges */}
        <div
          style={{
            position: "absolute", top: 0, bottom: 0, left: 0, width: 120, zIndex: 2,
            background: "linear-gradient(to right, #000000, transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", top: 0, bottom: 0, right: 0, width: 120, zIndex: 2,
            background: "linear-gradient(to left, #000000, transparent)",
            pointerEvents: "none",
          }}
        />

        <div style={{ padding: "0.5rem 0" }}>
          <MarqueeRow tiles={ROW_1} />
        </div>
        <div style={{ padding: "0.5rem 0", marginTop: "1rem" }}>
          <MarqueeRow tiles={ROW_2} reverse />
        </div>
      </motion.div>
    </section>
  );
}
