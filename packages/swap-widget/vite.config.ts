import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'] }), viteTsconfigPaths(), svgrPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'swapWidget',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'react',
        },
      },
    },
  },
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const file = filename.split('/').pop()?.split('.')[0] || 'unknown'
        const fileLowerCase = file.charAt(0).toLowerCase() + file.slice(1)

        return `swapWidget_${fileLowerCase}_${name}`
      },
    },
  },
})
