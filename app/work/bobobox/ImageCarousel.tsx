"use client";

import { useState } from "react";

type Slide = {
  src: string | null;
  title?: string;
  subtitle?: string;
  caption?: string;
};

function PlaceholderSlide() {
  return (
    <div className="w-full aspect-video bg-sheet flex items-center justify-center border border-edge">
      <span className="text-dim text-xs font-medium uppercase tracking-widest">
        image
      </span>
    </div>
  );
}

export default function ImageCarousel({ images }: { images: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const count = images.length;

  if (count === 0) return null;

  const slide = images[current];
  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  return (
    <div>
      <div className="relative">
        <PlaceholderSlide />

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-edge bg-page text-dim hover:text-ink hover:border-[var(--fg-muted)] transition-colors duration-150 text-sm"
            >
              ←
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-edge bg-page text-dim hover:text-ink hover:border-[var(--fg-muted)] transition-colors duration-150 text-sm"
            >
              →
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`rounded-none transition-all duration-200 ${
                    i === current
                      ? "w-4 h-1 bg-[var(--accent)]"
                      : "w-1 h-1 bg-[var(--fg-muted)] opacity-40 hover:opacity-70"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-3 right-4 text-[11px] text-dim tabular-nums">
              {current + 1} / {count}
            </div>
          </>
        )}
      </div>

      {(slide.title || slide.subtitle || slide.caption) && (
        <div className="mt-3 px-1">
          {slide.title && (
            <p className="text-sm font-medium text-ink leading-snug">
              {slide.title}
            </p>
          )}
          {(slide.subtitle ?? slide.caption) && (
            <p className="text-xs text-dim mt-1 leading-relaxed">
              {slide.subtitle ?? slide.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
