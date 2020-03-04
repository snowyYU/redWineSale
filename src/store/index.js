import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { saveVisitRecord } from '@/api'

import {
  SET_LOCAL_DATA,
  SET_USER_INFO,
  SET_CLIENT_EVN,
  SET_GLOBAL_OVERLAY_DATA,
  SET_ORDER_INFO
} from '@/store/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 本地数据
    localData: {
      // 百度地图ak
      ak: 'GL462DI97QdOB9XRUPiMNfMApebreS5e',
      // 微信appId
      wxAppId: 'wx1d4a1163544ae273',
      // 支付宝appId
      aliAppId: '',
      // 商品名
      name: '拉德斯王菲本顿干红葡萄酒',
      // 剩余时间
      limitTime: moment(moment().add(3, 'd')).format('M月DD日'),
      // 已售比例(%)
      sales: 95,
      // 商品列表
      productList: [
        {
          // 第一款（1瓶）
          id: '1',
          // 原价
          original: 1388,
          // 文案
          label: '1瓶补贴',
          // 现价
          price: 0,
          // 邮费
          postage: 49,
          // 总价
          sum: 49
        },
        {
          // 第二款（2瓶）
          id: '2',
          // 原价
          original: 1388 * 2,
          // 文案
          label: '2瓶补贴',
          // 现价
          price: 69,
          // 邮费
          postage: 0,
          // 总价
          sum: 69
        },
        {
          // 第三款（6瓶）
          id: '3',
          // 原价
          original: 1388 * 6,
          // 文案
          label: '6瓶补贴',
          // 现价
          price: 199,
          // 邮费
          postage: 0,
          // 总价
          sum: 199
        }
      ],
      // 客服电话
      customerServicePhone: '16601300773'
    },
    // 用户信息
    userInfo: {
      // 姓名
      name: '',
      // 电话
      phone: '',
      // 地区
      area: '',
      // 详细地址
      address: ''
    },
    // 浏览器环境
    clientEvn: -1,
    // 全局loading遮罩
    globalOverlayData: {
      isShow: false,
      isTransparent: true
    },
    orderInfo: {}
  },
  mutations: {
    [SET_LOCAL_DATA] (state, localData) {
      state.localData = localData
    },
    [SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
    },
    [SET_CLIENT_EVN] (state, clientEvn) {
      state.clientEvn = clientEvn
    },
    [SET_GLOBAL_OVERLAY_DATA] (state, globalOverlayData) {
      state.globalOverlayData = globalOverlayData
    },
    [SET_ORDER_INFO] (state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  actions: {
    updateLocalData ({ commit }, localData) {
      commit(SET_LOCAL_DATA, localData)
    },
    updateUserInfo ({ commit }, userInfo) {
      commit(SET_USER_INFO, userInfo)
    },
    updateClientEvn ({ commit }, clientEvn) {
      commit(SET_CLIENT_EVN, clientEvn)
    },
    updateGlobalOverlayData ({ commit }, globalOverlayData) {
      commit(SET_GLOBAL_OVERLAY_DATA, globalOverlayData)
    },
    updateOrderInfo ({ commit }, orderInfo) {
      commit(SET_ORDER_INFO, orderInfo)
    },
    saveVisitRecord ({ commit }, obj) {
      saveVisitRecord(obj.data).then(res => {
        if (res.data.code === 200) {
          obj.cb && obj.cb(res)
        } else {
          Vue.prototype.$toast('网络错误')
        }
      })
    }
  },
  modules: {
  }
})
