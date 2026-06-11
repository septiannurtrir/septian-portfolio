"use client";

import { useEffect, useRef, useState } from "react";
import * as allSimpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type Tool = {
  name: string;
  category: string;
  iconSlug: string;
  iconUrl: string;
};

const slugToIcon: Record<string, SimpleIcon> = Object.fromEntries(
  (Object.entries(allSimpleIcons as unknown as Record<string, SimpleIcon>))
    .filter(([k]) => k.startsWith("si"))
    .map(([, icon]) => [icon.slug, icon])
);

const toolIconMap: Record<string, SimpleIcon | undefined> = {
  Mixpanel: slugToIcon["mixpanel"],
  GA4: slugToIcon["googleanalytics"],
  Metabase: slugToIcon["metabase"],
  "Looker Studio": slugToIcon["looker"],
  N8N: slugToIcon["n8n"],
  Replit: slugToIcon["replit"],
  Claude: slugToIcon["claude"],
  Cursor: slugToIcon["cursor"],
  Figma: slugToIcon["figma"],
  ClickUp: slugToIcon["clickup"],
  Directus: slugToIcon["directus"],
  Strapi: slugToIcon["strapi"],
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function ToolItem({ tool }: { tool: Tool }) {
  const resolvedIcon: SimpleIcon | undefined =
    (tool.iconSlug ? slugToIcon[tool.iconSlug] : undefined) ?? toolIconMap[tool.name];
  return (
    <div
      className="flex flex-col items-center gap-1.5 shrink-0"
      style={{ flexShrink: 0, whiteSpace: "normal", minWidth: "100px" }}
    >
      <div className="w-11 h-11 rounded-xl border border-edge flex items-center justify-center bg-page">
        {tool.iconUrl ? (
          <img
            src={tool.iconUrl}
            alt={tool.name}
            className="w-6 h-6 object-contain opacity-70"
          />
        ) : resolvedIcon ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-70"
            style={{ fill: `#${resolvedIcon.hex}` }}
            aria-label={resolvedIcon.title}
          >
            <path d={resolvedIcon.path} />
          </svg>
        ) : (
          <span className="text-[9px] font-medium text-dim">{getInitials(tool.name)}</span>
        )}
      </div>
      <span className="text-[9px] sm:text-[10px] text-dim text-center leading-tight">
        {tool.name}
      </span>
    </div>
  );
}

type Props = {
  tools: Tool[];
  direction: "left" | "right";
  label: string;
};

export default function MarqueeRow({ tools, direction, label }: Props) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(5);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    if (w > 0) {
      setCopies(Math.ceil((window.innerWidth * 2.5) / w) + 1);
    }
  }, [tools]);

  const items = Array.from({ length: copies }, () => tools).flat();
  const trackClass = direction === "left" ? "marquee-track-left" : "marquee-track-right";
  const shift = `-${(100 / copies).toFixed(4)}%`;

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-dim text-center mb-2">
        {label}
      </p>
      {/* Off-screen probe measures 1 copy's natural rendered width */}
      <div
        ref={measureRef}
        aria-hidden
        className="marquee-track-left"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          visibility: "hidden",
          animation: "none",
          pointerEvents: "none",
        }}
      >
        {tools.map((tool, i) => (
          <ToolItem key={`probe-${i}`} tool={tool} />
        ))}
      </div>
      <div className="marquee-wrapper">
        <div
          className={trackClass}
          style={{ "--marquee-shift": shift } as React.CSSProperties}
        >
          {items.map((tool, i) => (
            <ToolItem key={`item-${i}`} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
