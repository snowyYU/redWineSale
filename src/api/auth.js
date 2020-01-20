/**
 * 权限模块
 */

import request from '@/utils/axios'

/**
 * demo
 * @param {*} data
 */
export function demo (data) {
  return request.post('/', data)
}
