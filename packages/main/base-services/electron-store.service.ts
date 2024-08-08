/*
 * @Description: 通用存储服务, 用于管理应用程序的持久化数据
 * @Author: Feng Yinchao
 * @Date: 2024-08-07 16:07:07
 */

import type ElectronStore from 'electron-store'
import { error, info } from 'electron-log'
import { ipcMain } from 'electron'

interface StoreData {
  login: boolean
  userInfo: {
    username: string
    password: string
    token: string
  } | null
}

export class ElectronStoreService {
  private static storeInstance: ElectronStore<StoreData>

  static async init() {
    const Store = (await import('electron-store')).default
    try {
      this.storeInstance = new Store<StoreData>({
        name: 'tutor-electron-student',
        defaults: {
          login: true,
          userInfo: null,
        },
      })
      info('[存储服务] 存储服务初始化成功')
    } catch (err) {
      error('[存储服务] 存储服务初始化失败: ', err)
    }

    // 定义ipcRenderer监听事件
    ipcMain.on('setStore', (_, key, value) => {
      this.storeInstance.set(key, value)
    })

    ipcMain.on('getStore', (_, key) => {
      const value = this.storeInstance.get(key)
      _.returnValue = value || ''
    })
  }

  static setItem(key: string, value: any) {
    try {
      this.storeInstance.set(key, value)
      info(`[存储服务] 设置项成功: ${key}`)
    } catch (err) {
      error(`[存储服务] 设置项失败: ${key}, 错误: `, err)
    }
  }

  static getItem(key: keyof StoreData): any {
    try {
      const value = this.storeInstance.get(key)
      info(`[存储服务] 获取项成功: ${key}`)
      return value
    } catch (err) {
      error(`[存储服务] 获取项失败: ${key}, 错误: `, err)
      return null
    }
  }

  static deleteItem(key: keyof StoreData) {
    try {
      this.storeInstance.delete(key)
      info(`[存储服务] 删除项成功: ${key}`)
    } catch (err) {
      error(`[存储服务] 删除项失败: ${key}, 错误: `, err)
    }
  }

  static clear() {
    try {
      this.storeInstance.clear()
      info('[存储服务] 清空所有项成功')
    } catch (err) {
      error('[存储服务] 清空所有项失败: ', err)
    }
  }
}
