/*
 * @Description: Main component.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import App from '@/App.vue'
import { createApp } from 'vue'
import { info } from 'electron-log'

import './App.scss'
info(`[渲染进程] 渲染进程启动成功`)
const app = createApp(App)
app.mount('#app')

window.removeLoading()
