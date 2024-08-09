/*
 * @Description: @common 入口
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:55:23
 */
import { contextBridge, ipcMain } from 'electron'
import { offMsgFromMain, onMsgFromMain, onRenderMsgToRender, renderMsgToMain, renderMsgToRender } from './ipc/preload'
import { getWindow } from './window'
import { getStoreValue, setStoreValue } from './store/preload'
import { getBackdoorConfigFromMain } from './backdoor/preload'

export function initExposeInMainWorld(): void {
  contextBridge.exposeInMainWorld('electronApi', {
    // communication
    renderMsgToMain,
    onMsgFromMain,
    offMsgFromMain,
    renderMsgToRender,
    onRenderMsgToRender,
    // store
    getStoreValue,
    setStoreValue,
    // backdoor
    getBackdoorConfigFromMain,
  })
}

export function initIpc(): void {
  ipcMain.on('renderMsgToRender', (event: Electron.IpcMainEvent, args: any) => {
    const windowInstance = getWindow(args.windowName)
    if (windowInstance) {
      windowInstance.webContents.send('renderMsgToRender', args.msg)
    } else {
      throw new Error('not find windowInstance')
    }
  })
}
