/*
 * @Description: build all packages
 * @Author: Feng Yinchao
 * @Date: 2024-07-31 16:44:39
 */
import { build } from 'vite'

await build({ configFile: 'packages/main/vite.config.ts' })
await build({ configFile: 'packages/preload/vite.config.ts' })
await build({ configFile: 'packages/renderer/vite.config.ts' })
