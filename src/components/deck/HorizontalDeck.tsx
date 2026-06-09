import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type DeckCtx = {
  index: number;
  count: number;
  go: (i: number) => void;
  next: () => void;
  prev: () => void;
  lock: () => void;
  unlock: () => void;
  locked: boolean;
  reducedMotion: boolean;
};

const Ctx = createContext<DeckCtx | null>(null);
export const useDeck = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useDeck outside provider");
  return c;
};

export function HorizontalDeck({ children, labels }: { children: ReactNode[]; labels: string[] }) {
  const count = children.length;
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const lockedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(count - 1, i))), [count]);
  const next = useCallback(() => setIndex((i) => Math.min(count - 1, i + 1)), [count]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const lock = useCallback(() => { lockedRef.current = true; setLocked(true); }, []);
  const unlock = useCallback(() => { lockedRef.current = false; setLocked(false); }, []);

  // Wheel handling
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<number | null>(null);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (lockedRef.current) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      wheelAccum.current += delta;
      if (Math.abs(wheelAccum.current) > 60) {
        if (wheelAccum.current > 0) next(); else prev();
        wheelAccum.current = 0;
      }
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => { wheelAccum.current = 0; }, 180);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lockedRef.current) return;
      const tgt = e.target as HTMLElement;
      if (tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault(); next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault(); prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Pointer drag
  const dragStart = useRef<{ x: number; t: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (lockedRef.current) return;
      const tgt = e.target as HTMLElement;
      if (tgt.closest("[data-deck-no-drag]")) return;
      dragStart.current = { x: e.clientX, t: performance.now() };
    };
    const onMove = (e: PointerEvent) => {
      if (!dragStart.current) return;
      setDragOffset(e.clientX - dragStart.current.x);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dt = performance.now() - dragStart.current.t;
      const v = dx / Math.max(1, dt);
      dragStart.current = null;
      setDragOffset(0);
      const w = window.innerWidth;
      if (Math.abs(dx) > w * 0.18 || Math.abs(v) > 0.6) {
        if (dx < 0) next(); else prev();
      }
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [next, prev]);

  const ctx = useMemo<DeckCtx>(() => ({ index, count, go, next, prev, lock, unlock, locked, reducedMotion }),
    [index, count, go, next, prev, lock, unlock, locked, reducedMotion]);

  const transition = reducedMotion ? "transform 0.2s linear" : "transform 0.85s cubic-bezier(0.22, 0.61, 0.36, 1)";
  const transform = `translate3d(calc(${-index * 100}vw + ${dragOffset}px), 0, 0)`;

  return (
    <Ctx.Provider value={ctx}>
      <div className="fixed inset-0 overflow-hidden bg-paper-0 select-none">
        <div
          className="flex h-full"
          style={{ width: `${count * 100}vw`, transform, transition: dragStart.current ? "none" : transition, willChange: "transform" }}
        >
          {children.map((c, i) => (
            <section key={i} className="relative h-full shrink-0" style={{ width: "100vw" }} aria-hidden={i !== index}>
              {c}
            </section>
          ))}
        </div>

        {/* Edge click zones */}
        {index > 0 && !locked && (
          <button
            aria-label="Previous panel"
            onClick={prev}
            data-deck-no-drag
            className="absolute left-0 top-0 h-full w-[6vw] cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
          >
            <span className="sr-only">Previous</span>
          </button>
        )}
        {index < count - 1 && !locked && (
          <button
            aria-label="Next panel"
            onClick={next}
            data-deck-no-drag
            className="absolute right-0 top-0 h-full w-[6vw] cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
          >
            <span className="sr-only">Next</span>
          </button>
        )}

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-paper-100 z-30">
          <div
            className="h-full bg-place"
            style={{ width: `${((index + 1) / count) * 100}%`, transition: "width 0.6s ease" }}
          />
        </div>

        {/* Top-left wordmark */}
        <div className="absolute top-5 left-6 z-30 font-mono-tag">hypermaps · why</div>

        {/* Dots */}
        <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2" data-deck-no-drag>
          {labels.map((l, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to panel ${i + 1}: ${l}`}
              className="group relative flex flex-col items-center"
            >
              <span
                className={`block h-[6px] rounded-full transition-all ${i === index ? "w-8 bg-ink-900" : "w-2 bg-line-200 hover:bg-ink-400"}`}
              />
            </button>
          ))}
        </nav>

        {/* Next cue */}
        {index < count - 1 && (
          <button
            onClick={next}
            data-deck-no-drag
            className="absolute bottom-6 right-6 z-30 flex items-center gap-2 font-mono-tag text-ink-600 hover:text-ink-900 transition-colors"
            aria-label="Next"
          >
            next <span aria-hidden className="text-base">→</span>
          </button>
        )}
        {index > 0 && (
          <button
            onClick={prev}
            data-deck-no-drag
            className="absolute bottom-6 left-6 z-30 flex items-center gap-2 font-mono-tag text-ink-400 hover:text-ink-900 transition-colors"
            aria-label="Previous"
          >
            <span aria-hidden className="text-base">←</span> prev
          </button>
        )}
      </div>
    </Ctx.Provider>
  );
}
