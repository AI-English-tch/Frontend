import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

const pathSrc = path.resolve(__dirname, 'src');
const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
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
    server: {
      proxy: {
        '/dev-api': {
          target: env.VITE_ADMIN_PROXY_PATH,
          // before
          // target: 'http://23.251.61.213:9091/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  }
})
export default viteConfig;
