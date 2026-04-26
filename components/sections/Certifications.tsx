"use client";
import { motion } from "framer-motion";
import { scaleIn, fadeSlideUp } from "@/lib/motionVariants";

const certs = [
  {
    icon: "🖥️",
    issuer: "NVIDIA",
    name: "Getting Started with Deep Learning",
    desc: "Hands-on introduction to neural networks, image classification with CNNs, and deep learning best practices using NVIDIA's DLI platform.",
    link: "#",
    accentColor: "rgba(255,255,255,0.8)",
    isFolder: false,
  },
  {
    icon: "☁️",
    issuer: "AWS Academy",
    name: "AWS Academy Cloud Foundations",
    desc: "Core AWS services, cloud architecture, distributed systems, IAM, and security fundamentals in a hands-on environment.",
    link: "https://drive.google.com/file/d/103CaMcqV_IyGUdFOcLb4Ew_vwxD0Phux/view?usp=drive_link",
    accentColor: "rgba(200,200,200,0.7)",
    isFolder: false,
  },
  {
    icon: "🤖",
    issuer: "Infosys Springboard",
    name: "Python for Data Science",
    desc: "Data analysis with NumPy and Pandas, data visualisation, statistical modelling, and applying Python to real-world data science pipelines.",
    link: "https://drive.google.com/file/d/1KcyVdMCEBeR2D932IBmGKF-S0tKl2D4z/view?usp=drive_link",
    accentColor: "rgba(230,230,230,0.75)",
    isFolder: false,
  },
  {
    icon: "🎓",
    issuer: "NPTEL",
    name: "The Joy of Computing Using Python",
    desc: "12-week IIT Madras course on Python fundamentals, algorithms, and computational thinking. Consolidated score: 77% (Online Assignments 24.16/25, Proctored Exam 52.78/75).",
    link: "https://drive.google.com/file/d/1vYlaMOQD-FgprgpAfujxmXfk_R4TNCSm/view?usp=drive_link",
    accentColor: "rgba(200,200,200,0.7)",
    isFolder: false,
  },
  {
    icon: "🐍",
    issuer: "DataCamp",
    name: "Intermediate OOP in Python",
    desc: "Object-oriented design patterns, inheritance, composition, and Pythonic abstractions for clean, production-grade code.",
    link: "https://drive.google.com/file/d/1dT2sVIr47YEjyfgDvTYWhe5mUJM4mi1U/view?usp=drive_link",
    accentColor: "rgba(230,230,230,0.75)",
    isFolder: false,
  },
  {
    icon: "⚙️",
    issuer: "NPTEL",
    name: "Programming in Modern C++",
    desc: "Modern C++ features including STL, templates, smart pointers, concurrency primitives, and advanced OOP design patterns.",
    link: "https://drive.google.com/file/d/1WkCPQvzT3ekcdL9_rqLD-hX3gRXlh0Hx/view?usp=drive_link",
    accentColor: "rgba(255,255,255,0.8)",
    isFolder: false,
  },
  {
    icon: "🍃",
    issuer: "MongoDB",
    name: "Introduction to MongoDB",
    desc: "Document model fundamentals, CRUD operations, indexing strategies, aggregation pipelines, and schema design for scalable NoSQL applications.",
    link: "https://drive.google.com/drive/folders/1A6ASgZBkh0Wk6Kj8jEgOM9V6reK8Sz3c?usp=drive_link",
    accentColor: "rgba(200,200,200,0.7)",
    isFolder: true,
  },
  {
    icon: "📁",
    issuer: "Infosys Springboard",
    name: "Infosys Certificates — Full Folder",
    desc: "Collection of all Infosys Springboard course completions including AI, ML, Python for Data Science, and related programs.",
    link: "https://drive.google.com/drive/folders/1VhNEd4EMjlCgCQciAMAAiAwY-PYtmia4?usp=drive_link",
    accentColor: "rgba(255,255,255,0.8)",
    isFolder: true,
  },
  {
    icon: "🦜",
    issuer: "LangChain",
    name: "LangChain Certificates — Full Folder",
    desc: "All LangChain certifications covering LLM application development, retrieval-augmented generation, and agent design patterns.",
    link: "https://drive.google.com/drive/folders/18WcmD35zdDyrW_dbTT5wQY7lzL2FDCk4?usp=drive_link",
    accentColor: "rgba(230,230,230,0.75)",
    isFolder: true,
  },
];

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: "7rem 3%", background: "transparent" }}>
      <motion.div className="glass-heading-wrap" variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
        <div className="glass-heading">Certifications</div>
      </motion.div>

      <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {certs.map(({ icon, issuer, name, desc, link, accentColor, isFolder }, i) => (
          <motion.div
            key={name}
            className="cert-card"
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            custom={i}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}, ${accentColor}00)`,
              opacity: 0.75,
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: "rgba(24,24,24,0.95)",
                border: `1px solid rgba(255,255,255,0.12)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem",
              }}>
                {icon}
              </div>
              <span className="cert-issuer-badge">
                {issuer}
              </span>
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.3 }}>{name}</h3>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, flex: 1 }}>{desc}</p>

            <a
              href={link}
              target={link !== "#" ? "_blank" : undefined}
              rel="noreferrer"
              onClick={link === "#" ? (e) => e.preventDefault() : undefined}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                padding: "0.65rem",
                background: "rgba(18,18,18,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: link === "#" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.55)",
                fontSize: "0.76rem", fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
                marginTop: "0.25rem",
                cursor: link === "#" ? "default" : "none",
              }}
              onMouseEnter={(e) => {
                if (link === "#") return;
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(255,255,255,0.35)";
                el.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                if (link === "#") return;
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(18,18,18,0.9)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              {link === "#" ? "Link coming soon" : isFolder ? "📂 Open Folder →" : "View Certificate →"}
            </a>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          #certifications > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          #certifications > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
