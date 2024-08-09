/*
 * @Description: 通用常量定义
 * @Author: Feng Yinchao
 * @Date: 2024-08-08 17:32:00
 */
import { app } from 'electron'
import SystemInformation from 'systeminformation'

const isInDev = (): boolean => {
  // https://github.com/sindresorhus/electron-is-dev/blob/main/index.js
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env
  const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV as string, 10) === 1
  return isEnvSet ? getFromEnv : !app.isPackaged
}

const getArch = (): Arch => {
  let arch: Arch = 'noArch'
  switch (process.arch) {
    case 'x64':
      arch = 'x64'
      break
    case 'arm64':
      arch = 'arm64'
      break
  }
  return arch
}

const getPlatform = (): Platform => {
  let platform: Platform = 'noPlatform'
  switch (process.platform) {
    case 'win32':
      platform = 'windows'
      break
    case 'darwin':
      platform = 'macos'
      break
    case 'linux':
      platform = 'linux'
      break
  }
  return platform
}

const getSystemInformation = async (): Promise<any> => {
  return await SystemInformation.getStaticData()
}

const hasElectron =
  typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron
const hasUserAgent =
  typeof navigator === 'object' &&
  typeof navigator.userAgent === 'string' &&
  navigator.userAgent.indexOf('Electron') >= 0

export const isMain: boolean = hasElectron && !hasUserAgent
export const isRender: boolean = !hasElectron && hasUserAgent
export const isPreload: boolean = hasElectron && hasUserAgent
export const isDev: boolean = isInDev()
export const arch: Arch = getArch()
export const platform: Platform = getPlatform()
export const systemInformation = getSystemInformation()

export const backdoorFileName = 'tutor-electron-student.hjson'
