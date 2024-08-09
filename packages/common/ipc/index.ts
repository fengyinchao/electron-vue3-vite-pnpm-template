/*
 * @Description: ipc 基础封装
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:40:50
 */
import { isRender } from '@common/const'
import {
  offMsgFromMain as renderOffMsgFromMain,
  onMsgFromMain as renderOnMsgFromMain,
  onRenderMsgToRender as renderOnRenderMsgToRender,
  renderMsgToMain as renderRenderMsgToMain,
  renderMsgToRender as renderRenderMsgToRender,
} from '@common/ipc/render'
import {
  offMsgFromMain as preloadOffMsgFromMain,
  onMsgFromMain as preloadOnMsgFromMain,
  onRenderMsgToRender as preloadOnRenderMsgToRender,
  renderMsgToMain as preloadRenderMsgToMain,
  renderMsgToRender as preloadRenderMsgToRender,
} from '@common/ipc/preload'

export * from '@common/ipc/main'

export const sendMsgToMain = isRender ? renderRenderMsgToMain : preloadRenderMsgToMain
export const onMsgFromMain = isRender ? renderOnMsgFromMain : preloadOnMsgFromMain
export const offMsgFromMain = isRender ? renderOffMsgFromMain : preloadOffMsgFromMain

export const sendMsgToOtherRender = isRender ? renderRenderMsgToRender : preloadRenderMsgToRender
export const onMsgFormOtherRender = isRender ? renderOnRenderMsgToRender : preloadOnRenderMsgToRender
