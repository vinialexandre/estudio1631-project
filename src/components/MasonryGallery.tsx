'use client';

import Image from 'next/image';

interface MasonryGalleryProps {
  images: string[];
  altPrefix: string;
}

export default function MasonryGallery({ images, altPrefix }: MasonryGalleryProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
      {images.map((image, index) => (
        <div key={index} className="break-inside-avoid group cursor-pointer">
          <div className="relative overflow-hidden bg-neutral-100">
            <Image
              src={image}
              alt={`${altPrefix} ${index + 1}`}
              width={400}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
}