/**
 * 公共方法
 */

import _ from 'lodash'

/**
 * 获取session数据
 * @param {String} key 键
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
 * @param {String} key 键
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
 * @param {String} key 键
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

/**
 * 获取客户端环境
 * @returns {Number} 0.浏览器 1.支付宝 2.微信
 */
export function getClientEvn () {
  let userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.indexOf('alipay') > -1) {
    return 1
  } else if (userAgent.indexOf('micromessenger') > -1) {
    return 2
  } else {
    return 0
  }
}

/**
 * 获取用户信息
 */
export function getUserInfo () {
  return getData('userInfo')
}

/**
 * 存储用户信息
 * @param {Object} userInfo
 */
export function setUserInfo (userInfo) {
  setData('userInfo', userInfo)
}
