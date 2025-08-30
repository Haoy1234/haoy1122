import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // 新项目使用相对路径
  server: {
    port: 5173,  // 使用新的端口
    open: true
  }
})
