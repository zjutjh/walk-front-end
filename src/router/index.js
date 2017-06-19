import Vue from 'vue'
import Router from 'vue-router'

//routers

import routes from './routeDefine.js'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: routes
})
