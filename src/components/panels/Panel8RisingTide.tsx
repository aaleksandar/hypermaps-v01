import { PanelShell } from "./PanelShell";

export function Panel8RisingTide() {
  return (
    <PanelShell tag="A RISING TIDE">
      <h2 className="text-5xl md:text-7xl font-medium text-ink-900 leading-[1.05] max-w-5xl mx-auto">
        Everyone who contributes <span className="text-reward">shares in the value</span> they help create.
      </h2>
      <p className="mt-8 text-lg text-ink-600 max-w-2xl mx-auto">
        Share data — and when it's used and trusted, you're rewarded for it. Researchers mine the graph,
        builders spin up new apps on it, communities enrich it.
      </p>
      <div className="mt-14 inline-block text-left">
        <div className="font-mono-tag mb-3">NORTH STAR</div>
        <blockquote className="text-2xl md:text-3xl text-ink-900 font-display max-w-2xl leading-snug">
          "We intend to create so much value that we redistribute it."
        </blockquote>
      </div>
    </PanelShell>
  );
}
