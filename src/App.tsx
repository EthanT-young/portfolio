import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Backdrop, ScrollProgress } from './components/Backdrop';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { EASE, MotionProvider } from './motion';
import { CloudInfrastructure } from './pages/CloudInfrastructure';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Projects } from './pages/Projects';
import { RebelLocate } from './pages/RebelLocate';
import './styles/global.css';

export function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Backdrop />
      <ScrollProgress />
      <Header />

      {/* Pages cross-fade on in-app navigation. initial={false} keeps the
          first (prerendered) page fully visible with no entrance delay. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          id="main"
          tabIndex={-1}
          className="container site-main"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/cloud-infrastructure" element={<CloudInfrastructure />} />
            <Route path="/projects/rebel-locate" element={<RebelLocate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer index={isHome ? 5 : undefined} />
    </MotionProvider>
  );
}
