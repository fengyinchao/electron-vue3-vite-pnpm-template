/*
 * @Description: 单例模式装饰器
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
export function Singleton<T extends new (...args: any) => any>(C: T): T {
  let instance: T | null = null
  return class extends C {
    constructor(...args: any) {
      if (instance) {
        return instance
      }
      super(...args)
      instance = this as unknown as T
    }
  }
}
