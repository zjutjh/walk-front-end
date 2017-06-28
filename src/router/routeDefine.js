/**
 * Created by louyq on 2017/6/19.
 */
const index = r=>  require.ensure([],()=>r(require('@/components/views/index.vue')));
const myWalk = r=>  require.ensure([],()=>r(require('@/components/views/myWalk.vue')));
// import index from '@/components/views/index.vue';
// import myWalk from '@/components/views/myWalk.vue';
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
    {
      path:'*',
      component:index,
    }

];
export default routes;
