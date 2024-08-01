/*
 * @Description: 打包配置
 * @Author: Feng Yinchao
 * @Date: 2024-08-01 09:40:06
 */
const info = require('./package.json')

module.exports = {
  packagerConfig: {
    executableName: 'Anthem',
    icon: 'packages/common/resources/icon',
    appBundleId: 'com.zonst.fengyinchao',
    productName: 'FYC',
    ignore: filepath => {
      if (filepath.length === 0) {
        return false
      }
      if (/^\/dist/.test(filepath)) {
        return false
      }
      if (/^\/package.json/.test(filepath)) {
        return false
      }
      if (/^\/node_modules/.test(filepath)) {
        return false
      }
      return true
    },
    // asar: true,
  },
  rebuildConfig: {
    buildPath: __dirname,
    extraModules: Object.keys(info.dependencies),
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be
        // Main process, Preload scripts, Worker process, etc.
        build: [
          {
            // `entry` is an alias for `build.lib.entry`
            // in the corresponding file of `config`.
            config: 'packages/main/vite.config.ts',
          },
          {
            config: 'packages/preload/vite.config.ts',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'packages/renderer/vite.config.ts',
          },
        ],
      },
    },
  ],
}
