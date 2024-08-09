/*
 * @Description: IPC Renderer
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:41:35
 */
import type { IpcRendererEvent } from 'electron'

type Callback = (event: IpcRendererEvent, args: any) => void

export const renderMsgToMain = <T, U>(msg: T): Promise<U> => {
  return window.electronApi.renderMsgToMain(msg)
}

export const onMsgFromMain = (callback: Callback): void => {
  return window.electronApi.onMsgFromMain(callback)
}

export const offMsgFromMain = (callback: Callback): void => {
  return window.electronApi.offMsgFromMain(callback)
}

export const renderMsgToRender = (windowName: string, msg: any): void => {
  window.electronApi.renderMsgToRender(windowName, msg)
}

export const onRenderMsgToRender = (callback: Callback): void => {
  return window.electronApi.onRenderMsgToRender(callback)
}
