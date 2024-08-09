/*
 * @Description: common types
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
export interface Backdoor {
  environment?: string // test or prod
  devtool?: boolean
}

export interface ElectronAPI {
  sendMessage: (channel: string, data: any) => void
  receiveMessage: (channel: string, func: (...data: any) => void) => void
  getStoreValue: (key: string) => any
  setStoreValue: (key: string, value: any) => void

  renderMsgToMain: (key: any) => any
  onMsgFromMain: (callback: (event: any, args: any) => void) => void
  offMsgFromMain: (callback: (event: any, args: any) => void) => void
  renderMsgToRender: (windowName: string, msg: any) => void
  onRenderMsgToRender: (callback: (event: any, args: any) => void) => void
}

declare global {
  // 主进程使用
  var backdoor: Backdoor
  // 渲染进程使用
  var electronApi: ElectronAPI
  var removeLoading: () => void
}

export {}