import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import {
  SET_LOCAL_DATA,
  SET_USER_INFO,
  SET_PROGRESS_BOX_SHOW
} from '@/store/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 本地数据
    localData: {
      // 商品名
      name: '和平鸽干红葡萄酒',
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
          original: 680,
          // 文案
          label: '1瓶价格',
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
          original: 680 * 2,
          // 文案
          label: '2瓶补贴价',
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
          original: 680 * 6,
          // 文案
          label: '6瓶补贴价',
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
    progressBoxShow: false
  },
  mutations: {
    [SET_LOCAL_DATA] (state, localData) {
      state.localData = localData
    },
    [SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
    },
    [SET_PROGRESS_BOX_SHOW] (state, progressBoxShow) {
      state.progressBoxShow = progressBoxShow
    }
  },
  actions: {
    updateLocalData ({ commit }, localData) {
      commit(SET_LOCAL_DATA, localData)
    },
    updateUserInfo ({ commit }, userInfo) {
      commit(SET_USER_INFO, userInfo)
    },
    updateProgressBoxShow ({ commit }, progressBoxShow) {
      commit(SET_PROGRESS_BOX_SHOW, progressBoxShow)
    }
  },
  modules: {
  }
})
