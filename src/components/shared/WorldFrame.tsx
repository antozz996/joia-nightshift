import type { PropsWithChildren, ReactNode } from "react";

type World = "private" | "night" | "switch" | "neutral";

type WorldFrameProps = PropsWithChildren<{
  world: World;
  eyebrow?: ReactNode;
  className?: string;
}>;

export function WorldFrame({ world, eyebrow, className = "", children }: WorldFrameProps) {
  return (
    <main className={`world-frame ${className}`.trim()} data-world={world}>
      <div className="world-frame__inner">
        {eyebrow ? <div className="world-frame__eyebrow">{eyebrow}</div> : null}
        {children}
      </div>
    </main>
  );
}
