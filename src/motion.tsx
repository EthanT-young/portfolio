import { MotionConfig } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

// Motion preference: the visitor's explicit choice (saved in localStorage) wins;
// otherwise the OS "reduce motion" setting decides. The inline script in
// index.html applies the same rule before first paint via <html data-motion>.

type MotionState = { reduced: boolean; toggle: () => void };

const MotionContext = createContext<MotionState>({ reduced: false, toggle: () => {} });

const QUERY = '(prefers-reduced-motion: reduce)';

function readSaved(): string | null {
  try {
    return localStorage.getItem('motion');
  } catch {
    return null;
  }
}

function applyToDocument(reduced: boolean) {
  document.documentElement.setAttribute('data-motion', reduced ? 'reduced' : 'full');
}

export function MotionProvider({ children }: { children: ReactNode }) {
  // Always start "full" so the client's first render matches the prerendered
  // HTML; the real value is synced right after hydration.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(document.documentElement.getAttribute('data-motion') === 'reduced');
    const mq = window.matchMedia(QUERY);
    const onChange = () => {
      if (readSaved()) return; // an explicit choice overrides the OS setting
      applyToDocument(mq.matches);
      setReduced(mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setReduced((prev) => {
      const next = !prev;
      applyToDocument(next);
      try {
        localStorage.setItem('motion', next ? 'reduced' : 'full');
      } catch {
        /* storage blocked: the choice lasts for this page view only */
      }
      return next;
    });
  }, []);

  return (
    <MotionContext.Provider value={{ reduced, toggle }}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

export const useMotionPref = () => useContext(MotionContext);

/** Shared easing: a soft "expo out" used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;
