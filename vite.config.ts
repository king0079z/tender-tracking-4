import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000
    },
    preview: {
      host: true,
      port: 3000
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'lucide-icons': ['lucide-react']
          }
        }
      }
    },
    define: {
      'process.env': env
    }
  };
});