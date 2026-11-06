import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { usePageEnter } from '../hooks/usePageEnter';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

type Crumb = { label: string; to?: string };

type PageHeroProps = {
  crumbs: Crumb[];
  title: string;
  lede: ReactNode;
  meta?: ReactNode;
};

/** Breadcrumb, h1, lede and meta row shared by /projects/ and each project page. */
export function PageHero({ crumbs, title, lede, meta }: PageHeroProps) {
  const h1 = usePageEnter();
  return (
    <div className="page-hero">
      <nav className="breadcrumb intro" style={i(0)} aria-label="Breadcrumb">
        <ol>
          {crumbs.map((c) => (
            <li key={c.label}>
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="page-title intro" style={i(1)} ref={h1} tabIndex={-1}>
        {title}
      </h1>
      <p className="page-lede intro" style={i(2)}>
        {lede}
      </p>
      {meta && (
        <div className="project-meta intro" style={i(3)}>
          {meta}
        </div>
      )}
    </div>
  );
}

/** One titled block of a project page (Overview, Problem, Approach, ...). */
export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  const id = `${title.toLowerCase()}-title`;
  return (
    <section className="section detail" aria-labelledby={id}>
      <Reveal>
        <SectionHeading id={id}>{title}</SectionHeading>
      </Reveal>
      {children}
    </section>
  );
}

export function BackToProjects() {
  return (
    <p className="back-link">
      <Link className="more-link back" to="/projects/">
        <span className="arrow" aria-hidden="true">←</span> All projects
      </Link>
    </p>
  );
}
