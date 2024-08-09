/*
 * @Description: @common 入口
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:55:23
 */
import { contextBridge, ipcMain } from 'electron'
import { offMsgFromMain, onMsgFromMain, onRenderMsgToRender, renderMsgToMain, renderMsgToRender } from './ipc/preload'
import { getWindow } from '@common/window'

export function initExposeInMainWorld(): void {
  contextBridge.exposeInMainWorld('ipc', {
    // communication
    renderMsgToMain,
    onMsgFromMain,
    offMsgFromMain,
    renderMsgToRender,
    onRenderMsgToRender,
  })
}

function initOnRenderMsgToRender(): void {
  ipcMain.on('renderMsgToRender', (event: Electron.IpcMainEvent, args: any) => {
    const windowInstance = getWindow(args.windowName)
    if (windowInstance) {
      windowInstance.webContents.send('renderMsgToRender', args.msg)
    } else {
      throw new Error('not find windowInstance')
    }
  })
}

export function initIpc(): void {
  initOnRenderMsgToRender()
}
