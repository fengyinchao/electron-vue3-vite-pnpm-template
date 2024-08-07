/*
 * @Description: 通用本地日志服务,基于 electron-log 封装
 * @Author: Feng Yinchao
 * @Date: 2024-08-07 16:07:07
 */
import { app } from 'electron'
import Logger, { error, info, transports } from 'electron-log'
import { existsSync, readdir, unlink } from 'fs-extra'
import { isEmpty } from 'lodash'
import { join } from 'path'
import dayjs from 'dayjs'

const REG_LOG_NAME = /^(\d{4}-\d{2}-\d{2})(\.main|\.renderer|\.shared|\.error)?\.log$/
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7 // ONE WEEK
const TEN_MINUTES = 10 * 60 * 1000 // 10min
const LOG_DIR = join(app.getPath('userData'), 'logs')

let preDay = '-1'
let logTimer: NodeJS.Timeout | null = null

export class LogService {
  static async init() {
    try {
      const nowTime = new Date()
      const biffTime = new Date(nowTime.getTime() + TEN_MINUTES)
      const date = dayjs(biffTime).format('MM-DD')

      if (date !== preDay) {
        await this.initElectronLog(biffTime)
        this.clearOutdatedLogs(biffTime)
      }

      info(`[日志服务] 开启日志计时器, 前一天: ${preDay}, 当前天: ${date}`)
      preDay = date
      logTimer && clearTimeout(logTimer)
      logTimer = setTimeout(() => this.init(), TEN_MINUTES / 2)
    } catch (err) {
      error('[日志服务] 主进程日志初始化失败(init): ', err)
    }
  }

  private static async initElectronLog(nowTime: Date) {
    try {
      const { makeDirectorySync } = await import('make-dir')
      !existsSync(LOG_DIR) && makeDirectorySync(LOG_DIR)
      // 设置 file transport
      transports.file.resolvePathFn = (args: Logger.PathVariables) => {
        return join(LOG_DIR, args.fileName!)
      }
      transports.file.level = 'info'
      transports.file.fileName = dayjs(nowTime).format('YYYY-MM-DD') + '.main.log'
      transports.file.format = '{h}:{i}:{s}:{ms} \t[{level}] \t{text}'
      transports.file.maxSize = 1 << 30 // 1Gb
      // 设置 console transport
      transports.console.format = '{h}:{i}:{s}:{ms} \t[{level}] \t{text}'
      info(`[日志服务] 主进程日志初始化成功，当前日期: ${nowTime.getDate()}`)
    } catch (err) {
      error('[日志服务] 主进程日志初始化失败(initElectronLog): ', err)
    }
  }

  private static async clearOutdatedLogs(nowTime: Date): Promise<void> {
    try {
      /* 有backdoor文件则认为是测试环境，改为缓存一个月 */
      const preserveFactor = !isEmpty(global.backdoor) ? 4 : 1
      const files = await readdir(LOG_DIR)
      files?.forEach(filename => {
        if (
          !REG_LOG_NAME.test(filename) ||
          nowTime.getTime() - new Date(RegExp.$1).getTime() > ONE_WEEK * preserveFactor
        ) {
          unlink(join(LOG_DIR, filename)).catch(e => {
            error('[log] -- unlink: ', e)
          })
        }
      })
    } catch (err) {
      error('[log] -- clearOutdatedLogs: ', err)
    }
  }
}
