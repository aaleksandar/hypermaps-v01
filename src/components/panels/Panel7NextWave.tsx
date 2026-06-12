import { PanelShell } from "./PanelShell";

const ideas = [
  { tag: "GLOBAL", title: "Every active construction site on Earth", body: "And who's building them. Live, queryable, source-traced." },
  { tag: "LABOR", title: "A live map of physical jobs", body: "And the materials they need, mapped to supply." },
  { tag: "REMOTE", title: "Laptop-friendly cafés", body: "Quiet, fast Wi-Fi, good chairs — searchable everywhere." },
  { tag: "DIET", title: "Vegan maps that actually work", body: "Maintained by people who eat there." },
  { tag: "AIR", title: "Quiet & clean-air maps", body: "For travelers, parents, asthma sufferers." },
  { tag: "WELLBEING", title: "Urban wellbeing from wearables", body: "What a street feels like, measured." },
  { tag: "SOLARPUNK", title: "Solarpunk villages", body: "Discoverable, comparable, joinable." },
  { tag: "SUPPLY", title: "Supply-chain risk per project", body: "Down to a single jobsite." },
];

export function Panel7NextWave() {
  return (
    <PanelShell tag="THE NEXT WAVE IT UNLOCKS">
      <div className="text-left max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-medium text-ink-900 leading-tight max-w-4xl">
          A new Booking.com can't start today because the data is locked away.
          <span className="text-ink-400"> On an open layer, it can — and so can a thousand things we haven't imagined.</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {ideas.map((i) => (
            <div key={i.title} className="border border-line-200 rounded-md p-5 bg-paper-0 hover:border-place transition-colors">
              <div className="font-mono-tag mb-3">{i.tag}</div>
              <div className="text-ink-900 font-medium leading-snug">{i.title}</div>
              <div className="mt-2 text-sm text-ink-600">{i.body}</div>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
