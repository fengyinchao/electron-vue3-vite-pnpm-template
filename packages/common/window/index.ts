/*
 * @Description: window manager
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 10:16:15
 */

import { BrowserWindow } from 'electron'

const windows = new Map<string, Electron.BrowserWindow>()

function createWindow(
  name: string,
  options: Electron.BrowserWindowConstructorOptions,
): Electron.CrossProcessExports.BrowserWindow {
  if (hasWindow(name)) {
    console.warn('has same name window')
    return getWindow(name)
  } else {
    const win = new BrowserWindow(options)
    windows.set(name, win)
    return win
  }
}

function getWindow(name: string): Electron.CrossProcessExports.BrowserWindow {
  return windows.get(name)!
}

function destroyWindow(name: string): void {
  const win = getWindow(name)
  if (win) {
    win.destroy()
    windows.delete(name)
  }
}

function getAllWindows(): Array<Electron.CrossProcessExports.BrowserWindow> {
  return Array.from(windows.values())
}

function hasWindow(name: string): boolean {
  return windows.has(name)
}

function clearWindows(): void {
  for (const key in windows) {
    destroyWindow(key)
  }
  windows.clear()
}

function showWindow(name: string = 'main'): void {
  const win = getWindow(name)
  if (win && win.show) {
    win.show()
    if (win && win.center) {
      win.center()
    }
  } else {
    console.error('showWindow', 'no windowInstance')
  }
}

export { createWindow, getWindow, destroyWindow, getAllWindows, hasWindow, clearWindows, showWindow }
