<template>
  <mu-appbar>
    <h1 slot="left"><router-link tag="a" class="navbar-logo-link" to="/index">毅行|{{pageName||'首页'}}</router-link></h1>
    <router-link v-for="item in nbButGroup" v-if="item.name!==undefined" :key="item.name"  :class="{active:item.active,'navbar-link':true}" tag="mu-flat-button" v-text="item.name" :to="item.path" slot="right"></router-link>
    <template v-if="logged">
      <mu-flat-button :label="loginUserName" @click="unlogin" slot="right"/>
    </template>
    <template v-else>
      <mu-flat-button label="登录" @click="loginDialogVisible=true" slot="right"/>
      <login-dialog :show-login-dialog.sync="loginDialogVisible"></login-dialog>
    </template>

  </mu-appbar>
</template>
<script>
//  import MuBottomNav from "../../node_modules/muse-ui/src/bottomNav/bottomNav";
  import LoginDialog from "./loginDialog.vue";
  import routes from "../router/routeDefine.js"
  export default{
    components: {
        LoginDialog
    },
    name:'NavBar',

      data(){
          return{
            nbButGroup:routes,
            pageName:'',
            loginDialogVisible:false,
            logged:false,
            loginUserName:''

          }
      },
      methods:{
          setActive(route){
            let routeName=route.path;
//            console.log(route)
            let nbg=this.nbButGroup;
            for(let i in nbg){
              if(nbg[i].path===routeName){
                nbg[i].active=true;
                this.pageName=nbg[i].name;
              }else{
                nbg[i].active=false;
              }
            }
          },
          testLogin(){
              this.logged=this.$store.state.logged;
              this.loginUserName=this.$store.state.loginUser;
          },
        dialogClosed(){
//              console.log('closed');
              this.loginDialogVisible=false;
        },

        unlogin(){
            let canUnlogin=confirm('确定要退出登录吗');
            if(canUnlogin){
              this.$store.commit('changeLogInfo',{
                  logged:false,
                loginUser:'',
                signUpState:''
              });

            }

        }

      },
      mounted:function () {
        this.setActive(this.$route);
        this.testLogin();
      },
      computed:{
        getLogInfo() {
          return this.$store.state.logged;
        }
      },
      watch:{
          $route(route){
            this.setActive(route)
          },
          getLogInfo(val){
              this.logged=!!val;
              this.testLogin();
          }
      }

  }
</script>
