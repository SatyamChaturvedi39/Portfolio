"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Preloader() {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const topRef      = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade logo in
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.8, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    // Pulse dot
    .fromTo(dotRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" },
      "-=0.3"
    )
    // Hold briefly
    .to({}, { duration: 0.9 })
    // Exit: split curtain wipe
    .to(logoRef.current,
      { opacity: 0, scale: 0.92, duration: 0.3, ease: "power2.in" }
    )
    .to([topRef.current, bottomRef.current],
      {
        y: (i: number) => i === 0 ? "-100%" : "100%",
        duration: 0.75,
        stagger: 0.055,
        ease: "power4.inOut",
        onComplete() {
          // Refresh ScrollTrigger now that real content is visible
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("preloader:done"));
          setDone(true);
        },
      },
      "-=0.1"
    );

    return () => { tl.kill(); };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        pointerEvents: "all",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top curtain panel */}
      <div
        ref={topRef}
        style={{
          position: "absolute",
          inset: 0,
          bottom: "50%",
          background: "#050505",
        }}
      />
      {/* Bottom curtain panel */}
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          inset: 0,
          top: "50%",
          background: "#050505",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div ref={logoRef} style={{ opacity: 0, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            SC.
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginTop: "0.6rem",
            }}
          >
            loading portfolio
          </div>
        </div>

        {/* Animated dot */}
        <div
          ref={dotRef}
          style={{
            marginTop: "2rem",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 0 16px rgba(255,255,255,0.7)",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}
