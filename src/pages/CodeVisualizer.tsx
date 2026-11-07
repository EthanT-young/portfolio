import { ExtLink } from '../components/ExtLink';
import { Reveal } from '../components/Reveal';
import { TagList } from '../components/TagList';
import { BackToProjects, DetailSection, PageHero } from './ProjectLayout';

const APP_URL = '/projects/code-visualizer/app/';
const REPO_URL = 'https://github.com/EthanT-young/code-visualizer';

export function CodeVisualizer() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects/' }, { label: 'Code Visualizer' }]}
        title="Code Visualizer"
        lede="Step through Java, C++ or Python code line by line and watch the data change. I built it for explaining LeetCode and HackerRank solutions."
        meta={
          <>
            <time className="mono-meta" dateTime="2026-11">
              Nov 2026
            </time>
            <span className="tech">React · Python · Java (JDI) · GDB · Docker</span>
          </>
        }
      />

      <Reveal>
        <ul className="hero-actions">
          <li>
            <a href={APP_URL} className="btn btn-primary">
              Open the visualizer
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </li>
          <li>
            <ExtLink href={REPO_URL} className="btn btn-ghost">
              Source on GitHub
            </ExtLink>
          </li>
        </ul>
      </Reveal>

      <DetailSection title="Overview">
        <Reveal className="prose">
          <p>
            Paste in a solution and step forward or back through it. The line about to run is highlighted, anything that
            just changed is marked, and the data is drawn the way you would sketch it on a whiteboard:
          </p>
          <ul className="dash-list">
            <li>
              <strong>Arrays and strings</strong> with index pointers such as <code>i</code>, <code>left</code> and{' '}
              <code>mid</code> drawn above the cells, and 2D grids with the current cell outlined.
            </li>
            <li>
              <strong>Hash maps, sets, stacks, queues and heaps</strong>, plus linked lists and binary trees labeled
              with the variables that point at each node.
            </li>
            <li>
              <strong>The call stack</strong>, so recursion is visible frame by frame along with return values.
            </li>
          </ul>
          <p>
            It also takes program input for HackerRank-style problems, can re-run as you type, and makes shareable links
            that carry the code.
          </p>
        </Reveal>
      </DetailSection>

      <DetailSection title="How it runs">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <strong>Java</strong> runs on the server and is traced through the JVM's debugger interface (JDI).
            </li>
            <li>
              <strong>C++</strong> runs on the server and is traced with GDB and the libstdc++ pretty printers.
            </li>
            <li>
              <strong>Python</strong> runs in your browser through Pyodide, so it works even when the server is down.
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <DetailSection title="Running visitors' code safely">
        <Reveal className="prose">
          <p>
            Anyone who opens the page can run Java and C++ on my server, so the container that runs it is locked down. It
            has no network access and a read-only filesystem, and Caddy reaches it through a Unix socket instead of a
            port. Each program runs as its own unprivileged user with no Linux capabilities, under limits of 10 seconds,
            3,000 steps and 100 KB of output, and everything it started is killed when the run ends. Visitors get 30
            server runs per 10 minutes.
          </p>
          <p>
            The container is capped at one CPU, so a visitor running something heavy can't slow down this site or the
            other services on the same server.
          </p>
        </Reveal>
      </DetailSection>

      <DetailSection title="Stack">
        <TagList label="Stack" items={['React', 'Vite', 'Monaco', 'Python', 'Java', 'C++', 'GDB', 'Pyodide', 'Docker']} />
      </DetailSection>

      <DetailSection title="Links">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <a href={APP_URL}>Open the visualizer</a>
            </li>
            <li>
              <ExtLink href={REPO_URL}>Source code on GitHub</ExtLink>
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <BackToProjects />
    </>
  );
}
