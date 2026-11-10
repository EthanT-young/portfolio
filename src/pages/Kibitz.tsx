import { ExtLink } from '../components/ExtLink';
import { Reveal } from '../components/Reveal';
import { TagList } from '../components/TagList';
import { BackToProjects, DetailSection, PageHero } from './ProjectLayout';

const APP_URL = '/projects/kibitz/';
const REPO_URL = 'https://github.com/EthanT-young/kibitz-chess';

export function Kibitz() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects/' }, { label: 'Kibitz' }]}
        title="Kibitz"
        lede="A free chess game review that runs in your browser. Stockfish analyzes every position, each move gets a verdict, and a coach explains what the move did."
        meta={
          <>
            <time className="mono-meta" dateTime="2026-11">
              Nov 2026
            </time>
            <span className="tech">React · TypeScript · Stockfish (WebAssembly) · Docker</span>
          </>
        }
      />

      <Reveal>
        <ul className="hero-actions">
          <li>
            <a href={APP_URL} className="btn btn-primary">
              Open Kibitz
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
            Import a game from Chess.com or Lichess by username, or paste a PGN or a move list. Kibitz then gives you:
          </p>
          <ul className="dash-list">
            <li>
              <strong>A summary report</strong> with accuracy for both players, move-quality counts, an estimated game
              rating, grades for the opening, middlegame and endgame, and an evaluation graph.
            </li>
            <li>
              <strong>A move-by-move review</strong> with an eval bar, best-move and threat arrows, and a verdict on
              each move, from Brilliant down to Blunder.
            </li>
            <li>
              <strong>A coach</strong> that says why a move was good or bad, for example "This allows Qg5, attacking
              the knight on e5 and the pawn on g2."
            </li>
            <li>
              <strong>Retry and explore modes</strong>: replay your mistakes and have the coach check the new move, or
              drag pieces to try your own lines with live analysis.
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <DetailSection title="How it works">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <strong>The engine</strong> is Stockfish 19 compiled to WebAssembly. Several copies run in parallel Web
              Workers on the visitor's computer, so my server only sends static files.
            </li>
            <li>
              <strong>Move verdicts</strong> come from how much a move lowered the player's winning chances. Accuracy
              is fitted against 96 games Chess.com had reviewed and lands within about 6 points of their number.
            </li>
            <li>
              <strong>The coach</strong> is rule-based, not an AI model. It replays the engine's lines and runs small
              detectors for hanging pieces, forks, pins, skewers and mate threats, then describes the most important
              one.
            </li>
          </ul>
          <p>
            On the server it is a small container: a Caddy file server with a read-only filesystem and no Linux
            capabilities, running as an unprivileged user behind the site's main Caddy.
          </p>
        </Reveal>
      </DetailSection>

      <DetailSection title="Stack">
        <TagList label="Stack" items={['React', 'TypeScript', 'Vite', 'Stockfish', 'WebAssembly', 'chess.js', 'Caddy', 'Docker']} />
      </DetailSection>

      <DetailSection title="Links">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <a href={APP_URL}>Open Kibitz</a>
            </li>
            <li>
              <ExtLink href={REPO_URL}>Source code on GitHub</ExtLink> (GPL-3.0)
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <BackToProjects />
    </>
  );
}
