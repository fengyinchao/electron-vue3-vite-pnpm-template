/*
 * @Description: Window manager
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import { Singleton } from '@common/function/singletonDecorator'
import { getPlatform } from '@main/utils/os'
import type { Module } from '@type/misc'
import { BrowserWindow } from 'electron'
import { join } from 'path'

@Singleton
class WindowManager implements Module {
  private readonly _window: BrowserWindow

  constructor() {
    this._window = new BrowserWindow({
      backgroundColor: '#00000000',
      frame: getPlatform() !== 'windows',
      icon: join(__dirname, '../renderer/assets/icon.png'),
      titleBarOverlay: true,
      // frameless和titleBarStyle: 'hidden'同时开，会显示窗口控制按钮
      titleBarStyle: 'hidden',
      width: 1024,
      height: 768,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        // 编译后的模块仍然是main/index.cjs
        preload: join(__dirname, '../preload/index.cjs'),
        sandbox: true,
        contextIsolation: true,
      },
    })
    if (getPlatform() === 'macos') {
      this._window.setWindowButtonPosition({
        x: 12,
        y: 12,
      })
    }
    if (getPlatform() === 'windows') {
      this._window.setTitleBarOverlay({
        color: '#00000000',
        symbolColor: '#FFFFFF',
      })
    }
  }

  public get name(): string {
    return 'WindowManager'
  }

  public get version(): string {
    return '1.0.0'
  }

  public getWindow(): BrowserWindow {
    return this._window
  }

  public destoryWindow(): void {
    if (this._window !== null) {
      this._window.destroy()
    }
  }
}

export default WindowManager
