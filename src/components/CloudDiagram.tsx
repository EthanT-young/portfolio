import type { CSSProperties } from 'react';
import { Reveal } from './Reveal';

const d = (ms: number) => ({ '--dd': `${ms}ms` }) as CSSProperties;

/**
 * Platform architecture diagram. When it scrolls into view the boxes fade in
 * and the connecting lines draw themselves in order (pathLength="1" lets CSS
 * animate any line with a 0→1 dash offset).
 */
export function CloudDiagram() {
  return (
    <Reveal as="figure" className="diagram">
      <svg viewBox="0 0 380 482" role="img" aria-labelledby="dg-title dg-desc">
        <title id="dg-title">Platform architecture</title>
        <desc id="dg-desc">
          Visitors connect over HTTPS directly to Caddy, the only entry point. Inside an Oracle Cloud Always Free
          instance, a shared Docker network holds Caddy, which serves this website itself and routes requests to three
          services: monitoring with Uptime Kuma, LLM chat with Open WebUI and Ollama, and an image converter served by
          nginx.
        </desc>
        <defs>
          <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="dg-head" />
          </marker>
        </defs>

        <g className="dg-fade" style={d(0)}>
          <rect x="230" y="8" width="130" height="40" rx="6" className="dg-box" />
          <text x="295" y="33" textAnchor="middle" className="dg-title">Visitors</text>
        </g>

        <g className="dg-fade" style={d(100)}>
          <rect x="6" y="80" width="368" height="394" rx="10" className="dg-frame" />
          <text x="18" y="102" className="dg-label">Oracle Cloud · Always Free</text>
          <rect x="20" y="114" width="340" height="346" rx="8" className="dg-net" />
          <text x="32" y="136" className="dg-label">Shared Docker network</text>
        </g>

        <line x1="295" y1="48" x2="295" y2="148" pathLength={1} className="dg-line dg-draw" style={d(250)} markerEnd="url(#dg-arrow)" />
        <text x="285" y="68" textAnchor="end" className="dg-label dg-fade" style={d(350)}>HTTPS</text>

        <g className="dg-fade" style={d(500)}>
          <rect x="130" y="150" width="220" height="66" rx="6" className="dg-box dg-accent" />
          <text x="240" y="173" textAnchor="middle" className="dg-title">Caddy</text>
          <text x="240" y="192" textAnchor="middle" className="dg-sub">serves this site</text>
          <text x="240" y="208" textAnchor="middle" className="dg-sub">routes by subdomain</text>
        </g>

        <line x1="130" y1="183" x2="50" y2="183" pathLength={1} className="dg-line dg-draw" style={d(700)} />
        <line x1="50" y1="183" x2="50" y2="397" pathLength={1} className="dg-line dg-draw" style={d(850)} />
        <line x1="50" y1="265" x2="78" y2="265" pathLength={1} className="dg-line dg-draw" style={d(1000)} markerEnd="url(#dg-arrow)" />
        <line x1="50" y1="331" x2="78" y2="331" pathLength={1} className="dg-line dg-draw" style={d(1100)} markerEnd="url(#dg-arrow)" />
        <line x1="50" y1="397" x2="78" y2="397" pathLength={1} className="dg-line dg-draw" style={d(1200)} markerEnd="url(#dg-arrow)" />

        <g className="dg-fade" style={d(1050)}>
          <rect x="80" y="238" width="266" height="54" rx="6" className="dg-box" />
          <text x="94" y="261" className="dg-title">Monitoring</text>
          <text x="94" y="280" className="dg-sub">Uptime Kuma</text>
        </g>
        <g className="dg-fade" style={d(1150)}>
          <rect x="80" y="304" width="266" height="54" rx="6" className="dg-box" />
          <text x="94" y="327" className="dg-title">LLM chat</text>
          <text x="94" y="346" className="dg-sub">Open WebUI + Ollama</text>
        </g>
        <g className="dg-fade" style={d(1250)}>
          <rect x="80" y="370" width="266" height="54" rx="6" className="dg-box" />
          <text x="94" y="393" className="dg-title">Image converter</text>
          <text x="94" y="412" className="dg-sub">browser-based, served by nginx</text>
        </g>
      </svg>
    </Reveal>
  );
}
