import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    VitePWA({
      mode: 'development',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'attendance-manager',
        short_name: 'attendance',
        start_url: './',
        description: 'Manager your employers attendance easily!',
        theme_color: '#FFA726',
        display: 'standalone',
        icons: [
          {
            src: './icons/logo_48x48.png',
            sizes: '48x48',
          },
          {
            src: './icons/logo_256x256.png',
            sizes: '256x256'
          },
        ]
      },
    }),
    // VitePWA({
    //   mode: 'development',
    //   base: '/',
    //   // srcDir: 'src',
    //   // filename: 'serviceWorker.ts',
    //   // includeAssets: ['/favicon.png'],
    //   // strategies: 'injectManifest',
    //   // manifest: {
    //   //   name: 'attendance-manager',
    //   //   short_name: 'attendance',
    //   //   start_url: './',
    //   //   description: 'Manager your employers attendance easily!',
    //   //   theme_color: '#FFA726',
    //   //   display: 'standalone',
    //   //   icons: [
    //   //     {
    //   //       src: './public/icons/logo_48x48.png',
    //   //       sizes: '48x48',
    //   //     },
    //   //     {
    //   //       src: './public/icons/logo_256x256.png',
    //   //       sizes: '256x256'
    //   //     },
    //   //   ]
    //   // },
    // }),
    quasar({
      sassVariables: 'src/styles/libs/quasar/variables.sass'
    }),
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'devextreme/ui': 'devextreme/esm/ui'
    },
  },
})
