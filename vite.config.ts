import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Source lives in src/, static files (fonts, resume) in static/.
// The build writes to public/, the folder Caddy already serves, so the
// server and deploy flow need no changes.
export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  build: {
    outDir: 'public',
    emptyOutDir: true,
  },
});
