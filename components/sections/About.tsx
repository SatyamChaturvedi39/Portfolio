"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scaleIn, fadeSlideLeft, fadeSlideRight } from "@/lib/motionVariants";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: "7rem 3%", background: "transparent" }}
    >
      {/* Section badge */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="text-center"
      >
        <div className="glass-heading">
          About <span className="dim">Me</span>
        </div>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "clamp(180px, 25vw, 280px) 1fr",
          gap: "4rem",
          alignItems: "center",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Avatar */}
        <motion.div
          variants={fadeSlideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 280 }}>
            {/* Spinning ring */}
            <div style={{
              position: "absolute", inset: "-10%",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "50%",
              animation: "spin-slow 10s linear infinite",
              pointerEvents: "none",
            }} />
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.9) 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                boxShadow: "inset 0 0 40px rgba(255,255,255,0.04), 0 0 60px rgba(255,255,255,0.06)",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Satyam Chaturvedi"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", position: "relative", zIndex: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={fadeSlideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div
            className="glass-panel"
            style={{ borderRadius: "2rem", padding: "2.5rem 3rem", position: "relative", overflow: "hidden" }}
          >
            {/* Inner gradient shimmer */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
              opacity: 0.4, pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              {[
                {
                  title: "Who I Am",
                  body: (
                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, textAlign: "justify" }}>
                      I'm a <strong style={{ color: "#fff", fontWeight: 600 }}>Full-Stack Developer and aspiring ML Engineer</strong> pursuing
                      an MSc in Artificial Intelligence &amp; Machine Learning at Christ University, Bengaluru — after completing
                      a BCA with <strong style={{ color: "#fff", fontWeight: 600 }}>8.04 CGPA</strong> from St. Joseph's University. My background
                      spans production web engineering and applied ML — I live at the intersection of the two.
                    </p>
                  ),
                },
                {
                  title: "What I Do",
                  body: (
                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, textAlign: "justify" }}>
                      I build <strong style={{ color: "#fff", fontWeight: 600 }}>full-stack applications</strong> with React, FastAPI, and Node.js,
                      and apply ML — XGBoost, TensorFlow, RAG pipelines — to real products. During my internship at
                      Inspire Life Insurance Solutions I drove a{" "}
                      <strong style={{ color: "#fff", fontWeight: 600 }}>150%+ jump in client acquisition</strong> in Q1 post-launch through a
                      production-grade web platform with role-based access control dashboards.
                    </p>
                  ),
                },
                {
                  title: "Beyond the Screen",
                  body: (
                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, textAlign: "justify" }}>
                      Former General Secretary of the Cybernetics Association — ran Syntaxia, a flagship tech event
                      with <strong style={{ color: "#fff", fontWeight: 600 }}>300+ participants</strong> across institutions. Currently serving
                      as <strong style={{ color: "#fff", fontWeight: 600 }}>Web Master at IEEE Student Branch, CHRIST University</strong>.
                      Runner Up at ELIXIR 2024 for ExamNinja.
                    </p>
                  ),
                },
              ].map(({ title, body }) => (
                <div key={title} style={{ marginBottom: "1.6rem" }}>
                  <h3 style={{
                    display: "flex", alignItems: "center", gap: "0.7rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem", fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "0.6rem",
                  }}>
                    <span style={{ width: 24, height: 2, background: "rgba(255,255,255,0.4)", display: "inline-block", borderRadius: 2, flexShrink: 0 }} />
                    {title}
                  </h3>
                  {body}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @media (max-width: 860px) {
          #about > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
