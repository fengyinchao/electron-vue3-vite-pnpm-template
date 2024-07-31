/*
 * @Description: global type
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import type { BaseServiceKey } from '@types/service'

export {}

declare global {
  var baseServices: Recrod<BaseServiceKey, any>
  var main: IpcMainHandleEventCalleeProxy
}
