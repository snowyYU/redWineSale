/**
 * 公共方法
 */

import _ from 'lodash'

/**
 * 获取session数据
 * @param {*} key 键
 */
export function getData (key) {
  if (_.isEmpty(key)) {
    console.error('参数不能为空')
    return ''
  }
  let val = sessionStorage.getItem(key)
  if (_.isEmpty(val)) {
    return val
  }
  return JSON.parse(val)
}

/**
 * 存储session数据(单独一个Number类型的0需要转为String类型存储)
 * @param {*} key 键
 * @param {*} val 值
 */
export function setData (key, val) {
  if (_.isEmpty(key)) {
    console.error('key不能为空')
    return false
  }
  if (_.isEmpty(val)) {
    console.error('val不能为空')
    return false
  }
  sessionStorage.setItem(key, JSON.stringify(val))
  return true
}

/**
 * 删除session数据
 * @param {*} key 键
 */
export function removeData (key) {
  if (_.isEmpty(key)) {
    console.error('key不能为空')
    return false
  }
  sessionStorage.removeItem(key)
  return true
}

/**
 * 清空session数据
 */
export function clearData () {
  sessionStorage.clear()
  return true
}
