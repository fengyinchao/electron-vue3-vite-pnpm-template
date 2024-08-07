/*
 * @Description: global type
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
interface Backdoor {
  environment?: string // test or prod
  devtool?: boolean
}

declare global {
  var backdoor: Backdoor
}

export {}
