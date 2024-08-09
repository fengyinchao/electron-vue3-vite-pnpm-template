/*
 * @Description: ipc main
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:42:43
 */
import { ipcMain } from 'electron'
import { getWindow } from '@common/window'

type Callback = (event: Electron.IpcMainInvokeEvent, args: any) => void

function onMsgFromRender(callBack: Callback): void {
  ipcMain.handle('renderMsgToMain', (event: Electron.IpcMainInvokeEvent, args: any) => {
    return callBack(event, args)
  })
}

function sendMsgToRender(windowName: string, msg: any): void {
  const windowInstance = getWindow(windowName)
  if (windowInstance) {
    windowInstance.webContents.send('mainMsgToRender', msg)
  } else {
    throw new Error('not find windowInstance')
  }
}

export { onMsgFromRender, sendMsgToRender }
