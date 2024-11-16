import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const environment = process.env.VITE_ENV;
// https://vitejs.dev/config/
export default defineConfig({
  base: '/payments/',
  plugins: [vue()],
})
