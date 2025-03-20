import { useState, useEffect, useRef, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {},
  once = false
): [RefObject<T>, boolean] {
  const { root = null, rootMargin = "0px", threshold = 0 } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // If we only want to observe once and the element is intersecting, disconnect
        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, once]);

  return [ref, isIntersecting];
}
