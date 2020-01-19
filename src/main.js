import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import directives from './directives'
import Vue2TouchEvents from 'vue2-touch-events'
import { Button, Popup, Progress, Cell, CellGroup, Field, AddressEdit, Toast, Area } from 'vant'

Vue.use(Button).use(Popup).use(Progress).use(Cell).use(CellGroup).use(Field).use(AddressEdit).use(Toast).use(Area)
Vue.use(Vue2TouchEvents)
// Vue.use(directives)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
