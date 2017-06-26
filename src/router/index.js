import Vue from 'vue'
import Router from 'vue-router'
import Toasted from 'vue-toasted';


//routers

import routes from './routeDefine.js'
Vue.use(Router)
Vue.use(Toasted, {
  theme: "bubble",
  position: "bottom-center",
  duration : 2000
})
export default new Router({
  mode:'history',
  routes: routes
})
