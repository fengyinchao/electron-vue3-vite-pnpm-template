/*
 * @Description: Generate a UUID version 4.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
export const uuidV4 = function (): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
