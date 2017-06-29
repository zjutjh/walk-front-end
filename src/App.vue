<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="main">
      <router-view></router-view>
    </div>
    <m-footer></m-footer>
  </div>
</template>
<style scoped>
  .mu-appbar{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9998;
  }
  #app{
    position: relative;
  }
  div[class='main']{
    margin-top: 64px;
    margin-bottom: 0px;
  }

</style>
<script>
  import NavBar from './components/navbar.vue';
  import MFooter from './components/footer.vue'
  import {DispatchActions} from './store/'
  export default {
    name: 'app',
    data(){
      return {

      }
    },
    methods:{
      testLogin(){
          this.$store.dispatch(DispatchActions.GET_ISLOGIN).then(response=>{
              console.log(response.body)
            this.$store.commit('changeLogInfo',{logged:true,
              loginUser:response.body.data.accountName,
              signUpState:response.body.data.state,
              loginType:response.body.data.type,
              session:response.body.data.session
            });
            this.$toasted.success("登录成功");
          }).catch()
      }
    },
    watch:{

    },
    mounted:function () {
     this.testLogin();
    },
    components:{
      NavBar,
      MFooter
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
