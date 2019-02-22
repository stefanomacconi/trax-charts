import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
// import axios from 'axios'
import {routes} from './routes'

// axios.defaults.baseURL = 'http://localhost:8099/'

Vue.use(VueRouter)
Vue.use(BootstrapVue);

const router = new VueRouter({
  // mode: 'history',
  routes
})

Vue.filter('toUpperCase', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase();
})

Vue.filter('toLowerCase', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toLowerCase();
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')