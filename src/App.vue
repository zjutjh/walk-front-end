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
          let token=localStorage.getItem('token');
          this.$store.dispatch(DispatchActions.GET_USERINFO,{params:{},headers:{'Access-Token':token}}).then(userInfo=>{
//              console.log(response.body)
            this.$store.commit('changeLogInfo',{
              logged:true,
              loginUid:userInfo.body.user.uid||'',
              loginUser:userInfo.body.user.name||'',
              signUpState:userInfo.body.user.status||'',
              loginType:userInfo.body.user.ltype||'',
              userArea:userInfo.body.user.area||'',
              userStartArea:userInfo.body.user.startarea||'',
              userPhone:userInfo.body.user.phone||'',
              userQQ:userInfo.body.user.qq||'',
              session:token||''
            });
            if(userInfo.body.user.idcard){
              this.$store.commit('changeIdcardFilled',true);
            }
            let state=this.$store.state;
            if(state.signUpState!==''&&state.signUpState!='0'){
              this.$store.commit('changeUserGroup',userInfo.body.group);
            }
            this.$toasted.success("登录成功");
          }).catch(response=>{

          })
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
