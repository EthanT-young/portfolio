import type { CSSProperties } from 'react';
import { Reveal } from './Reveal';

type Props = { items: string[]; label?: string; delay?: number };

/** A wrapping list of skill/stack tags that pop in one after another. */
export function TagList({ items, label, delay = 0 }: Props) {
  return (
    <Reveal delay={delay} className="tags-wrap">
      <ul className="tags" aria-label={label}>
        {items.map((item, i) => (
          <li key={item} className="tag" style={{ '--i': i } as CSSProperties}>
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
