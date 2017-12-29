import 'babel-polyfill'
import './object'
import 'vuetify/dist/vuetify.css'
import Vue, { ComponentOptions } from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import store from './store/index'
import router from './router/index'

Vue.use(Vuetify)

const app = new Vue({
  el: '#app',
  store,
  router,
  ...(App as ComponentOptions<Vue>)
})

export { app, router, store }
