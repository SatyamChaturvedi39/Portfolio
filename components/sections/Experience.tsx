"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scaleIn } from "@/lib/motionVariants";

gsap.registerPlugin(ScrollTrigger);

interface Entry {
  date: string;
  title: string;
  org: string;
  desc: string;
  icon: string;
  side: "left" | "right";
  extra?: React.ReactNode;
}

const entries: Entry[] = [
  {
    side: "right",
    icon: "💼",
    date: "Dec 2024 – Mar 2025",
    title: "Web Development Intern",
    org: "Inspire Life Insurance Solutions",
    desc: "Built a production-grade web platform that drove ~150% growth in client acquisition in Q1 post-launch. Engineered RESTful APIs connecting React/TypeScript frontend to Node.js/Express backend with MongoDB, plus role-based access control dashboards.",
  },
  {
    side: "left",
    icon: "🏆",
    date: "Aug 2024 – Apr 2025",
    title: "General Secretary",
    org: "Cybernetics Association, St. Joseph's University",
    desc: "Spearheaded planning and execution of tech events, workshops, and inter-college competitions. The flagship Syntaxia event drew 300+ participants across institutions.",
  },
  {
    side: "right",
    icon: "🌐",
    date: "Jan 2026 – Present",
    title: "Web Master",
    org: "IEEE Student Branch, CHRIST University",
    desc: "Managing the branch's official digital presence and website infrastructure. Assisting in organising events focused on technical development and student engagement.",
  },
];

function TimelineCard({ entry }: { entry: Entry }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isLeft = entry.side === "left";

  return (
    <div
      className="tl-row"
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-end" : "flex-start",
        padding: isLeft ? "0 52px 0 0" : "0 0 0 52px",
        marginBottom: "2.5rem",
        position: "relative",
      }}
    >
      <div
        ref={ref}
        className="tl-card"
        style={{
          width: "calc(55% - 0px)",
          textAlign: isLeft ? "right" : "left",
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? "translateX(0)"
            : `translateX(${isLeft ? -44 : 44}px)`,
          transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Date badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "0.22rem 0.8rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.9rem",
          }}
        >
          {entry.date}
        </div>

        <div style={{ fontSize: "1.18rem", fontWeight: 600, marginBottom: "0.3rem", lineHeight: 1.25 }}>
          {entry.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.85rem",
          }}
        >
          {entry.org}
        </div>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
          {entry.desc}
        </p>
        {entry.extra}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);

  // Animated timeline line draw via GSAP scrub
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current || !lineWrapRef.current) return;
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: lineWrapRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ padding: "7rem 3%", background: "transparent" }}
    >
      <motion.div className="glass-heading-wrap" variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
        <div className="glass-heading">Experience</div>
      </motion.div>

      {/* Timeline container */}
      <div
        ref={lineWrapRef}
        style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}
      >
        {/* Animated glowing centre line */}
        <div
          className="tl-bg-line"
          style={{
            position: "absolute",
            top: 0, bottom: 0,
            left: "50%",
            width: 1,
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          ref={lineRef}
          className="tl-line-glow"
          style={{ scaleY: 0 } as React.CSSProperties}
        />

        {/* Icon nodes and cards */}
        {entries.map((e, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div className="tl-icon-node" style={{ top: "1.4rem" }}>{e.icon}</div>
            <TimelineCard entry={e} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .tl-line { left: 24px !important; }
          .tl-line-glow { left: 24px !important; }
          .tl-icon-node { left: 24px !important; }
          #experience [style*="flex"] {
            justify-content: flex-start !important;
            padding: 0 0 0 64px !important;
          }
          #experience .tl-card {
            width: 100% !important;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
