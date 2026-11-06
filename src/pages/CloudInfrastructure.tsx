import { CloudDiagram } from '../components/CloudDiagram';
import { Reveal } from '../components/Reveal';
import { TagList } from '../components/TagList';
import { BackToProjects, DetailSection, PageHero } from './ProjectLayout';

export function CloudInfrastructure() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects/' }, { label: 'Cloud Infrastructure' }]}
        title="Personal Cloud Infrastructure"
        lede="The Oracle Cloud instance that runs this website and a few other services, all behind one edge proxy."
        meta={
          <>
            <time className="mono-meta" dateTime="2026">
              2026 – Present
            </time>
            <span className="tech">Docker · Caddy · OCI · Linux</span>
            <span className="badge">Always Free tier</span>
          </>
        }
      />

      <DetailSection title="Overview">
        <Reveal className="prose">
          <p>
            I set up and run a containerized hosting environment on an Oracle Cloud ARM instance. Caddy sits at the edge,
            serving this site and routing each subdomain to its service. Every service runs as its own Docker Compose
            project on a shared Docker network.
          </p>
        </Reveal>
      </DetailSection>

      <DetailSection title="Problem">
        <Reveal className="prose">
          <p>
            I wanted a place to host my own site and tools that stays up all the time and costs nothing. Oracle Cloud's
            Always Free tier includes an ARM compute instance, so everything here has to fit within that one machine's
            limits.
          </p>
        </Reveal>
      </DetailSection>

      <DetailSection title="Approach">
        <CloudDiagram />
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <strong>One entry point.</strong> Caddy is the only container that accepts traffic from the internet. Every
              other service sits behind it.
            </li>
            <li>
              <strong>Automatic HTTPS.</strong> Caddy obtains and renews TLS certificates for each domain with no manual
              steps.
            </li>
            <li>
              <strong>Independent services.</strong> Each service is its own Docker Compose project. I can update or
              restart one without touching the others.
            </li>
            <li>
              <strong>Shared private network.</strong> The services publish no ports of their own. They share a Docker
              network, and Caddy reaches each one by container name.
            </li>
            <li>
              <strong>No build step.</strong> Caddy serves one <code>public/</code> folder. Changing a file there changes
              the site with no build or restart, and Caddy serves nothing outside that folder.
            </li>
            <li>
              <strong>Low memory use.</strong> Ollama runs the language model on the instance itself. I configured it to
              unload the model after each response, which frees memory for the other services.
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <DetailSection title="Results">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>The whole setup runs on one Always Free instance and costs nothing.</li>
            <li>Adding a service takes a new Compose project, a DNS record and a few lines of Caddy configuration.</li>
          </ul>
        </Reveal>
      </DetailSection>

      <DetailSection title="Stack">
        <TagList
          label="Stack"
          items={['Oracle Cloud (OCI)', 'Linux (ARM)', 'Docker', 'Docker Compose', 'Caddy', 'nginx', 'Uptime Kuma', 'Open WebUI', 'Ollama']}
        />
      </DetailSection>

      <BackToProjects />
    </>
  );
}
