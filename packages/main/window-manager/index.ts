/*
 * @Description: Window manager
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import { createWindow } from '@common/window'
import { platform, isDev } from '@common/const'
import { app, shell } from 'electron'
import { join } from 'path'

export const initMainWindow = () => {
  const mainWindow = createWindow('main', {
    backgroundColor: '#00000000',
    frame: platform !== 'windows',
    icon: join(__dirname, '../renderer/assets/icon.png'),
    titleBarOverlay: true,
    // frameless和titleBarStyle: 'hidden'同时开，会显示窗口控制按钮
    titleBarStyle: 'hidden',
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      sandbox: true,
      contextIsolation: true,
    },
  })

  if (platform === 'macos') {
    mainWindow.setWindowButtonPosition({
      x: 12,
      y: 12,
    })
  }
  if (platform === 'windows') {
    mainWindow.setTitleBarOverlay({
      color: '#00000000',
      symbolColor: '#FFFFFF',
    })
  }

  if (app.isPackaged || !isDev) {
    mainWindow.loadFile(join(__dirname, '../../renderer/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://localhost:3344`
    mainWindow.loadURL(url)
  }

  if (isDev) {
    console.warn('You are in development mode')
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    })
  }

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // bypass cors
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    // eslint-disable-next-line n/no-callback-literal
    callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } })
  })

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    // eslint-disable-next-line n/no-callback-literal
    callback({
      responseHeaders: {
        'Access-Control-Allow-Headers': ['*'],
        ...details.responseHeaders,
      },
    })
  })

  return mainWindow
}
