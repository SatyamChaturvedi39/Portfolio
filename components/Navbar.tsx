"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLenis } from "@/components/SmoothScroll";

const links = [
  { label: "Home",       href: "#home"           },
  { label: "About",      href: "#about"          },
  { label: "Education",  href: "#education"      },
  { label: "Skills",     href: "#skills"         },
  { label: "Experience", href: "#experience"     },
  { label: "Projects",   href: "#projects"       },
  { label: "Certs",      href: "#certifications" },
  { label: "Contact",    href: "#contact"        },
];

export default function Navbar() {
  const navRef      = useRef<HTMLElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const bubbleRef   = useRef<HTMLDivElement>(null);
  const linkRefs    = useRef<(HTMLAnchorElement | null)[]>([]);
  const initialized = useRef(false);
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  // Active-link tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.35 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Bubble follows active link
  useEffect(() => {
    const idx = links.findIndex((l) => l.href.replace("#", "") === active);
    if (idx < 0) return;
    const link   = linkRefs.current[idx];
    const inner  = innerRef.current;
    const bubble = bubbleRef.current;
    if (!link || !inner || !bubble) return;

    const linkRect  = link.getBoundingClientRect();
    const innerRect = inner.getBoundingClientRect();
    const left   = linkRect.left  - innerRect.left;
    const width  = linkRect.width;
    const height = linkRect.height;

    if (!initialized.current) {
      gsap.set(bubble, { left, width, height, top: 0 });
      initialized.current = true;
    } else {
      gsap.to(bubble, { left, width, height, duration: 0.38, ease: "power3.inOut" });
    }
  }, [active]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => scrollTo(href), 50);
  };

  return (
    <>
      {/* Desktop pill nav */}
      <nav
        ref={navRef}
        className="nav-glass-group fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-3 py-1.5 overflow-hidden"
        style={{ opacity: 0, width: "fit-content" }}
      >
        <div className="nav-grad-border-top" />
        <div className="nav-grad-border-bottom" />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "999px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div ref={innerRef} style={{ position: "relative", display: "flex", alignItems: "center", padding: "0.25rem" }}>
          <div ref={bubbleRef} className="nav-bubble" style={{ position: "absolute", top: 0 }} />
          {links.map(({ label, href }, i) => {
            const id = href.replace("#", "");
            return (
              <a
                key={id}
                ref={(el) => { linkRefs.current[i] = el; }}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`nav-link ${active === id ? "active" : ""}`}
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div className="nav-mobile-overlay">
          {links.map(({ label, href }) => {
            const id = href.replace("#", "");
            return (
              <a
                key={id}
                href={href}
                onClick={(e) => handleMobileClick(e, href)}
                className={`nav-mobile-link ${active === id ? "active" : ""}`}
              >
                {label}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
