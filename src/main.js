import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'

import store from '@/store/store'
import Panel from '@/components/globals/Panel'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = true
Vue.use(Vuetify)
Vue.component('panel', Panel)

sync(store, router)

export default new Vuetify({
  theme: {
    dark: true
  }
})

new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify(),
  template: '<App/>',
  components: { App }
})
