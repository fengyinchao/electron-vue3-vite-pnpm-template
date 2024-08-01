/*
 * @Description: 调试工具
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import { BrowserWindow } from 'electron'

async function useDebug(window: BrowserWindow) {
  const devtoolsInstaller: any = (await import('electron-devtools-installer')).default
  devtoolsInstaller
    .default('ljjemllljcmogpfapbkkighbhhppjdbg')
    .then((name: string) => console.info(`Added Extension:  ${name}`))
    .catch((err: Error) => console.error(`An error occurred while install extension: ${err.message}`))
  window.webContents.openDevTools({ mode: 'detach' })
  // Bypass CORS
  window.webContents.session.webRequest.onBeforeSendHeaders(
    {
      urls: ['https://prts.wiki/*', 'https://maa.alisaqaq.moe/*', 'https://penguin-stats.io/*'],
    },
    (details, callback) => {
      details.requestHeaders.Origin = new URL(details.url).origin
      callback(details)
    },
  )
  window.webContents.session.webRequest.onHeadersReceived(
    {
      urls: ['https://prts.wiki/*', 'https://maa.alisaqaq.moe/*', 'https://penguin-stats.io/*'],
    },
    (details, callback) => {
      const corsHeader = { 'access-control-allow-origin': '*' }
      details.responseHeaders = Object.assign(details.responseHeaders ?? {}, corsHeader)
      callback(details)
    },
  )
}

export default useDebug
