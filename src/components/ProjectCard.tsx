import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectSummary } from '../data/content';
import { Reveal } from './Reveal';

type Props = {
  project: ProjectSummary;
  variant: 'teaser' | 'summary';
  delay?: number;
  headingLevel?: 'h2' | 'h3';
};

/**
 * Project card. The whole card is clickable through the title link's
 * stretched hit area, so keyboard users still meet a single, well-named link.
 * A soft spotlight follows the pointer across the card.
 */
export function ProjectCard({ project, variant, delay = 0, headingLevel = 'h3' }: Props) {
  const href = `/projects/${project.slug}/`;
  const Heading = headingLevel;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Reveal as="article" className="card" delay={delay} onPointerMove={onMove}>
      <span className="card-glow" aria-hidden="true" />
      <Heading className="card-title">
        <Link to={href} className="card-link">
          {project.title}
        </Link>
      </Heading>
      <div className="card-meta">
        <time className="mono-meta" dateTime={project.datetime}>
          {project.date}
        </time>
        <span className="tech">{project.tech}</span>
      </div>
      <p className="card-text">{variant === 'teaser' ? project.teaser : project.summary}</p>
      <span className="card-cta" aria-hidden="true">
        Read more <span className="card-arrow">→</span>
      </span>
    </Reveal>
  );
}
