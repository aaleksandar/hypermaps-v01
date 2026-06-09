import { motion } from "framer-motion";
import { PanelShell } from "./PanelShell";

export function Panel1Hook() {
  return (
    <PanelShell>
      <div className="relative">
        {/* constellation */}
        <svg viewBox="0 0 600 220" className="mx-auto mb-10 h-32 w-full max-w-2xl">
          {[
            [80, 110], [160, 70], [240, 140], [310, 90], [380, 130],
            [450, 60], [520, 120], [560, 170], [40, 160], [200, 180],
          ].map(([x, y], i) => (
            <g key={i}>
              {i > 0 && (
                <motion.line
                  x1={[80, 160, 240, 310, 380, 450, 520, 560, 40][i - 1] ?? x}
                  y1={[110, 70, 140, 90, 130, 60, 120, 170, 160][i - 1] ?? y}
                  x2={x}
                  y2={y}
                  stroke="#0EA5A0"
                  strokeOpacity={0.4}
                  strokeWidth={0.6}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                />
              )}
              <motion.circle
                cx={x}
                cy={y}
                r={i === 0 ? 4 : 2.2}
                fill="#0EA5A0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              />
            </g>
          ))}
        </svg>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl md:text-7xl font-medium text-ink-900 leading-[1.05]"
        >
          Geospatial awareness<br />for AGI.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-6 text-lg md:text-xl text-ink-600 max-w-2xl mx-auto"
        >
          Organizing the hidden layers of physical places for AI-ready use.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="mt-16 font-mono-tag flex items-center justify-center gap-3"
        >
          <span>scroll · swipe · drag</span>
          <motion.span
            aria-hidden
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </PanelShell>
  );
}
