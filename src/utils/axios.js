/**
 * axios拦截器
 */

import axios from 'axios'
// import querystring from 'querystring'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent

  console.log('请求地址:', config.url)
  console.log('请求参数:', config.data)

  // config.transformRequest = [function (data) {
  //   return querystring.stringify(data)
  // }]

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  console.log('返回参数:', response)

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default axios
