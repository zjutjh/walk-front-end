<template>
  <mu-appbar>
    <h1 slot="left">毅行|{{pageName||'首页'}}</h1>
    <router-link v-for="item in nbButGroup" :key="item.label"  :class="{active:item.active,'navbar-link':true}" tag="mu-flat-button" v-text="item.label" :to="item.href" slot="right"></router-link>

  </mu-appbar>
</template>
<script>
  export default{
      name:'NavBar',
      data(){
          return{
            nbButGroup:[
              {
                  label:'首页',
                  href:'/index',
                  active:false,
              },
              {
                label:'我的毅行',
                href:'/my-walk',
                active:false,
              }
            ],
            pageName:''
          }
      },
      methods:{
          setActive(route){
            let routeName=route.path;
            console.log(route)
            let nbg=this.nbButGroup;
            for(let i in nbg){
              if(nbg[i].href===routeName){
                nbg[i].active=true;
                this.pageName=nbg[i].label;
              }else{
                nbg[i].active=false;
              }
            }
          }
      },
      mounted:function () {
        this.setActive(this.$route)
      },
      watch:{
          $route(route){
            this.setActive(route)
          }
      }

  }
</script>
