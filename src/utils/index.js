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
 * @returns {Number} 0.浏览器 1.微信 2.支付宝
 */
export function getClientEvn () {
  let userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.indexOf('micromessenger') > -1) {
    return 1
  } else if (userAgent.indexOf('alipay') > -1) {
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

/**
 * 获取Token
 */
export function getToken () {
  return sessionStorage.getItem('token')
}

/**
 * 存储Token
 * @param {*} token
 */
export function setToken (token) {
  sessionStorage.setItem('token', token)
}

/**
 * 微信获取code
 * 需要保证参数顺序
 * @param {*} appid
 * @param {*} redirect_uri
 * @param {*} response_type code
 * @param {*} scope 1.snsapi_base 2.snsapi_userinfo
 * @param {*} state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
 */
export function wechatAuth (appId, redirectUri, responseType, scope, state) {
  let url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  let queryString = 'appid=' + appId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=' + responseType + '&scope=' + scope + '&state=' + state

  // let params = {
  //   appid: appId,
  //   redirect_uri: encodeURIComponent(redirectUri),
  //   response_type: responseType,
  //   scope,
  //   state
  // }

  // let queryString = Object.keys(params).map(key => {
  //   return key + '=' + params[key]
  // }).join('&')

  location.href = url + '?' + queryString + '#wechat_redirect'
}

/**
 * 支付宝获取code
 * @param {*} app_id
 * @param {*} scope 1.auth_base 2.auth_user
 * @param {*} redirect_uri
 * @param {*} state
 */
export function alipayAuth (appId, scope, redirectUri, state) {
  let url = 'https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm'
  let queryString = 'app_id=' + appId + '&scope=' + scope + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&state=' + state

  // let params = {
  //   app_id: appId,
  //   scope,
  //   redirect_uri: encodeURIComponent(redirectUri),
  //   state
  // }

  // let queryString = Object.keys(params).map(key => {
  //   return key + '=' + params[key]
  // }).join('&')

  location.href = url + '?' + queryString
}

/**
 * 获取不带参数的url
 */
export function getUrl () {
  let url = location.href
  return url.split('?')[0]
}
