import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({
        importStyle: false,
      })],
      dts: true, // Generate type definitions
    }),
  ],
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
})
