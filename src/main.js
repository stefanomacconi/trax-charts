import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import {routes} from './routes'

// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8080/'

Vue.use(VueRouter)
Vue.use(BootstrapVue);

// moment
const moment = require('moment')
require('moment/locale/it')
 
Vue.use(require('vue-moment'), {
    moment
})

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
  router,
  store
}).$mount('#app')