import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import type { Entry } from '../data/content';
import { useMotionPref } from '../motion';
import { Reveal } from './Reveal';

type Props = { entries: Entry[]; line?: boolean };

/**
 * Roles or degrees as an ordered list. With `line`, a rail runs down the left
 * edge and fills with the accent color as the reader scrolls through it.
 */
export function Timeline({ entries, line = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={line ? 'timeline has-line' : 'timeline'}>
      {line && (
        <span className="timeline-rail" aria-hidden="true">
          <motion.span className="timeline-fill" style={{ scaleY: reduced ? 1 : smooth }} />
        </span>
      )}
      <ol className="entries">
        {entries.map((e, i) => (
          <Reveal as="li" key={e.title} className="entry" delay={i * 60}>
            {line && <span className="entry-dot" aria-hidden="true" />}
            <div className="entry-head">
              <h3 className="entry-title">{e.title}</h3>
              <time className="mono-meta" dateTime={e.datetime}>
                {e.date}
              </time>
            </div>
            <p className="entry-org">{e.org}</p>
            <ul className="dash-list">
              {e.bullets.map((b) => (
                <li key={b.text}>
                  {b.label && <strong>{b.label}</strong>} {b.text}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
