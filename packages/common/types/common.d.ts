/*
 * @Description: Image component.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
declare module '*.png' {
  const src: string
  export default src
}

interface StoreData {
  login: boolean
  userInfo: {
    username: string
    password: string
    token: string
  } | null
}

interface Backdoor {
  environment?: string // test or prod
  devtool?: boolean
}

interface ElectronAPI {
  getStoreValue: (key: string) => any
  setStoreValue: (key: string, value: any) => void

  renderMsgToMain: (key: any) => any
  onMsgFromMain: (callback: (event: any, args: any) => void) => void
  offMsgFromMain: (callback: (event: any, args: any) => void) => void
  renderMsgToRender: (windowName: string, msg: any) => void
  onRenderMsgToRender: (callback: (event: any, args: any) => void) => void

  getBackdoorConfigFromMain: () => Backdoor
}

type Arch = 'noArch' | 'x64' | 'arm64'
type Platform = 'windows' | 'linux' | 'macos' | 'noPlatform'
