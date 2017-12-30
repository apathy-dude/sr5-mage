import 'babel-polyfill'
import './object'
import 'vuetify/dist/vuetify.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import { ComponentOptions } from 'vue/types/options'

import store from './store/index'
import router from './router/index'

Vue.use(Vuetify)

const app = new Vue({
  el: '#app',
  store,
  router,
  template: '<app></app>',
  components: {
    app: App as ComponentOptions<Vue>
  }
})
