/*
 * @Description: Create a map by swapping the keys and values of an object.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
type SupportedMapType = string | number
export function createMap(obj: Record<SupportedMapType, SupportedMapType>): Record<SupportedMapType, SupportedMapType> {
  ;(function (obj) {
    for (const [key, value] of Object.entries(obj)) {
      obj[(obj[key] = value)] = key
    }
  })(obj || (obj = {}))
  return obj
}
