import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions = new Map<string, number>();

export function useScrollRestore() {
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const saved = scrollPositions.get(pathname);
    if (saved !== undefined) {
      container.scrollTop = saved;
    }

    return () => {
      if (container) {
        scrollPositions.set(pathname, container.scrollTop);
      }
    };
  }, [pathname]);

  return containerRef;
}
