/*
 * @Description: 通用后门服务,仅用于开发提效,请勿在生产环境中使用
 * @Author: Feng Yinchao
 * @Date: 2024-08-07 16:07:07
 */

import { type Backdoor } from '@common/types/global'
import { app } from 'electron'
import { join } from 'path'
import { parse as parseHjson } from 'hjson'
import { readFileSync } from 'fs-extra'
import { error, info } from 'electron-log'
import { backdoorFileName } from '@common/const'

export class BackDoorService {
  static async init() {
    try {
      global.backdoor = await this.getBackdoorConfig()
      info(`[后门服务] 后门服务初始化成功:`, global.backdoor)
    } catch (err) {
      error('[后门服务] 主进程后门服务初始化失败: ', err)
    }
  }

  static async getBackdoorConfig(): Promise<Backdoor> {
    try {
      const path = app.getPath('desktop')
      return parseHjson(readFileSync(join(path, backdoorFileName), { encoding: 'utf-8' }).trim()) || {}
    } catch (e) {
      return {}
    }
  }
}
