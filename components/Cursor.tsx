"use client";
import { useEffect, useRef } from "react";

/**
 * Cursor — replaces the OS cursor with two layered elements:
 *   • dot   — snaps instantly to the mouse position
 *   • ring  — follows with lerp (linear interpolation), giving a
 *             trailing "lag" that feels weighty and premium.
 *
 * On hoverable elements the ring collapses and the dot expands,
 * creating a "magnetic" takeover effect.
 */
export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = 0, my = 0;   // current mouse
    let rx = 0, ry = 0;   // ring's lagged position
    let raf: number;

    // --- track mouse position ---
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    // --- lerp loop for the ring ---
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(loop);
    };

    // --- hover state: add class to <body> ---
    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    const interactables = document.querySelectorAll(
      "a, button, .skill-tile, .proj-card, .cert-card, .card, .tl-icon-node"
    );
    interactables.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactables.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
