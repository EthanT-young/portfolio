import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/content';
import { PageHero } from './ProjectLayout';

export function Projects() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} title="Projects" lede="Personal and course projects." />
      <section className="section" aria-labelledby="all-projects">
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <div className="card-list">
          {projects.map((p, n) => (
            <ProjectCard key={p.slug} project={p} variant="summary" delay={n * 90} />
          ))}
        </div>
      </section>
    </>
  );
}
