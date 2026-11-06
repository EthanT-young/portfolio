import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

type Tag = 'div' | 'section' | 'article' | 'li' | 'figure' | 'header' | 'footer';

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: Tag;
  /** Extra delay in ms, for staggering siblings. */
  delay?: number;
  children: ReactNode;
};

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 *
 * The hidden starting state lives in CSS and only applies when JS has run and
 * motion is allowed (html.js:not([data-motion=reduced])), so prerendered HTML,
 * no-JS visitors, print and reduced-motion users always see the content.
 */
export function Reveal({ as = 'div', delay = 0, className, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = as as 'div';
  const cls = ['reveal', shown && 'is-in', className].filter(Boolean).join(' ');
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cls}
      style={{ ...style, '--d': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  );
}
