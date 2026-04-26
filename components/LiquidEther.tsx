"use client";
export default function LiquidEther() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "#000000",
        pointerEvents: "none",
        /* mix-blend-screen makes white blobs glow on black — matches reference site */
        mixBlendMode: "screen",
        opacity: 0.28,
      }}
    >
      <div className="le-blob le-blob-1" />
      <div className="le-blob le-blob-2" />
      <div className="le-blob le-blob-3" />
    </div>
  );
}
