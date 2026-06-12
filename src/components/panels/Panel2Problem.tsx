import { motion } from "framer-motion";
import { PanelShell } from "./PanelShell";

// Concrete, recognizable examples of where real-world signal is trapped.
const SILOS = [
  { label: "Google reviews", note: "Walled platform API" },
  { label: "TikTok / Reels", note: "Locked behind ToS" },
  { label: "Reddit threads", note: "Scrape-restricted" },
  { label: "Placer-style mobility", note: "Sold, not shared" },
  { label: "Permit & gov records", note: "Fragmented, hard to license" },
  { label: "Field & sensor data", note: "Captured, never published" },
  { label: "Vegan / niche maps", note: "Siloed community apps" },
  { label: "Local blogs & forums", note: "Unstructured, unlinked" },
  { label: "OSM notes", note: "Open but disconnected" },
  { label: "Noise / air quality", note: "Trapped per-project" },
];

const FRICTIONS = [
  { tag: "LICENSING", text: "Most data isn't licensed for commercial reuse." },
  { tag: "NORMALIZATION", text: "What is available needs cleaning, joining, reconciling." },
  { tag: "INCENTIVES", text: "Hoarded data is rewarded. Shared data is not." },
];

export function Panel2Problem() {
  return (
    <PanelShell tag="PROBLEM">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center text-left">
        {/* Left: thesis */}
        <div>
          <h2 className="text-4xl md:text-5xl font-medium text-ink-900 leading-[1.08]">
            AI agents are <span className="text-ink-400">blind</span> to the physical world.
          </h2>
          <p className="mt-6 text-ink-600 text-lg max-w-xl">
            Real-time point-of-interest data isn't easily available to AI. Foundation
            models are not properly aware of the physical world — no model scores
            above <span className="text-ink-900 font-medium">67% on real-world place reasoning</span>.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {FRICTIONS.map((f, i) => (
              <motion.div
                key={f.tag}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 items-start border-l-2 border-line-200 pl-4"
              >
                <span className="font-mono-tag text-query mt-1 w-36 shrink-0">{f.tag}</span>
                <span className="text-ink-900 text-lg md:text-xl">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: silo diagram — agent at center, named silos around it, all walled off */}
        <div className="relative">
          <svg viewBox="0 0 560 480" className="w-full h-[480px]">
            <defs>
              <radialGradient id="agentBlind" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5B5BF0" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#5B5BF0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* agent (blind) */}
            <circle cx={280} cy={240} r={95} fill="url(#agentBlind)" />
            <circle cx={280} cy={240} r={18} fill="#FFFFFF" stroke="#5B5BF0" strokeWidth={1} />
            <circle cx={280} cy={240} r={5} fill="#5B5BF0" />
            <text
              x={280}
              y={275}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize={10}
              fill="#5B5BF0"
              letterSpacing="0.14em"
            >
              AI AGENT
            </text>

            {SILOS.map((s, i) => {
              const angle = (i / SILOS.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 190;
              const x = 280 + Math.cos(angle) * radius;
              const y = 240 + Math.sin(angle) * (radius * 0.92);
              // dashed line stops short — a wall
              const blockX = 280 + Math.cos(angle) * 78;
              const blockY = 240 + Math.sin(angle) * 72;
              const boxW = 158;
              const boxH = 50;
              return (
                <motion.g
                  key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                >
                  {/* broken reach */}
                  <line
                    x1={blockX}
                    y1={blockY}
                    x2={x + (280 - x) * 0.18}
                    y2={y + (240 - y) * 0.18}
                    stroke="#C4CDD9"
                    strokeWidth={0.6}
                    strokeDasharray="2 4"
                  />
                  {/* wall tick near agent */}
                  <line
                    x1={blockX - Math.sin(angle) * 7}
                    y1={blockY + Math.cos(angle) * 7}
                    x2={blockX + Math.sin(angle) * 7}
                    y2={blockY - Math.cos(angle) * 7}
                    stroke="#C4CDD9"
                    strokeWidth={1.2}
                  />
                  {/* silo card */}
                  <rect
                    x={x - boxW / 2}
                    y={y - boxH / 2}
                    width={boxW}
                    height={boxH}
                    rx={3}
                    fill="#FFFFFF"
                    stroke="#DCE3EC"
                  />
                  {/* lock glyph */}
                  <g transform={`translate(${x - boxW / 2 + 10}, ${y - 6})`}>
                    <path
                      d="M 0 0 a 3 3 0 0 1 6 0"
                      fill="none"
                      stroke="#7A879C"
                      strokeWidth={1}
                    />
                    <rect x={-0.5} y={0} width={7} height={7} fill="#7A879C" />
                  </g>
                  <text
                    x={x - boxW / 2 + 24}
                    y={y - 2}
                    fontFamily="Inter, sans-serif"
                    fontSize={12.5}
                    fill="#1B2330"
                    fontWeight={500}
                  >
                    {s.label}
                  </text>
                  <text
                    x={x - boxW / 2 + 24}
                    y={y + 13}
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize={9}
                    fill="#7A879C"
                  >
                    {s.note}
                  </text>
                </motion.g>
              );
            })}
          </svg>
          <div className="font-mono-tag text-ink-400 text-center mt-2">
            data walled off · agent can't reach
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
