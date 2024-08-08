/*
 * @Description: The main entry of the application.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */

import WindowManager from '@main/windowManager'
import { BrowserWindow, app, shell } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { info } from 'electron-log'
import { getPlatform, isInDev } from '@main/utils/os'
import { LogService } from './base-services/log.service'
import { BackDoorService } from './base-services/backdoor.service'
import { ElectronStoreService } from './base-services/electron-store.service'

async function ApplicationInit() {
  await LogService.init()
  await BackDoorService.init()
  await ElectronStoreService.init()
  info(`[main/index] Electron version: ${process.versions.electron}`)
  info(`[main/index] Chromium version: ${process.versions.chrome}`)
  info(`[main/index] Node version: ${process.versions.node}`)

  // 禁用 GPU 加速，因为在某些系统上，GPU 加速会导致应用程序在某些情况下出现问题。
  if (release().startsWith('6.1')) app.disableHardwareAcceleration()
  // 通过设置用户模型 ID，Electron 应用可以在 Windows 的任务栏和通知区域中正确显示应用程序的图标和名称。这对于多窗口应用尤其重要，因为它可以确保所有窗口都与同一个应用程序关联。
  if (getPlatform() === 'windows') app.setAppUserModelId(app.getName())

  // 如果检测到已有实例在运行，则退出当前尝试启动的新实例。这有助于避免资源浪费和潜在的数据冲突，确保用户的体验一致。
  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }

  async function createApp(): Promise<void> {
    const win = new WindowManager().getWindow()
    if (app.isPackaged || !isInDev()) {
      win.loadFile(join(__dirname, '../renderer/index.html'))
    } else {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
      const url = `http://localhost:3344`
      win.loadURL(url)
    }

    if (isInDev()) {
      console.warn('You are in development mode')
      win.webContents.on('did-frame-finish-load', () => {
        win.webContents.openDevTools({ mode: 'detach' })
      })
    }

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })

    // bypass cors
    win.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
      // eslint-disable-next-line n/no-callback-literal
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } })
    })

    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      // eslint-disable-next-line n/no-callback-literal
      callback({
        responseHeaders: {
          'Access-Control-Allow-Headers': ['*'],
          ...details.responseHeaders,
        },
      })
    })
  }

  app.on('window-all-closed', () => {
    app.quit()
  })

  // 当用户尝试打开应用程序的第二个实例时(在应用程序已经运行的情况下再次双击其图标)，应用程序不会打开新的窗口，而是将已经存在的主窗口恢复并聚焦。这种做法可以提高用户体验，避免混淆和资源浪费。
  app.on('second-instance', () => {
    // 这里由于 WindowManager 是单例，所以不会再实例化，而是返回之前实例化对象
    const win = new WindowManager().getWindow()
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

ApplicationInit()
