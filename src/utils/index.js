/**
 * 公共方法
 */

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

/**
 * 获取session数据
 * @param {String} key 键
 */
export function getData (key) {
  return sessionStorage.getItem(key)
}

/**
 * 存储session数据
 * @param {String} key 键
 * @param {*} val 值
 */
export function setData (key, val) {
  sessionStorage.setItem(key, val)
}

/**
 * 删除session数据
 * @param {String} key 键
 */
export function removeData (key) {
  sessionStorage.removeItem(key)
}

/**
 * 清空session数据
 */
export function clearData () {
  sessionStorage.clear()
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
  return JSON.parse(getData('userInfo'))
}

/**
 * 存储用户信息
 * @param {Object} userInfo
 */
export function setUserInfo (userInfo) {
  setData('userInfo', JSON.stringify(userInfo))
}

/**
 * 获取订单信息
 */
export function getOrderInfo () {
  return JSON.parse(getData('orderInfo'))
}

/**
 * 存储订单信息
 * @param {Object} orderInfo
 */
export function setOrderInfo (orderInfo) {
  setData('orderInfo', JSON.stringify(orderInfo))
}

/**
 * 获取当前url参数值
 * @param {*} query
 * @param {*} _url
 */
export function getUrlParams (query, _url) {
  const url = _url || window.location.href
  const paramsString = url.indexOf('?') > -1 ? url.substring(url.indexOf('?') + 1, url.length).split('&') : []
  let paramsObj = {}
  paramsString.forEach((item, index) => {
    paramsObj[item.substring(0, item.indexOf('='))] = item.substring(item.indexOf('=') + 1, item.length).split('#')[0]
  })

  if (Object.prototype.toString.call(query).slice(8, -1) === 'Array') {
    return paramsObj
  }

  const returnValue = paramsObj[query]

  if (typeof (returnValue) === 'undefined') {
    return ''
  } else {
    return returnValue
  }
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
 * 生成Token
 */
export function buildToken () {
  return uuidv4()
}

// 将区域数据结构化
export function areaStringify (province, city, area) {
  if (province === city) {
    return `${province}/${area}`
  }
  return `${province}/${city}/${area}`
}

// 解析区域数据
export function areaParse (area) {
  let arr = area.split('/')
  if (_.isEmpty(arr[2])) {
    arr.splice(1, 0, arr[0])
  }
  return {
    province: arr[0],
    city: arr[1],
    area: arr[2]
  }
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
  location.href = url + '?' + queryString
}

/**
 * 获取不带参数的url
 */
export function getUrl () {
  let url = location.href
  return url.split('?')[0]
}

/**
 * 微信jsSDK配置
 * @param {*} timestamp 生成签名的时间戳
 * @param {*} nonceStr 生成签名的随机串
 * @param {*} signature 签名
 */
export function wxConfig (appId, timestamp, nonceStr, signature) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp,
    nonceStr,
    signature,
    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
  })
}

/**
 * config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
 * @param {*} cb
 */
export function wxReady (cb) {
  wx.ready(cb)
}

/**
 * config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
 */
export function wxError (cb) {
  wx.error(cb)
}

/**
 * 微信jsSDK支付
 * @param {*} obj
 */
export function wxChooseWXPay (obj) {
  return new Promise((resolve) => {
    wx.chooseWXPay({
      timestamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.packageValue,
      signType: obj.signType,
      paySign: obj.paySign,
      success: function (res) {
        resolve(res)
      }
    })
  })
}

/**
 * 支付宝jsSDK支付
 * @param {*} obj
 */
export function aliTradePay (obj) {
  return ap.tradePay({ obj })
}
