import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const API_PROXY_PREFIXES = [
  '/api',
  '/open_api',
  '/user_api',
  '/admin',
  '/telegram',
  '/external',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBase = env.VITE_API_BASE;
  const devApiProxyTarget = env.VITE_DEV_API_PROXY_TARGET || 'http://127.0.0.1:8787';
  const proxy = apiBase
    ? undefined
    : Object.fromEntries(
      API_PROXY_PREFIXES.map((prefix) => [
        prefix,
        {
          target: devApiProxyTarget,
          changeOrigin: true,
        }
      ])
    );

  return {
    build: {
      outDir: './dist',
    },
    server: proxy ? { proxy } : undefined,
    plugins: [
      vue(),
      wasm(),
      topLevelAwait(),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useMessage',
              'useNotification',
              'NButton',
              'NPopconfirm',
              'NIcon',
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      VitePWA({
        registerType: null,
        devOptions: {
          enabled: false
        },
        workbox: {
          disableDevLogs: true,
          globPatterns: [],
          runtimeCaching: [],
          navigateFallback: null,
          cleanupOutdatedCaches: true,
        },
        manifest: {
          name: 'Temp Email',
          short_name: 'Temp Email',
          description: 'Temp Email - Temporary Email',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/logo.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    esbuild: {
      supported: {
        'top-level-await': true
      },
    }
  }
})
