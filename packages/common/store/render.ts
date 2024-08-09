/*
 * @Description: render api
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 15:06:42
 */
export const getStoreFormMain = (key: string): void => {
  return window.electronApi.getStoreValue(key)
}

export const setStoreFromMain = (key: string, value: any): void => {
  window.electronApi.setStoreValue(key, value)
}
