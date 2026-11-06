import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ExtLink } from '../components/ExtLink';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TagList } from '../components/TagList';
import { Timeline } from '../components/Timeline';
import { contact, education, experience, projects, skills } from '../data/content';
import { usePageEnter } from '../hooks/usePageEnter';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// The two current roles, straight from the Experience section.
const current = experience.filter((e) => e.date.endsWith('Present'));

export function Home() {
  const h1 = usePageEnter();

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-eyebrow intro" style={i(0)}>
            {contact.location}
          </p>
          <h1 id="hero-title" className="hero-title" ref={h1} tabIndex={-1}>
            <span className="word">
              <span className="word-inner" style={i(1)}>Ethan</span>
            </span>{' '}
            <span className="word">
              <span className="word-inner" style={i(2)}>Young</span>
            </span>
          </h1>
          <p className="hero-subtitle intro" style={i(3)}>
            Software Engineer
          </p>
          <p className="hero-lede intro" style={i(4)}>
            Systems, infrastructure, and applied AI. Computer Science student at UNLV.
          </p>
          <ul className="hero-actions intro" style={i(5)}>
            <li>
              <ExtLink href={contact.resume} className="btn btn-primary" plain>
                Resume (PDF)
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </ExtLink>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="btn">
                {contact.email}
              </a>
            </li>
            <li>
              <ExtLink href={contact.github} className="btn btn-ghost">
                GitHub
              </ExtLink>
            </li>
            <li>
              <ExtLink href={contact.linkedin} className="btn btn-ghost">
                LinkedIn
              </ExtLink>
            </li>
          </ul>
        </div>

        <aside className="now-card intro" style={i(4)} aria-labelledby="now-title">
          <h2 id="now-title" className="now-title">
            <span className="live-dot" aria-hidden="true" />
            Currently
          </h2>
          <ul className="now-list">
            {current.map((role) => (
              <li key={role.title}>
                <span className="now-role">{role.title}</span>
                <span className="now-org">{role.org}</span>
              </li>
            ))}
          </ul>
        </aside>

        <span className="scroll-cue intro" style={i(7)} aria-hidden="true">
          <span className="scroll-cue-line" />
        </span>
      </section>

      <section id="experience" className="section" aria-labelledby="experience-title">
        <Reveal>
          <SectionHeading index={1} id="experience-title">
            Experience
          </SectionHeading>
        </Reveal>
        <Timeline entries={experience} line />
      </section>

      <section id="education" className="section" aria-labelledby="education-title">
        <Reveal>
          <SectionHeading index={2} id="education-title">
            Education
          </SectionHeading>
        </Reveal>
        <Timeline entries={education} />
      </section>

      <section id="projects" className="section" aria-labelledby="projects-title">
        <Reveal>
          <SectionHeading index={3} id="projects-title">
            Projects
          </SectionHeading>
        </Reveal>
        <div className="card-grid">
          {projects.map((p, n) => (
            <ProjectCard key={p.slug} project={p} variant="teaser" delay={n * 90} />
          ))}
        </div>
        <Reveal>
          <Link className="more-link" to="/projects/">
            View all projects <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      <section id="skills" className="section" aria-labelledby="skills-title">
        <Reveal>
          <SectionHeading index={4} id="skills-title">
            Skills
          </SectionHeading>
        </Reveal>
        <div className="skills-grid">
          {skills.map((group, n) => (
            <div key={group.category} className="skill-group">
              <Reveal delay={n * 80}>
                <h3 className="skill-title">{group.category}</h3>
              </Reveal>
              <TagList items={group.items} delay={n * 80 + 60} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
