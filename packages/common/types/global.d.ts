/*
 * @Description: global types
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */

declare global {
  // 主进程使用
  var backdoor: Backdoor
  // 渲染进程使用
  var electronApi: ElectronAPI
  var removeLoading: () => void
}

export {}
