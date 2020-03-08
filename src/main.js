import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/style.scss'
// Vant组件
import { Button, Popup, Progress, Cell, CellGroup, Field, AddressEdit, Toast, Area, Loading, Image, SubmitBar, NumberKeyboard, RadioGroup, Radio, Icon, Lazyload, Overlay } from 'vant'
// 复制到剪贴板
import VueClipboard from 'vue-clipboard2'
import vconsole from 'vconsole'

new vconsole()
Vue.use(VueClipboard)
Vue.use(Button).use(Popup).use(Progress).use(Cell).use(CellGroup).use(Field).use(AddressEdit).use(Toast).use(Area).use(Loading).use(Image).use(SubmitBar).use(NumberKeyboard).use(RadioGroup).use(Radio).use(Icon).use(Lazyload).use(Overlay)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
