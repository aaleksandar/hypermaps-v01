import { PanelShell } from "./PanelShell";

export function Panel5WhatItIs() {
  return (
    <PanelShell tag="WHAT HYPERMAPS IS">
      <h2 className="text-5xl md:text-7xl font-medium text-ink-900 leading-[1.05] max-w-5xl mx-auto">
        An <span className="text-place">open, federated data layer</span> of real-world places — built for the age of AI.
      </h2>
      <p className="mt-8 text-lg text-ink-600 max-w-2xl mx-auto">
        A constantly-evolving, legally-clean graph of every point of interest on Earth, exposed to AI
        agents so they can understand — and one day even feel — the physical world through the many human
        viewpoints on a place.
      </p>
      <div className="mt-14 grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
        <div className="border border-line-200 rounded-md p-6 bg-paper-0">
          <div className="font-mono-tag mb-3">PRINCIPLE 01</div>
          <p className="text-ink-900">
            Every fact carries its origin. Any source can claim or remove itself — like the open web.
          </p>
        </div>
        <div className="border border-line-200 rounded-md p-6 bg-paper-0">
          <div className="font-mono-tag mb-3">PRINCIPLE 02</div>
          <p className="text-ink-900">
            What people search for is public, so the community can see what's in demand and go enrich it.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}
