/**
 * 权限模块
 */

import request from '@/utils/axios'

/**
 * 获取用户token接口
 * @param {*} data { code, type(1.微信、2.支付宝) }
 */
export function getTokenByCode (data) {
  return request.post('/server/restful/get/token', data)
}

/**
 * 保存用户访问记录接口
 * @param {*} data
 */
export function saveVisitRecord (data) {
  return request.post('/server/restful/saveVisitRecord', data)
}

/**
 * 用户支付接口
 * @param {*} data
 */
export function orderPay (data) {
  return request.post('/server/restful/pay', data)
}

/**
 * 保存用户收货地址接口
 * @param {*} data
 */
export function saveAddress (data) {
  return request.post('/server/restful/saveAddress', data)
}

/**
 * 查看收货地址接口
 * @param {*} data
 */
export function getAddressInfo (data) {
  return request.post('/server/restful/getAddressInfo', data)
}
