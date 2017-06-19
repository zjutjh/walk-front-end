/**
 * Created by louyq on 2017/6/19.
 */
const routes=[
  {
    path:'/',
    redirect:'/index'
  },
  {

    name: '首页',
    active:false,
    subMenu:[{
        name:'aaa',
        subMenu:[
          {name:'ccc',
            path: '/index',

          }
        ]
      },{
        name:'bbb',
      path: '/index',
      }]
  },
  {
    path: '/my-walk',
    name: '我的毅行',
    active:false
  }
];
export default routes;
