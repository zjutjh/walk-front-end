// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './vendor.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import vMediaQuery from 'v-media-query'
import 'muse-ui/dist/muse-ui.css'
import './less/theme.less'
Vue.use(vMediaQuery);
import {store} from './store'


// import 'muse-ui/dist/theme-carbon.css'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
