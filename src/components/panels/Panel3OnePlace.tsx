import { PanelShell } from "./PanelShell";
import { motion } from "framer-motion";

const layers = [
  { name: "history", color: "#0EA5A0" },
  { name: "owner interview", color: "#0EA5A0" },
  { name: "photos & video", color: "#0EA5A0" },
  { name: "discounts", color: "#E8930C" },
  { name: "noise & air quality", color: "#0B8F8A" },
  { name: "wellbeing · EEG", color: "#5B5BF0" },
  { name: "supply-chain status", color: "#0EA5A0" },
];

export function Panel3OnePlace() {
  return (
    <PanelShell tag="ONE PLACE · INFINITE DEPTH">
      <div className="grid md:grid-cols-2 gap-12 items-center text-left">
        <div>
          <h2 className="text-5xl md:text-6xl font-medium text-ink-900 leading-tight">
            A place isn't a pin.<br />
            <span className="text-place">It's a stack of layers</span> — and anyone can add one.
          </h2>
          <p className="mt-6 text-ink-600 max-w-md">
            Every layer attaches to one shared identity for that place. History, sensors, interviews,
            wearables, supply-chain — the depth of one location, finally legible to machines.
          </p>
        </div>
        <div className="relative h-[420px]">
          <svg viewBox="0 0 320 420" className="absolute inset-0 w-full h-full">
            {layers.map((l, i) => {
              const y = 340 - i * 38;
              const w = 240 - i * 8;
              const x = (320 - w) / 2;
              return (
                <motion.g
                  key={l.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                >
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={26}
                    rx={3}
                    fill={l.color}
                    fillOpacity={0.06}
                    stroke={l.color}
                    strokeOpacity={0.5}
                    strokeWidth={0.6}
                  />
                  <text
                    x={x + 10}
                    y={y + 17}
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize={9}
                    fill="#45506A"
                    letterSpacing="0.08em"
                  >
                    {l.name.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
            {/* Place node base */}
            <circle cx={160} cy={388} r={6} fill="#0EA5A0" />
            <circle cx={160} cy={388} r={14} fill="none" stroke="#0EA5A0" strokeOpacity={0.3} />
            <text x={160} y={412} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={8} fill="#7A879C">
              PLACE · 51.5074N · 0.1278W
            </text>
          </svg>
        </div>
      </div>
    </PanelShell>
  );
}
