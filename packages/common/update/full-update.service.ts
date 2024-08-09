/*
 * @Description: electron 全量自动更新
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 16:56:12
 */
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

interface UpadateOptions {
  log?: boolean
  forceDevUpdateConfig?: boolean
  autoDownload?: boolean
  updateUrl: string
  updateDownloadedCallBack: () => void
}

export const initUpdate = (options: UpadateOptions) => {
  if (autoUpdater) {
    autoUpdater.removeAllListeners()
  }
  autoUpdater.logger = log
  autoUpdater.forceDevUpdateConfig = !!options.forceDevUpdateConfig
  autoUpdater.autoDownload = !!options.autoDownload
  autoUpdater.setFeedURL(options.updateUrl)
  autoUpdater.checkForUpdates()
  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('error', function (error: Error) {
    log.error('[全量更新服务失败]', JSON.stringify(error))
  })

  autoUpdater.on('checking-for-update', function () {
    log.info('[全量更新服务] checking-for-update')
  })

  autoUpdater.on('update-available', function (info) {
    log.info('[全量更新服务] update-available', info)
  })

  autoUpdater.on('update-not-available', function (info) {
    log.info('[全量更新服务] update-not-available', info)
  })

  autoUpdater.on('download-progress', function (info) {
    log.info('[全量更新服务] download-progress', info)
  })

  autoUpdater.on('update-downloaded', function (info) {
    log.info('[全量更新服务] update-downloaded', info)
    options.updateDownloadedCallBack()
  })

  return autoUpdater
}

export const intsallUpdateApp = () => {
  log.info('[全量更新服务] intsallUpdateApp')
  autoUpdater.quitAndInstall()
}
