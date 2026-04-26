"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { scaleIn, fadeSlideLeft, fadeSlideRight } from "@/lib/motionVariants";

function FloatField({
  label,
  name,
  type = "text",
  textarea = false,
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const fieldProps = {
    name,
    className: `form-input floating${textarea ? " form-textarea" : ""}`,
    placeholder: focused ? placeholder : "",
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    value,
    required,
  };

  return (
    <div className={`field-wrap${hasValue ? " has-value" : ""}`}>
      <motion.label
        className="field-label-float"
        animate={{
          y: focused || hasValue ? -12 : 0,
          scale: focused || hasValue ? 0.82 : 1,
          color: focused ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        style={{ transformOrigin: "left top" }}
      >
        {label}
        {required && <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 2 }}>*</span>}
      </motion.label>

      {textarea ? (
        <textarea {...fieldProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>} style={{ minHeight: 130 }} />
      ) : (
        <input type={type} {...fieldProps as React.InputHTMLAttributes<HTMLInputElement>} />
      )}
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof fields) => (v: string) => setFields(f => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setFields({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const infoItems = [
    { icon: "📍", label: "Location", value: "Bengaluru, India" },
    { icon: "✉️", label: "Email",    value: "satyamchaturvedi39@gmail.com" },
    { icon: "📞", label: "Phone",    value: "+91 96634 69507" },
  ];

  const socials = [
    { label: "GitHub",      href: "https://github.com/SatyamChaturvedi39" },
    { label: "LinkedIn",    href: "https://www.linkedin.com/in/satyamchaturvediii/" },
    { label: "Resume ↗",   href: "https://drive.google.com/file/d/1mJBoeJr58IivfZIL9kISQ8wusqzZ6uuJ/view?usp=drive_link" },
  ];

  return (
    <section
      id="contact"
      style={{ padding: "7rem 3%", background: "transparent", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
          background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <motion.div className="glass-heading-wrap" variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
        <div className="glass-heading">
          Contact <span className="dim">Me</span>
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.45fr", gap: "4rem", alignItems: "start" }}>
        {/* Left info */}
        <motion.div variants={fadeSlideLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Let&apos;s collaborate
          </h3>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.85, marginBottom: "2rem" }}>
            I&apos;m actively looking for ML engineering and full-stack roles.
            Whether you have an opportunity, a project idea, or just want to say hi —
            I&apos;ll always get back to you.
          </p>

          {infoItems.map(({ icon, label, value }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.1rem" }}>
              <div
                style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(18,18,18,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem",
                }}
              >
                {icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.32)",
                    marginBottom: "0.1rem",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.72)" }}>{value}</div>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 1.1rem",
                  background: "rgba(18,18,18,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.4)";
                  el.style.color = "#fff";
                  el.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.color = "rgba(255,255,255,0.5)";
                  el.style.background = "rgba(18,18,18,0.9)";
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div variants={fadeSlideRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <FloatField label="Name" name="name" placeholder="Your name" required value={fields.name} onChange={set("name")} />
              <FloatField label="Email" name="email" type="email" placeholder="your@email.com" required value={fields.email} onChange={set("email")} />
            </div>
            <FloatField label="Subject" name="subject" placeholder="What's this about?" required value={fields.subject} onChange={set("subject")} />
            <FloatField label="Message" name="message" textarea placeholder="Tell me more..." required value={fields.message} onChange={set("message")} />

            {status === "success" && (
              <div style={{
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.85)",
                textAlign: "center",
              }}>
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div style={{
                padding: "0.75rem 1rem",
                background: "rgba(255,80,80,0.08)",
                border: "1px solid rgba(255,80,80,0.25)",
                borderRadius: 10,
                fontSize: "0.82rem",
                color: "rgba(255,120,120,0.9)",
                textAlign: "center",
              }}>
                Something went wrong. Please try emailing directly.
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-white contact-submit-btn"
              style={{ width: "100%", justifyContent: "center", borderRadius: 10, padding: "0.95rem", opacity: status === "loading" ? 0.65 : 1 }}
              whileHover={{ scale: status === "loading" ? 1 : 1.02, boxShadow: "0 10px 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              <span className="btn-text">
                {status === "loading" ? "Sending..." : status === "success" ? "Sent ✓" : "Send Message"}
              </span>
              {status !== "loading" && status !== "success" && (
                <svg
                  className="btn-icon"
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: "transform 0.3s ease" }}
                >
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22 11 13 2 9l20-7z"/>
                </svg>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style>{`
        .contact-submit-btn:hover .btn-icon { transform: translate(4px, -4px); }
        @media (max-width: 860px) {
          #contact > div:last-child { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 480px) {
          #contact [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
