import { PanelShell } from "./PanelShell";

const sources = [
  { name: "Sentinel-2 imagery", score: 0.94, color: "#0B8F8A" },
  { name: "Gov permits feed", score: 0.91, color: "#0B8F8A" },
  { name: "Crawler · news", score: 0.78, color: "#0EA5A0" },
  { name: "Community report", score: 0.52, color: "#7A879C" },
  { name: "Unverified blog", score: 0.21, color: "#C4CDD9" },
];

export function Panel6Reliability() {
  return (
    <PanelShell tag="RELIABILITY IS THE CURRENCY OF TRUTH">
      <div className="grid md:grid-cols-5 gap-12 items-center text-left">
        <div className="md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-medium text-ink-900 leading-tight">
            Truthful, useful data wins.
          </h2>
          <p className="mt-6 text-ink-600 max-w-md">
            Reliability is scored, and reward follows reliability. Independent sources that agree raise
            confidence; a newer, more truthful source earns more.
          </p>
        </div>
        <div className="md:col-span-3 space-y-3">
          {sources.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <svg width="38" height="38" viewBox="0 0 38 38" className="shrink-0">
                <circle cx="19" cy="19" r="14" fill="none" stroke="#EEF2F6" strokeWidth="3" />
                <circle
                  cx="19" cy="19" r="14"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="3"
                  strokeDasharray={`${s.score * 88} 88`}
                  strokeLinecap="round"
                  transform="rotate(-90 19 19)"
                />
                <circle cx="19" cy="19" r="2.5" fill={s.color} />
              </svg>
              <div className="flex-1 flex items-center justify-between border-b border-line-200 pb-2">
                <span className="text-ink-900">{s.name}</span>
                <span className="font-mono text-sm text-ink-600">{s.score.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
