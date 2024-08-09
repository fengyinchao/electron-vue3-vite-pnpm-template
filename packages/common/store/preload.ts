/*
 * @Description: ipc preload
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:42:01
 */
import { ipcRenderer } from 'electron'

const getStoreValue = (key: string) => {
  return ipcRenderer.sendSync('getStoreValue', key)
}

const setStoreValue = (key: string, value: any) => {
  ipcRenderer.send('setStoreValue', key, value)
}

export { getStoreValue, setStoreValue }
