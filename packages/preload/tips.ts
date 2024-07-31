/*
 * @Description: Tips component.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import _ from 'lodash'

const tips = ['你知道吗? MAA 是 MAA Assistant Arknights 的简称', '牛牛喝酒!', '冷知识: 慕斯有两条尾巴']

export function getTip() {
  return _.shuffle(tips)[0]
}
