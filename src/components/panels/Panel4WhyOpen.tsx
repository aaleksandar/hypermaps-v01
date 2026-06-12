import { PanelShell } from "./PanelShell";

const silos = ["Google review", "TikTok", "Reddit thread", "Vegan map", "Noise map", "Local blog", "OSM note", "Forum post"];

export function Panel4WhyOpen() {
  return (
    <PanelShell tag="WHY IT HAS TO BE OPEN">
      <div className="grid md:grid-cols-5 gap-10 items-center text-left">
        <div className="md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-medium text-ink-900 leading-tight">
            The world's real-world data is <span className="text-ink-400">siloed, duplicated,</span> and <span className="text-ink-400">invisible to AI.</span>
          </h2>
          <p className="mt-6 text-ink-600 max-w-md">
            The same place is described in a dozen disconnected places — none linked, none reusable by AI, nobody rewarded for sharing.
            So everyone hoards, and the incentive itself is broken.
          </p>
          <p className="mt-4 text-ink-900 max-w-md font-medium">
            The value — the links between the layers — is never realized.
          </p>
        </div>
        <div className="md:col-span-3 relative h-[360px]">
          <svg viewBox="0 0 500 360" className="absolute inset-0 w-full h-full">
            {/* one shared place at center */}
            <circle cx={250} cy={180} r={5} fill="#0EA5A0" />
            <circle cx={250} cy={180} r={11} fill="none" stroke="#0EA5A0" strokeOpacity={0.25} />
            <text x={250} y={205} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={8} fill="#7A879C">
              ONE PLACE
            </text>
            {silos.map((s, i) => {
              const angle = (i / silos.length) * Math.PI * 2 - Math.PI / 2;
              const x = 250 + Math.cos(angle) * 140;
              const y = 180 + Math.sin(angle) * 130;
              return (
                <g key={s}>
                  <line x1={x} y1={y} x2={x + (250 - x) * 0.18} y2={y + (180 - y) * 0.18} stroke="#C4CDD9" strokeWidth={0.7} strokeDasharray="2 3" />
                  <rect x={x - 50} y={y - 12} width={100} height={24} rx={3} fill="#FFFFFF" stroke="#DCE3EC" />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize={10} fill="#45506A" fontFamily="Inter, sans-serif">
                    {s}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </PanelShell>
  );
}
