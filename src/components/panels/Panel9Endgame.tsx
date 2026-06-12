import { PanelShell } from "./PanelShell";

export function Panel9Endgame() {
  return (
    <PanelShell tag="ENDGAME">
      <div className="relative">
        {/* densely connected planet */}
        <svg viewBox="0 0 400 200" className="mx-auto mb-10 h-40 w-full max-w-3xl">
          {Array.from({ length: 80 }).map((_, i) => {
            const a = (i / 80) * Math.PI * 2;
            const r = 70 + (i % 5) * 4;
            const x = 200 + Math.cos(a) * r;
            const y = 100 + Math.sin(a) * r * 0.6;
            return <circle key={i} cx={x} cy={y} r={1.2} fill="#0EA5A0" />;
          })}
          {Array.from({ length: 120 }).map((_, i) => {
            const a1 = Math.random() * Math.PI * 2;
            const a2 = a1 + (Math.random() - 0.5) * 1.5;
            const x1 = 200 + Math.cos(a1) * (60 + Math.random() * 30);
            const y1 = 100 + Math.sin(a1) * (60 + Math.random() * 20) * 0.6;
            const x2 = 200 + Math.cos(a2) * (60 + Math.random() * 30);
            const y2 = 100 + Math.sin(a2) * (60 + Math.random() * 20) * 0.6;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0EA5A0" strokeOpacity={0.18} strokeWidth={0.4} />;
          })}
        </svg>
        <p className="text-ink-600 max-w-xl mx-auto">
          Owned by no single company. Governed in the open. Built to outlive any of us.
        </p>
        <h2 className="mt-6 text-5xl md:text-7xl font-medium text-ink-900 leading-[1.05]">
          An open geospatial layer<br />for humanity.
        </h2>
        <p className="mt-10 text-ink-600 italic">Built in the open. Come build it with us.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-sm">
          <a
            href="https://github.com/hypermaps"
            target="_blank"
            rel="noreferrer"
            className="text-ink-900 underline underline-offset-4 decoration-line-200 hover:decoration-place"
          >
            github.com/hypermaps
          </a>
          <a
            href="https://hypermaps.org"
            target="_blank"
            rel="noreferrer"
            className="text-ink-900 underline underline-offset-4 decoration-line-200 hover:decoration-place"
          >
            hypermaps.org
          </a>
        </div>
      </div>
    </PanelShell>
  );
}
