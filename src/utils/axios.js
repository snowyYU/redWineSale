/**
 * axios拦截器
 */
import Vue from 'vue'
import axios from 'axios'
// import querystring from 'querystring'

const baseURL = process.env.VUE_APP_BASE_URL

const instance = axios.create({
  baseURL
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  _ai_analysis()
  console.log('请求地址:', config.url)
  if (config.params) {
    console.log('请求参数:', config.params)
  } else {
    console.log('请求参数:', config.data)
  }

  // config.transformRequest = [function (data) {
  //   return querystring.stringify(data)
  // }]

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  console.log('返回参数:', response)

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Vue.prototype.$toast('网络错误')
  return Promise.reject(error)
})

export default instance
