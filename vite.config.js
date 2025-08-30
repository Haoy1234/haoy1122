import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/haoy1122/',  // GitHub Pages 仓库名
  server: {
    port: 5173,  // 使用新的端口
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
