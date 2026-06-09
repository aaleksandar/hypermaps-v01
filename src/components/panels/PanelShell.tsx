import type { ReactNode } from "react";

export function PanelShell({
  tag,
  children,
  align = "center",
}: {
  tag?: string;
  children: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center px-6 md:px-16 lg:px-24">
      <div className={`max-w-5xl w-full ${align === "left" ? "text-left" : "text-center"}`}>
        {tag && <div className="font-mono-tag mb-6">{tag}</div>}
        {children}
      </div>
    </div>
  );
}
