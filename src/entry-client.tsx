import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

declare global {
  interface Window {
    __hydrated?: boolean;
  }
}

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are prerendered, so hydrate them; the dev server serves an empty shell.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);

window.__hydrated = true;
