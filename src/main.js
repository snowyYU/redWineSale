import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import directives from './directives'
import './assets/style.scss'
import vconsole from 'vconsole'
import Vue2TouchEvents from 'vue2-touch-events'
import { Button, Popup, Progress, Cell, CellGroup, Field, AddressEdit, Toast, Area, Loading, Image, SubmitBar, NumberKeyboard, RadioGroup, Radio, Icon } from 'vant'

new vconsole()

Vue.use(Button).use(Popup).use(Progress).use(Cell).use(CellGroup).use(Field).use(AddressEdit).use(Toast).use(Area).use(Loading).use(Image).use(SubmitBar).use(NumberKeyboard).use(RadioGroup).use(Radio).use(Icon)
Vue.use(Vue2TouchEvents)
// Vue.use(directives)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
