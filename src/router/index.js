import Vue from 'vue'
import Router from 'vue-router'

//routers
import index from '@/components/views/index.vue'
import myWalk from '@/components/views/myWalk.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: '首页',
      component: index
    },
    {
      path: '/my-walk',
      name: '我的毅行',
      component: myWalk
    }
  ]
})
