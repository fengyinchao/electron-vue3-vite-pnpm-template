/*
 * @Description: initElectronStore
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 15:06:28
 */

import { ipcMain } from 'electron'
import { ElectronStoreService } from './electron-store.service'

export async function initElectronStore() {
  const store = await ElectronStoreService.init()

  // 定义ipcRenderer监听事件
  ipcMain.on('setStoreValue', (_, key, value) => {
    // @ts-ignore
    store.set(key, value)
  })

  ipcMain.on('getStoreValue', (_, key) => {
    // @ts-ignore
    const value = store.get(key)
    _.returnValue = value || ''
  })
}
