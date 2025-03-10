import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({

    base: process.env.VITE_ENV === 'production' ? '/payments/' : '/',
    plugins: [vue()],
  });
}
