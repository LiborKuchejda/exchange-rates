import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    '/api/central-bank-exchange-rate-fixing': {
      target: 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api\/central-bank-exchange-rate-fixing/, ''),
    },
  },
}
})
