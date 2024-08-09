/*
 * @Description: preload.ts
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import { contextBridge } from 'electron'
import { useLoading } from './loading'
import { domReady } from './utils'
import { initExposeInMainWorld } from '@common/index'

const { appendLoading, removeLoading } = useLoading()

;(async () => {
  await domReady()
  appendLoading()
})()

initExposeInMainWorld()

// 将 api 暴露给渲染进程
contextBridge.exposeInMainWorld('removeLoading', removeLoading)
