import { useEffect, useRef } from "react";

/**
 * Attaches fade-up scroll animation to an element.
 * Elements with `fade-up` class get `is-visible` added when they enter the viewport.
 */
export function useFadeUp<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Applies fade-up to all `.fade-up` children of a container.
 */
export function useFadeUpChildren<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll<HTMLElement>(".fade-up");
    const observers: IntersectionObserver[] = [];

    for (const child of children) {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold },
      );
      obs.observe(child);
      observers.push(obs);
    }

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, [threshold]);

  return ref;
}
