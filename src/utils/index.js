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

/**
 * 微信jsSDK配置
 * @param {*} timestamp 生成签名的时间戳
 * @param {*} nonceStr 生成签名的随机串
 * @param {*} signature 签名
 */
export function wxConfig (appId, timestamp, nonceStr, signature) {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
