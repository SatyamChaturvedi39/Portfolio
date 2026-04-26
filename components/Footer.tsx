"use client";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/SmoothScroll";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1.6rem 3%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: "-0.01em",
            color: "#fff",
          }}
        >
          SC.
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          Satyam Chaturvedi · ML Engineer &amp; Full-Stack Developer
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          Bengaluru, India · © 2025
        </span>
      </footer>

      {/* Back to top */}
      <a
        href="#home"
        className={`back-top ${visible ? "" : "hidden"}`}
        onClick={scrollTop}
        title="Back to top"
      >
        ↑
      </a>
    </>
  );
}
