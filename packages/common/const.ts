/*
 * @Description: 通用常量定义
 * @Author: Feng Yinchao
 * @Date: 2024-08-08 17:32:00
 */
export const hasElectron =
  typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron
export const hasUserAgent =
  typeof navigator === 'object' &&
  typeof navigator.userAgent === 'string' &&
  navigator.userAgent.indexOf('Electron') >= 0

export const isMain: boolean = hasElectron && !hasUserAgent
export const isRender: boolean = !hasElectron && hasUserAgent
export const isPreload: boolean = hasElectron && hasUserAgent
