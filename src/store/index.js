import Vue from 'vue'
import Vuex from 'vuex'

import {
  SET_CLIENT_DATA
} from '@/store/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientData: {},
    customerServicePhone: '16601300773'
  },
  mutations: {
    [SET_CLIENT_DATA] (state, clientData) {
      state.clientData = clientData
    }
  },
  actions: {
    updateClientData ({ commit }, clientData) {
      commit(SET_CLIENT_DATA, clientData)
    }
  },
  modules: {
  }
})
