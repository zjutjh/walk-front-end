/**
 * Created by louyq on 2017/6/19.
 */
import index from '@/components/views/index.vue'
import myWalk from '@/components/views/myWalk.vue'
const routes=[
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: '首页',
      component: index,
      active:false,
    },
    {
      path: '/my-walk',
      name: '我的毅行',
      component: myWalk,
      active:false
    },

];
export default routes;
