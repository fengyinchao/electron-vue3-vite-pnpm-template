/*
 * @Description: initElectronStore
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 15:06:28
 */

import { ipcMain } from 'electron'
import { BackDoorService } from './backdoor.service'

export async function initBackdoorService() {
  const store = await BackDoorService.init()

  ipcMain.on('getBackdoorConfig', (_, key) => {
    _.returnValue = store
  })
}
