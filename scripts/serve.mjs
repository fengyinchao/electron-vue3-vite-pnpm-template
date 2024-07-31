/*
 * @Description: serve all packages
 * @Author: Feng Yinchao
 * @Date: 2024-07-31 16:44:39
 */
import { build, createServer } from 'vite'

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        },
      },
    ],
    build: {
      watch: true,
    },
  })
}

// bootstrap
const server = await createServer({
  configFile: 'packages/renderer/vite.config.ts',
})

await server.listen()
await watchPreload(server)
