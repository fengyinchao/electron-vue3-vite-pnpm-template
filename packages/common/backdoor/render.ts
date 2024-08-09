/*
 * @Description: render api
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 15:06:42
 */
export const getBackdoorConfig = (): Backdoor => {
  return window.electronApi.getBackdoorConfigFromMain()
}
