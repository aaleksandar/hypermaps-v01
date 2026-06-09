import { createFileRoute } from "@tanstack/react-router";
import { HorizontalDeck } from "@/components/deck/HorizontalDeck";
import { GraphCanvas } from "@/components/deck/GraphCanvas";
import { Panel1Hook } from "@/components/panels/Panel1Hook";
import { Panel2ValueLoop } from "@/components/panels/Panel2ValueLoop";
import { Panel3OnePlace } from "@/components/panels/Panel3OnePlace";
import { Panel4WhyOpen } from "@/components/panels/Panel4WhyOpen";
import { Panel5WhatItIs } from "@/components/panels/Panel5WhatItIs";
import { Panel6Reliability } from "@/components/panels/Panel6Reliability";
import { Panel7NextWave } from "@/components/panels/Panel7NextWave";
import { Panel8RisingTide } from "@/components/panels/Panel8RisingTide";
import { Panel9Endgame } from "@/components/panels/Panel9Endgame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Why Hypermaps — An open geospatial layer for humanity" },
      { name: "description", content: "Every place on Earth holds many layers of data. AI agents ask questions of those layers, and value flows back to whoever provided the most trustworthy data." },
      { property: "og:title", content: "Why Hypermaps — An open geospatial layer for humanity" },
      { property: "og:description", content: "Geospatial awareness for AGI. An open, federated data layer of real-world places — built for the age of AI." },
      { name: "twitter:title", content: "Why Hypermaps" },
      { name: "twitter:description", content: "An open geospatial layer for humanity." },
    ],
  }),
  component: WhyHypermaps,
});

const PANELS = [
  { label: "Hook", node: <Panel1Hook /> },
  { label: "Value Loop", node: <Panel2ValueLoop /> },
  { label: "One place, infinite depth", node: <Panel3OnePlace /> },
  { label: "Why it has to be open", node: <Panel4WhyOpen /> },
  { label: "What Hypermaps is", node: <Panel5WhatItIs /> },
  { label: "Reliability is the currency of truth", node: <Panel6Reliability /> },
  { label: "The next wave it unlocks", node: <Panel7NextWave /> },
  { label: "A rising tide", node: <Panel8RisingTide /> },
  { label: "Endgame", node: <Panel9Endgame /> },
];

function WhyHypermaps() {
  return (
    <>
      <GraphCanvasWrap count={PANELS.length} />
      <HorizontalDeck labels={PANELS.map((p) => p.label)}>
        {PANELS.map((p) => p.node)}
      </HorizontalDeck>
    </>
  );
}

// GraphCanvas needs to live inside the deck provider for `useDeck` access.
// Easiest: render it as the first child of HorizontalDeck — but children render
// inside the translating row. So instead we mount a tiny wrapper component that
// reads `useDeck` and renders the SVG in a fixed layer. To keep things simple,
// move the GraphCanvas inside HorizontalDeck via a portal-like pattern: we
// render it as panel-zero background through a sibling Provider consumer.
function GraphCanvasWrap({ count }: { count: number }) {
  // Render inside a hidden deck context shim? Simpler: GraphCanvas uses useDeck,
  // so we render it via the deck provider. Move into the deck itself below.
  // (Implemented inline by adding to HorizontalDeck via children prepend.)
  void count;
  return null;
}
