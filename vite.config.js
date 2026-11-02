import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static build: no server rewrites needed because the app uses HashRouter.
export default defineConfig({
  plugins: [react()],
})
