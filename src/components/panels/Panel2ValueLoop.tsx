import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelShell } from "./PanelShell";
import { useDeck } from "../deck/HorizontalDeck";

type Source = {
  id: string;
  kind: "partner" | "oracle";
  label: string;
  x: number;
  y: number;
  reliability: number; // 0..1
};

// AI agent at left, place cluster at right, sources arrayed around.
const AGENT = { x: 70, y: 240 };
const PLACE_CENTER = { x: 620, y: 240 };

const SOURCES: Source[] = [
  { id: "sat", kind: "oracle", label: "Sentinel-2 crawler", x: 380, y: 70, reliability: 0.94 },
  { id: "permits", kind: "partner", label: "Gov permits feed", x: 240, y: 110, reliability: 0.91 },
  { id: "supply", kind: "partner", label: "Cement supply feed", x: 230, y: 360, reliability: 0.86 },
  { id: "news", kind: "oracle", label: "News crawler", x: 380, y: 410, reliability: 0.74 },
  { id: "social", kind: "oracle", label: "Social crawler", x: 500, y: 440, reliability: 0.58 },
  { id: "field", kind: "partner", label: "Field-report feed", x: 500, y: 40, reliability: 0.81 },
];

const PLACES = [
  { x: 580, y: 170 }, { x: 660, y: 200 }, { x: 720, y: 250 },
  { x: 580, y: 280 }, { x: 660, y: 320 }, { x: 730, y: 180 },
  { x: 540, y: 220 }, { x: 700, y: 360 }, { x: 770, y: 300 },
];

const QUESTIONS = [
  { id: "q1", text: "Find all active construction sites on Earth." },
  { id: "q2", text: "Quietest cafés for remote work in Lisbon." },
  { id: "q3", text: "Where is new retail being built in Vietnam?" },
];

type Stage = 0 | 1 | 2 | 3 | 4;

const CAPTIONS: Record<Stage, string> = {
  0: "Every place is a stack of layers. AI agents ask questions of those layers.",
  1: "An AI agent emits a query that travels into the graph.",
  2: "Many sources answer — partners and autonomous crawler agents.",
  3: "A constellation of matching places resolves — the answer.",
  4: "Rewards flow back, weighted by each source's reliability.",
};

export function Panel2ValueLoop() {
  const { lock, unlock, next, reducedMotion } = useDeck();
  const [stage, setStage] = useState<Stage>(0);
  const [activeQ, setActiveQ] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const totalRewards = useMemo(
    () => SOURCES.reduce((acc, s) => acc + Math.round(s.reliability * 60), 0),
    []
  );

  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);

  const run = (qid: string) => {
    timers.current.forEach((t) => window.clearTimeout(t));
    setActiveQ(qid);
    lock();
    setStage(1);
    const stepMs = reducedMotion ? 400 : 1600;
    timers.current.push(window.setTimeout(() => setStage(2), stepMs));
    timers.current.push(window.setTimeout(() => setStage(3), stepMs * 2));
    timers.current.push(window.setTimeout(() => setStage(4), stepMs * 3));
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    setStage(0);
    setActiveQ(null);
    unlock();
  };

  return (
    <PanelShell tag="THE VALUE LOOP">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-stretch text-left">
        {/* Stage */}
        <div className="relative rounded-md border border-line-200 bg-paper-0 overflow-hidden" data-deck-no-drag>
          <svg viewBox="0 0 800 500" className="w-full h-[460px]">
            <defs>
              <radialGradient id="placeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0EA5A0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0EA5A0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* faint graticule */}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={`v${i}`} x1={(i / 16) * 800} y1={0} x2={(i / 16) * 800} y2={500} stroke="#EEF2F6" strokeWidth={0.5} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={(i / 10) * 500} x2={800} y2={(i / 10) * 500} stroke="#EEF2F6" strokeWidth={0.5} />
            ))}

            {/* connection lines source -> place center */}
            {SOURCES.map((s) => {
              const active = stage >= 2;
              return (
                <line
                  key={`l-${s.id}`}
                  x1={s.x} y1={s.y} x2={PLACE_CENTER.x} y2={PLACE_CENTER.y}
                  stroke={active ? "#0EA5A0" : "#DCE3EC"}
                  strokeOpacity={active ? 0.4 + s.reliability * 0.5 : 0.5}
                  strokeWidth={active ? 0.4 + s.reliability * 1.2 : 0.5}
                />
              );
            })}
            {/* agent -> place */}
            <line
              x1={AGENT.x} y1={AGENT.y} x2={PLACE_CENTER.x} y2={PLACE_CENTER.y}
              stroke={stage >= 1 ? "#5B5BF0" : "#DCE3EC"}
              strokeOpacity={stage >= 1 ? 0.6 : 0.4}
              strokeWidth={stage >= 1 ? 1 : 0.5}
            />

            {/* Place cluster */}
            <circle cx={PLACE_CENTER.x} cy={PLACE_CENTER.y} r={120} fill="url(#placeGlow)" />
            {PLACES.map((p, i) => {
              const resolved = stage >= 3;
              return (
                <motion.g
                  key={`p${i}`}
                  initial={false}
                  animate={{ opacity: resolved ? 1 : 0.35 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  {/* layered fans on each node */}
                  {resolved && [0, 1, 2].map((k) => (
                    <rect
                      key={k}
                      x={p.x - 14 + k * 1.2}
                      y={p.y - 18 - k * 3}
                      width={28}
                      height={6}
                      rx={1}
                      fill="#0EA5A0"
                      fillOpacity={0.08}
                      stroke="#0EA5A0"
                      strokeOpacity={0.4}
                      strokeWidth={0.4}
                    />
                  ))}
                  <circle cx={p.x} cy={p.y} r={resolved ? 4 : 2.4} fill="#0EA5A0" />
                </motion.g>
              );
            })}
            <text x={PLACE_CENTER.x} y={PLACE_CENTER.y + 150} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={9} fill="#7A879C" letterSpacing="0.12em">
              {stage >= 3 ? `${PLACES.length} PLACES · MATCH` : "PLACE NODES"}
            </text>

            {/* AI Agent */}
            <g>
              <circle cx={AGENT.x} cy={AGENT.y} r={18} fill="#FFFFFF" stroke="#5B5BF0" strokeWidth={1} />
              <circle cx={AGENT.x} cy={AGENT.y} r={6} fill="#5B5BF0" />
              <text x={AGENT.x} y={AGENT.y + 38} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={9} fill="#5B5BF0" letterSpacing="0.12em">
                AGENT
              </text>
            </g>

            {/* Sources */}
            {SOURCES.map((s) => {
              const trustColor = trustToColor(s.reliability);
              const active = stage >= 2;
              return (
                <g key={s.id}>
                  {/* reliability ring */}
                  <circle cx={s.x} cy={s.y} r={14} fill="none" stroke="#EEF2F6" strokeWidth={2.5} />
                  <circle
                    cx={s.x} cy={s.y} r={14}
                    fill="none"
                    stroke={trustColor}
                    strokeWidth={2.5}
                    strokeDasharray={`${s.reliability * 88} 88`}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${s.x} ${s.y})`}
                  />
                  {/* glyph: partner = square, oracle = triangle */}
                  {s.kind === "partner" ? (
                    <rect x={s.x - 4} y={s.y - 4} width={8} height={8} fill={active ? "#0EA5A0" : "#7A879C"} />
                  ) : (
                    <polygon
                      points={`${s.x},${s.y - 5} ${s.x + 5},${s.y + 4} ${s.x - 5},${s.y + 4}`}
                      fill={active ? "#0EA5A0" : "#7A879C"}
                    />
                  )}
                  <text x={s.x} y={s.y + 30} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={8} fill="#45506A">
                    {s.label}
                  </text>
                  <text x={s.x} y={s.y + 42} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={8} fill={trustColor}>
                    {s.reliability.toFixed(2)}
                  </text>

                  {/* reward counter */}
                  <AnimatePresence>
                    {stage >= 4 && (
                      <motion.text
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        x={s.x + 20}
                        y={s.y - 12}
                        fontFamily="IBM Plex Mono, monospace"
                        fontSize={9}
                        fill="#E8930C"
                      >
                        +{Math.round(s.reliability * 60)} ⬡
                      </motion.text>
                    )}
                  </AnimatePresence>
                </g>
              );
            })}

            {/* indigo query mark traveling out */}
            <AnimatePresence>
              {stage === 1 && !reducedMotion && (
                <motion.circle
                  key="q-mark"
                  r={4}
                  fill="#5B5BF0"
                  initial={{ cx: AGENT.x, cy: AGENT.y, opacity: 1 }}
                  animate={{ cx: PLACE_CENTER.x, cy: PLACE_CENTER.y, opacity: 0.2 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* amber reward marks traveling back */}
            <AnimatePresence>
              {stage >= 4 && !reducedMotion && SOURCES.map((s, i) => (
                <motion.circle
                  key={`r-${s.id}`}
                  r={2 + s.reliability * 3}
                  fill="#E8930C"
                  initial={{ cx: PLACE_CENTER.x, cy: PLACE_CENTER.y, opacity: 0 }}
                  animate={{ cx: s.x, cy: s.y, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.6, delay: i * 0.12, repeat: Infinity, repeatDelay: 1.5 }}
                />
              ))}
            </AnimatePresence>
          </svg>

          {/* Caption */}
          <div className="px-6 py-4 border-t border-line-200 bg-paper-50 min-h-[64px] flex items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="text-sm text-ink-900"
              >
                {CAPTIONS[stage]}
              </motion.div>
            </AnimatePresence>
            {stage >= 4 && (
              <div className="font-mono text-sm text-reward whitespace-nowrap">
                {totalRewards} ⬡ distributed
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4" data-deck-no-drag>
          <h2 className="text-3xl md:text-4xl font-medium text-ink-900 leading-tight">
            The loop: a question goes out, value flows back.
          </h2>
          <p className="text-ink-600 text-sm">
            Try a query. Watch reward weight scale with each source's reliability.
          </p>

          <div className="flex flex-col gap-2 mt-2">
            {QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => run(q.id)}
                className={`text-left px-4 py-3 rounded-md border transition-all text-sm ${
                  activeQ === q.id
                    ? "border-query bg-query/5 text-ink-900"
                    : "border-line-200 hover:border-query/60 text-ink-900"
                }`}
              >
                <span className="font-mono-tag block mb-1 text-query">QUERY</span>
                {q.text}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={reset}
              disabled={stage === 0}
              className="font-mono-tag text-ink-400 hover:text-ink-900 disabled:opacity-30"
            >
              reset
            </button>
            <div className="flex-1" />
            <button
              onClick={() => { unlock(); next(); }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-ink-900 text-paper-0 font-mono-tag hover:bg-ink-600 transition-colors"
            >
              next <span aria-hidden>→</span>
            </button>
          </div>

          <div className="mt-2 font-mono-tag text-ink-400">
            stage {stage} / 4
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function trustToColor(r: number) {
  // interpolate between trust-high (#0B8F8A) and trust-low (#C4CDD9)
  const hi = [0x0b, 0x8f, 0x8a];
  const lo = [0xc4, 0xcd, 0xd9];
  const c = hi.map((h, i) => Math.round(h * r + lo[i] * (1 - r)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
