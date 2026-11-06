import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { applyHead, metaFor } from '../routes';

let lastPath: string | null = null;
/** Last scroll position of each history entry, so Back/Forward can return to it. */
const scrollByKey = new Map<string, number>();

/**
 * Runs when a page mounts. On in-app navigation (not the first load) it updates
 * the <head>, then either scrolls to the URL's #hash target or returns to the
 * top and moves keyboard/screen-reader focus to the page's <h1>, so the new
 * page is announced the way a full page load would be.
 *
 * Returns a ref for the page's <h1>, which must carry tabIndex={-1}.
 */
export function usePageEnter<T extends HTMLElement = HTMLHeadingElement>() {
  const headingRef = useRef<T>(null);
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const save = () => scrollByKey.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  useEffect(() => {
    applyHead(metaFor(pathname));
    const first = lastPath === null;
    const same = lastPath === pathname;
    lastPath = pathname;
    if (first || same) return; // initial load: the browser already handled scroll and hash

    // Back/Forward: put the reader back where they were, and leave focus alone.
    const saved = navType === 'POP' ? scrollByKey.get(key) : undefined;
    if (saved !== undefined) {
      window.scrollTo(0, saved);
      return;
    }

    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* malformed percent-encoding: look the raw hash up instead */
    }
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView();
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      headingRef.current?.focus({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return headingRef;
}
