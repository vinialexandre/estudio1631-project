"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  images: string[];
  altPrefix?: string;
};

export default function SimpleCarousel({ images, altPrefix = "Slide" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.min(800, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative snap-center min-w-[90%] md:min-w-[75%] aspect-[4/3] overflow-hidden bg-black/5"
          >
            <Image src={src} alt={`${altPrefix} ${i + 1}`} fill sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="pointer-events-auto hidden sm:inline-flex h-10 w-10 items-center justify-center bg-white/80 ring-1 ring-black/10 hover:bg-white"
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="pointer-events-auto hidden sm:inline-flex h-10 w-10 items-center justify-center bg-white/80 ring-1 ring-black/10 hover:bg-white"
          aria-label="Próximo"
        >
          →
        </button>
      </div>
    </div>
  );
}

