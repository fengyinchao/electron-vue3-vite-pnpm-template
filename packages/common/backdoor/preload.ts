/*
 * @Description: ipc preload
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:42:01
 */
import { ipcRenderer } from 'electron'

const getBackdoorConfigFromMain = () => {
  return ipcRenderer.sendSync('getBackdoorConfig')
}

export { getBackdoorConfigFromMain }
