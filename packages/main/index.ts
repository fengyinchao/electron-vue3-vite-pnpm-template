/*
 * @Description: The main entry of the application.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */

import { initMainWindow } from '@main/window-manager'
import { BrowserWindow, app } from 'electron'
import { release } from 'os'
import { info, error } from 'electron-log'
import { LogService } from './base-services/log.service'
import { arch, platform, getSystemInformation } from '@common/const'
import { initElectronStore } from '@common/store/main'
import { initIpc } from '@common/index'
import { initBackdoorService } from '@common/backdoor/main'
// import { initUpdate, intsallUpdateApp } from '@common/update/full-update.service'
import { inspect } from 'util'

async function ApplicationInit() {
  await LogService.init()
  await initBackdoorService()
  await initElectronStore()
  initIpc()
  // TODO:update server
  // initUpdate({
  //   updateUrl: 'URL_ADDRESS',
  //   autoDownload: true,
  //   forceDevUpdateConfig: true,
  //   updateDownloadedCallBack: intsallUpdateApp,
  //   log: true,
  // })
  info(`[main/index] Electron version: ${process.versions.electron}`)
  info(`[main/index] Chromium version: ${process.versions.chrome}`)
  info(`[main/index] Node version: ${process.versions.node}`)
  info(`[main/index] Platform: ${platform}`)
  info(`[main/index] Arch: ${arch}`)
  getSystemInformation().then(systemInformation => {
    info(`[main/index] SystemInfo: ${JSON.stringify(systemInformation)}`)
  })

  // 禁用 GPU 加速，因为在某些系统上，GPU 加速会导致应用程序在某些情况下出现问题。
  if (release().startsWith('6.1')) app.disableHardwareAcceleration()
  // 通过设置用户模型 ID，Electron 应用可以在 Windows 的任务栏和通知区域中正确显示应用程序的图标和名称。这对于多窗口应用尤其重要，因为它可以确保所有窗口都与同一个应用程序关联。
  if (platform === 'windows') app.setAppUserModelId(app.getName())

  // 如果检测到已有实例在运行，则退出当前尝试启动的新实例。这有助于避免资源浪费和潜在的数据冲突，确保用户的体验一致。
  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }

  async function createApp(): Promise<void> {
    initMainWindow()
  }

  app.on('window-all-closed', () => {
    app.quit()
  })

  // 当用户尝试打开应用程序的第二个实例时(在应用程序已经运行的情况下再次双击其图标)，应用程序不会打开新的窗口，而是将已经存在的主窗口恢复并聚焦。这种做法可以提高用户体验，避免混淆和资源浪费。
  app.on('second-instance', () => {
    const win = initMainWindow()
    if (win.isMinimized()) {
      win.restore()
    }
    win.focus()
  })

  // 通常在 macOS 上应用程序被激活或点击时触发
  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length > 0) {
      allWindows[0].focus()
    } else {
      createApp()
    }
  })

  app.whenReady().then(createApp)
}

ApplicationInit().catch(err => {
  error('[ApplicationInit error:]', inspect(err))
})

process.on('unhandledRejection', reason => {
  error('[Application UnhandledRejection Error]', 'reason:', inspect(reason))
  process.exit(1)
})

process.on('uncaughtException', err => {
  error('[Application UncaughtException Error]', 'err:', inspect(err))
  process.exit(1)
})
