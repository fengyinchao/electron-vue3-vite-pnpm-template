/*
 * @Description: ipc preload
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:42:01
 */
import { ipcRenderer, type IpcRendererEvent } from 'electron'

type Callback = (event: IpcRendererEvent, args: any) => void

const renderMsgToMain = <T, U>(msg: T): Promise<U> => {
  return ipcRenderer.invoke('renderMsgToMain', msg)
}

const onMsgFromMain = (callback: Callback): void => {
  ipcRenderer.on('mainMsgToRender', (event: IpcRendererEvent, args: any) => {
    callback(event, args)
  })
}

const offMsgFromMain = (callback: Callback): void => {
  ipcRenderer.removeListener('mainMsgToRender', callback)
}

const renderMsgToRender = (windowName: string, msg: any): void => {
  ipcRenderer.send('renderMsgToRender', {
    windowName,
    msg,
  })
}

const onRenderMsgToRender = (callback: Callback): void => {
  ipcRenderer.on('renderMsgToRender', (event: IpcRendererEvent, args: any) => {
    callback(event, args)
  })
}

export { renderMsgToMain, onMsgFromMain, offMsgFromMain, renderMsgToRender, onRenderMsgToRender }
