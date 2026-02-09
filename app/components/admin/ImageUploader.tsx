import { useState, useRef } from "react";
import { cn } from "~/lib/utils";

interface ImageUploaderProps {
  name: string;
  currentImages?: { id: string; url: string; alt?: string }[];
  maxFiles?: number;
}

export function ImageUploader({
  name,
  currentImages = [],
  maxFiles = 5,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === files.length) {
          setPreviews((prev) => [...prev, ...newPreviews].slice(0, maxFiles));
        }
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-obsidian-700">
        Imágenes del Producto
      </label>

      {/* Current Images */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {currentImages.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-lg overflow-hidden border border-obsidian-200 group"
            >
              <img
                src={img.url}
                alt={img.alt || ""}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 p-1 bg-crimson-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar imagen"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {previews.map((preview, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-fire-300"
            >
              <img
                src={preview}
                alt={`Nuevo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-fire-500 text-white text-xs rounded">
                Nuevo
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed border-obsidian-300 rounded-lg p-8 text-center cursor-pointer transition-colors",
          "hover:border-fire-400 hover:bg-fire-50/50"
        )}
      >
        <svg className="mx-auto w-10 h-10 text-obsidian-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
        <p className="mt-2 text-sm text-obsidian-500">
          Haz clic para subir imágenes
        </p>
        <p className="text-xs text-obsidian-400 mt-1">
          PNG, JPG hasta 5MB. Máximo {maxFiles} imágenes.
        </p>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
