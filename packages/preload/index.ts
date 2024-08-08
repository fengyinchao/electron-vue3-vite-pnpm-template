/*
 * @Description: preload.ts
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import { contextBridge, ipcRenderer } from 'electron'
import { type ElectronAPI } from '@common-types/global'
import { useLoading } from './loading'
import { domReady } from './utils'

const { appendLoading, removeLoading } = useLoading()

;(async () => {
  await domReady()
  appendLoading()
})()

// 使用 contextBridge 暴露 API
const api: ElectronAPI = {
  sendMessage: (channel, data) => {
    // 只允许特定的频道
    ipcRenderer.send(channel, data)
  },
  receiveMessage: (channel, func) => {
    // 只允许特定的频道
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  },
}

// 将 api 暴露给渲染进程
contextBridge.exposeInMainWorld('electronApi', api)
contextBridge.exposeInMainWorld('removeLoading', removeLoading)
