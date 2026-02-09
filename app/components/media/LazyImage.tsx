import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  rootMargin?: string;
  width?: number;
  height?: number;
}

export function LazyImage({
  src,
  alt,
  className = "",
  eager = false,
  rootMargin = "200px 0px",
  width,
  height,
}: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [eager, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={cn("lazy-image-container", className)}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {shouldLoad && !hasError ? (
        <img
          src={src}
          alt={alt}
          className={cn("lazy-image", isLoaded && "is-loaded")}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          width={width}
          height={height}
        />
      ) : hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-obsidian-100 text-obsidian-400">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
      ) : (
        <div className="lazy-image-placeholder" />
      )}
    </div>
  );
}
