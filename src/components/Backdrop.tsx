import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useMotionPref } from '../motion';

/**
 * Decorative, fixed background: slowly drifting glows, a faint dot grid and a
 * spotlight that trails the pointer. Hidden from assistive technology and
 * frozen whenever animations are paused.
 */
export function Backdrop() {
  const spot = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPref();

  useEffect(() => {
    const el = spot.current;
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          el.style.opacity = '1';
        });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
      el.style.opacity = '0';
    };
  }, [reduced]);

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="glow glow-c" />
      <div className="dot-grid" />
      <div className="spotlight" ref={spot} />
    </div>
  );
}

/** Thin accent bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { reduced } = useMotionPref();
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : smooth }} />;
}
