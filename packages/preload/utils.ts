/*
 * @Description: Utils component.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
/** docoment ready */
export function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}
