import { motion } from "framer-motion";
import { PanelShell } from "./PanelShell";

const SILOS = [
  { label: "Walled platforms", note: "Private databases & APIs" },
  { label: "Social feeds", note: "Locked behind ToS" },
  { label: "Mobility & foot-traffic", note: "Sold, not shared" },
  { label: "Government records", note: "Fragmented, hard to license" },
  { label: "Field & sensor data", note: "Captured, never published" },
  { label: "Local knowledge", note: "Trapped in apps & chats" },
];

const FRICTIONS = [
  { tag: "LICENSING", text: "Most data isn't licensed for commercial reuse." },
  { tag: "NORMALIZATION", text: "What is available needs cleaning, joining, reconciling." },
  { tag: "INCENTIVES", text: "Hoarded data is rewarded. Shared data is not." },
];

export function Panel2Problem() {
  return (
    <PanelShell tag="THE PROBLEM TODAY">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center text-left">
        {/* Left: thesis */}
        <div>
          <h2 className="text-4xl md:text-5xl font-medium text-ink-900 leading-[1.08]">
            AI agents are <span className="text-ink-400">blind</span> to the physical world.
          </h2>
          <p className="mt-6 text-ink-600 max-w-xl">
            Ask an agent about a street, a building, a neighborhood — and the world
            it sees is thin, stale, and stitched from whatever scraps it can reach.
            The real signal is locked up.
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
                <span className="font-mono-tag text-query mt-0.5 w-32 shrink-0">{f.tag}</span>
                <span className="text-ink-900 text-base md:text-lg">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: silo diagram */}
        <div className="relative">
          <svg viewBox="0 0 480 420" className="w-full h-[420px]">
            {/* faint AI agent at center, reaching out */}
            <defs>
              <radialGradient id="agentBlind" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5B5BF0" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#5B5BF0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={240} cy={210} r={90} fill="url(#agentBlind)" />
            <circle cx={240} cy={210} r={16} fill="#FFFFFF" stroke="#5B5BF0" strokeWidth={1} />
            <circle cx={240} cy={210} r={5} fill="#5B5BF0" />
            <text
              x={240}
              y={240}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize={9}
              fill="#5B5BF0"
              letterSpacing="0.14em"
            >
              AGENT
            </text>

            {SILOS.map((s, i) => {
              const angle = (i / SILOS.length) * Math.PI * 2 - Math.PI / 2;
              const x = 240 + Math.cos(angle) * 170;
              const y = 210 + Math.sin(angle) * 150;
              // dashed line that doesn't reach (blocked)
              const blockX = 240 + Math.cos(angle) * 70;
              const blockY = 210 + Math.sin(angle) * 65;
              return (
                <motion.g
                  key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                >
                  <line
                    x1={blockX}
                    y1={blockY}
                    x2={x + (240 - x) * 0.22}
                    y2={y + (210 - y) * 0.22}
                    stroke="#C4CDD9"
                    strokeWidth={0.6}
                    strokeDasharray="2 4"
                  />
                  {/* "wall" mark near agent */}
                  <line
                    x1={blockX - Math.sin(angle) * 6}
                    y1={blockY + Math.cos(angle) * 6}
                    x2={blockX + Math.sin(angle) * 6}
                    y2={blockY - Math.cos(angle) * 6}
                    stroke="#C4CDD9"
                    strokeWidth={1.2}
                  />
                  {/* silo box */}
                  <rect
                    x={x - 72}
                    y={y - 22}
                    width={144}
                    height={44}
                    rx={3}
                    fill="#FFFFFF"
                    stroke="#DCE3EC"
                  />
                  {/* lock glyph */}
                  <rect x={x - 64} y={y - 6} width={5} height={6} fill="#7A879C" />
                  <path
                    d={`M ${x - 64} ${y - 6} a 2.5 2.5 0 0 1 5 0`}
                    fill="none"
                    stroke="#7A879C"
                    strokeWidth={1}
                  />
                  <text
                    x={x - 52}
                    y={y - 5}
                    fontFamily="Inter, sans-serif"
                    fontSize={11}
                    fill="#1B2330"
                    fontWeight={500}
                  >
                    {s.label}
                  </text>
                  <text
                    x={x - 52}
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
            data walled off · agent can't reach
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
