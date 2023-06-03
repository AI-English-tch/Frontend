import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

const pathSrc = path.resolve(__dirname, 'src');
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      dts: 'src/components.d.ts',
      deep: true,
      dirs: ['src/components'],
      extensions: ['vue', 'tsx'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/styles/element/index.scss" as *;`,
  //     },
  //   },
  // },

  server: {
    proxy: {
      '/dev-api': {
        target: 'http://23.251.61.213:9090/',
        // target: 'http://23.251.61.213:9091/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, ''),
      },
    },
  },
});
