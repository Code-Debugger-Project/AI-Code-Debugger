import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Only load env variables prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react()],
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).map(([key, value]) => [`VITE_${key}`, value])
      )
    }
  }
})
