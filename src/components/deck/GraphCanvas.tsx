import { useMemo } from "react";
import { useDeck } from "./HorizontalDeck";

// Continuous background graph spanning the full deck width.
// Renders fine teal points + thin lines that visibly cross panel boundaries.
export function GraphCanvas({ count }: { count: number }) {
  const { index, reducedMotion } = useDeck();

  const { nodes, edges } = useMemo(() => {
    // Deterministic pseudo-random
    let s = 7;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const W = count * 100; // viewport widths
    const H = 100;
    const density = 14; // nodes per panel
    const nodes: { x: number; y: number; r: number }[] = [];
    for (let i = 0; i < count * density; i++) {
      nodes.push({ x: rnd() * W, y: rnd() * H, r: 0.25 + rnd() * 0.5 });
    }
    // Connect each node to a couple of nearby ones
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const cand = nodes
        .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
        .filter((x) => x.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(1, 3);
      cand.forEach((c) => {
        if (c.d < 18 && i < c.j) edges.push([i, c.j]);
      });
    }
    return { nodes, edges };
  }, [count]);

  const W = count * 100;
  const drift = reducedMotion ? 0 : (index % 2 === 0 ? -0.4 : 0.4);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        width: `${count * 100}vw`,
        transform: `translate3d(${-index * 100}vw, 0, 0)`,
        transition: "transform 0.85s cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
    >
      <svg
        viewBox={`0 0 ${W} 100`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.55 }}
      >
        <defs>
          <radialGradient id="bgFade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </radialGradient>
        </defs>
        {/* faint graticule */}
        {Array.from({ length: count * 8 }).map((_, i) => (
          <line key={`v${i}`} x1={(i / (count * 8)) * W} y1="0" x2={(i / (count * 8)) * W} y2="100" stroke="#DCE3EC" strokeWidth="0.05" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={(i / 10) * 100} x2={W} y2={(i / 10) * 100} stroke="#DCE3EC" strokeWidth="0.05" />
        ))}
        {edges.map(([a, b], i) => {
          const na = nodes[a], nb = nodes[b];
          return (
            <line
              key={`e${i}`}
              x1={na.x + drift * 0.05}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#0EA5A0"
              strokeOpacity={0.22}
              strokeWidth={0.08}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r * 0.18} fill="#0EA5A0" fillOpacity={0.6} />
        ))}
        {/* soft white vignette top/bottom */}
        <rect x="0" y="0" width={W} height="100" fill="url(#bgFade)" opacity="0.25" />
      </svg>
    </div>
  );
}
