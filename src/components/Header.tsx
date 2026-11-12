import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useMotionPref } from '../motion';

type NavItem = { key: string; label: string; section?: string; to?: string };

const NAV: NavItem[] = [
  { key: 'experience', label: 'Experience', section: 'experience' },
  { key: 'education', label: 'Education', section: 'education' },
  { key: 'projects', label: 'Projects', to: '/projects/' },
  { key: 'skills', label: 'Skills', section: 'skills' },
  { key: 'contact', label: 'Contact', section: 'contact' },
];

const SPY_IDS = ['experience', 'education', 'projects', 'skills', 'contact'];

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const onProjects = pathname.startsWith('/projects');
  const spied = useScrollSpy(SPY_IDS, isHome);
  const active = onProjects ? 'projects' : spied;
  const { reduced, toggle } = useMotionPref();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Reserve exactly as much space as the header really takes. Its height grows
  // with text-only zoom and text spacing, which the CSS fallback can't predict.
  // If it would cover more than 30% of the window, let it scroll away instead
  // of staying fixed over the content (WCAG 1.4.4, 2.4.11).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () => {
      const h = el.offsetHeight;
      root.style.setProperty('--header-offset', `${h}px`);
      root.classList.toggle('header-unpinned', h > window.innerHeight * 0.3);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      root.style.removeProperty('--header-offset');
      root.classList.remove('header-unpinned');
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onLogo = (e: MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <header ref={headerRef} className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="header-inner">
        <Link className="logo" to="/" onClick={onLogo}>
          <span className="logo-mark" aria-hidden="true" />
          Ethan Young
        </Link>

        <nav aria-label="Main" className="main-nav">
          <ul>
            {NAV.map((item) => {
              const isActive = active === item.key;
              const pill = isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  aria-hidden="true"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              );
              const label = <span className="nav-label">{item.label}</span>;
              const cls = isActive ? 'nav-link is-active' : 'nav-link';
              return (
                <li key={item.key}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className={cls}
                      aria-current={pathname === item.to ? 'page' : onProjects ? 'true' : undefined}
                    >
                      {pill}
                      {label}
                    </Link>
                  ) : isHome ? (
                    <a href={`#${item.section}`} className={cls}>
                      {pill}
                      {label}
                    </a>
                  ) : (
                    <Link to={`/#${item.section}`} className={cls}>
                      {pill}
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="motion-toggle"
          aria-pressed={reduced}
          onClick={toggle}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            {reduced ? (
              <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
            ) : (
              <g fill="currentColor">
                <rect x="4" y="3.5" width="2.6" height="9" rx="0.6" />
                <rect x="9.4" y="3.5" width="2.6" height="9" rx="0.6" />
              </g>
            )}
          </svg>
          <span className="motion-toggle-text">Pause animations</span>
        </button>
      </div>
    </header>
  );
}
