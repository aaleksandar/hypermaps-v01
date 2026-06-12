import { motion } from "framer-motion";
import { PanelShell } from "./PanelShell";

const SILOS = [
  { label: "Social posts", note: "photos, check-ins" },
  { label: "Review sites", note: "ratings, hours" },
  { label: "Gov records", note: "permits, zoning" },
  { label: "Sensor data", note: "noise, air, foot traffic" },
  { label: "Local apps", note: "niche communities" },
  { label: "Local knowledge", note: "untyped, untapped" },
];

const FRICTIONS = [
  { tag: "SILOED", text: "Same place, scattered everywhere." },
  { tag: "UN-NORMALIZED", text: "Nothing speaks the same schema." },
  { tag: "LICENSING", text: "Most of it can't be reused." },
  { tag: "NO INCENTIVE", text: "Nobody is rewarded for sharing." },
];

export function Panel2Problem() {
  return (
    <PanelShell tag="THE PROBLEM TODAY">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center text-left">
        {/* Left: thesis */}
        <div>
          <h2 className="text-4xl md:text-5xl font-medium text-ink-900 leading-[1.08]">
            One place. <span className="text-ink-400">A dozen views.</span><br />
            None of them connected.
          </h2>
          <p className="mt-6 text-ink-600 max-w-xl">
            A single point of interest lives across social posts, review sites,
            government records, sensor feeds, niche apps, and local knowledge —
            each community seeing it a different way.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {FRICTIONS.map((f, i) => (
              <motion.div
                key={f.tag}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="border-l-2 border-line-200 pl-3"
              >
                <div className="font-mono-tag text-query">{f.tag}</div>
                <div className="text-ink-900 text-sm md:text-base mt-1">{f.text}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: one POI, many fragmented views */}
        <div className="relative">
          <svg viewBox="0 0 520 440" className="w-full h-[440px]">
            <defs>
              <radialGradient id="poiGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0EA5A0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0EA5A0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* the one POI at center */}
            <circle cx={260} cy={220} r={90} fill="url(#poiGlow)" />
            <circle cx={260} cy={220} r={6} fill="#0EA5A0" />
            <circle cx={260} cy={220} r={13} fill="none" stroke="#0EA5A0" strokeOpacity={0.4} />
            <text
              x={260}
              y={250}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize={9}
              fill="#0B8F8A"
              letterSpacing="0.14em"
            >
              ONE POI
            </text>

            {SILOS.map((s, i) => {
              const angle = (i / SILOS.length) * Math.PI * 2 - Math.PI / 2;
              const x = 260 + Math.cos(angle) * 185;
              const y = 220 + Math.sin(angle) * 165;
              return (
                <motion.g
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                >
                  {/* broken/dashed link — never joined */}
                  <line
                    x1={x + (260 - x) * 0.22}
                    y1={y + (220 - y) * 0.22}
                    x2={x + (260 - x) * 0.55}
                    y2={y + (220 - y) * 0.55}
                    stroke="#C4CDD9"
                    strokeWidth={0.6}
                    strokeDasharray="2 4"
                  />
                  {/* fragmented view of POI — a small ghost dot inside each silo */}
                  <circle
                    cx={x}
                    cy={y - 2}
                    r={3}
                    fill="#0EA5A0"
                    fillOpacity={0.35}
                  />
                  <rect
                    x={x - 76}
                    y={y - 22}
                    width={152}
                    height={44}
                    rx={3}
                    fill="#FFFFFF"
                    stroke="#DCE3EC"
                  />
                  {/* lock glyph */}
                  <rect x={x - 68} y={y - 6} width={5} height={6} fill="#7A879C" />
                  <path
                    d={`M ${x - 68} ${y - 6} a 2.5 2.5 0 0 1 5 0`}
                    fill="none"
                    stroke="#7A879C"
                    strokeWidth={1}
                  />
                  <text
                    x={x - 56}
                    y={y - 5}
                    fontFamily="Inter, sans-serif"
                    fontSize={11}
                    fill="#1B2330"
                    fontWeight={500}
                  >
                    {s.label}
                  </text>
                  <text
                    x={x - 56}
                    y={y + 10}
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize={8}
                    fill="#7A879C"
                  >
                    {s.note}
                  </text>
                </motion.g>
              );
            })}
          </svg>
          <div className="font-mono-tag text-ink-400 text-center mt-2">
            same place · fragmented views · never joined
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
