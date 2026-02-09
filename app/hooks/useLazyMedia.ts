import { useEffect, useRef, useState } from "react";

interface UseLazyMediaOptions {
  threshold?: number;
  rootMargin?: string;
  eager?: boolean;
}

export function useLazyMedia(options: UseLazyMediaOptions = {}) {
  const { threshold = 0, rootMargin = "200px 0px", eager = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isInView, setIsInView] = useState(eager);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, eager]);

  return { ref, shouldLoad, isInView };
}
