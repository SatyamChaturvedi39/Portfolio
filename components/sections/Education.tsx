"use client";
import { motion } from "framer-motion";
import { scaleIn, fadeSlideUp } from "@/lib/motionVariants";

const degrees = [
  {
    icon: "🎓",
    degree: "MSc in Artificial Intelligence & Machine Learning",
    institution: "CHRIST (Deemed to be University)",
    location: "Bengaluru, Karnataka",
    period: "June 2025 – Present",
    color: "rgba(255,255,255,0.8)",
    tags: ["Deep Learning", "NLP", "Computer Vision", "Statistical Modelling"],
  },
  {
    icon: "🎓",
    degree: "Bachelor of Computer Applications",
    institution: "St. Joseph's University",
    location: "Bengaluru, Karnataka",
    period: "April 2022 – May 2025",
    color: "rgba(200,200,200,0.7)",
    extra: "CGPA — 8.04 / 10",
    tags: ["Web Technologies", "Data Structures", "DBMS", "Software Engineering"],
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: "7rem 3%", background: "transparent" }}>
      <motion.div className="glass-heading-wrap" variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
        <div className="glass-heading">Education</div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {degrees.map((d, i) => (
          <motion.div
            key={d.degree}
            className="glass-panel"
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            custom={i}
            style={{ padding: "2rem", position: "relative", overflow: "hidden" }}
          >
            {/* Accent top line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${d.color}, transparent)`,
            }} />

            {/* Icon + period */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem",
                boxShadow: "0 0 18px rgba(255,255,255,0.08)",
              }}>
                {d.icon}
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.38)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                padding: "0.22rem 0.75rem",
              }}>
                {d.period}
              </span>
            </div>

            <h3 style={{ fontSize: "1.12rem", fontWeight: 600, lineHeight: 1.3, marginBottom: "0.4rem" }}>
              {d.degree}
            </h3>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.76rem",
              color: "rgba(255,255,255,0.62)",
              letterSpacing: "0.04em",
              marginBottom: "0.3rem",
            }}>
              {d.institution}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.42)",
              marginBottom: d.extra ? "0.75rem" : "1rem",
            }}>
              {d.location}
            </div>

            {d.extra && (
              <div style={{
                display: "inline-block",
                marginBottom: "1rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 999,
                padding: "0.22rem 0.8rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.75)",
              }}>
                {d.extra}
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {d.tags.map((t) => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #education > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
