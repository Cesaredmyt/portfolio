import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Librerías en archivos propios: el navegador las cachea aunque cambie el código del sitio.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
          motion: ['motion/react'],
          lenis: ['lenis', 'lenis/react'],
        },
      },
    },
  },
})
