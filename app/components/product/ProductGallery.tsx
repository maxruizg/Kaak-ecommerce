import { useState } from "react";
import { cn } from "~/lib/utils";

interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-obsidian-800 rounded-xl flex items-center justify-center">
        <svg className="w-24 h-24 text-obsidian-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-obsidian-800 rounded-xl overflow-hidden">
        <img
          src={activeImage.url}
          alt={activeImage.alt || productName}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                index === activeIndex
                  ? "border-fire-500"
                  : "border-obsidian-700 hover:border-obsidian-500"
              )}
            >
              <img
                src={img.url}
                alt={img.alt || `${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
