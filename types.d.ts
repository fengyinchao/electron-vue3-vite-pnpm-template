/*
 * @Description: 全局类型声明
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:55:57
 */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}
