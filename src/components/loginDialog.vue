<template>
  <mu-dialog :open="loginDialogVisible"  title="登录">
    <div slot="default">
      <form v-if="!logging">
        <mu-text-field v-model="loginForm.username" class="full-width" :errorText="loginFormError.username" label="精弘通行证帐号" hintText="请输入帐号"/>
        <br/>
        <mu-text-field v-model="loginForm.password" type="password" :errorText="loginFormError.password" class="full-width" label="密码" hintText="请输入密码"/>
      </form>
      <div v-else class="text-center">
        <mu-circular-progress :size="90"/>
        <p>登录中...</p>
      </div>

    </div>
    <div slot="actions" v-if="!logging">
      <mu-flat-button label="取消" class="dialog-button" @click="loginDialogClose"/>
      <mu-raised-button label="登录" class="dialog-button" @click="login"  primary/>
    </div>

  </mu-dialog>
</template>
<script>
  import {DispatchActions} from '../store/';

  export default{
      name:"LoginDialog",
      props:['showLoginDialog'],
      components:{

      },
      data(){
          return{
            loginForm:{
              username:'',
              password:''
            },
            loginFormError:{
              username:'',
              password:'',
            },
            loginDialogVisible:false,
            logging:false,
          }
      },
      methods:{
        loginDialogClose(){
          this.loginDialogVisible=false;
//          this.$emit('closed');
          this.$emit('update:showLoginDialog', false)
        },
        login(){
            let lForm=this.loginForm;
            let vaild=false;
            for(let item in lForm){
                if(lForm[item]===''){
                    this.loginFormError[item]="该项不得为空";
                    vaild=true;
                }else{
                  this.loginFormError[item]="";
                }
            }
            if(vaild)return;
            this.logging=true;
            this.$store.dispatch(DispatchActions.POST_LOGIN,{
                params:{
                    uid:this.loginForm.username,
                    password:this.loginForm.password
                }
            }).then(response=>{
//                console.log(response.body);

//                this.$store.state.logged=true;
//                this.$store.state.loginUser=response.body.data.accountName;
                  this.$store.dispatch(DispatchActions.GET_USERINFO,{params:{},headers:{'Access-Token':response.body.token}}).then(userInfo=>{
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
                    session:response.body.token||''
                  });
                  if(userInfo.body.user.idcard){
                    this.$store.commit('changeIdcardFilled',true);
                  }
                  let state=this.$store.state;
                  if(state.signUpState!==''&&state.signUpState!='0'){
                    this.$store.commit('changeUserGroup',userInfo.body.group);
                  }

                  this.loginDialogClose();
                  this.$toasted.success("登录成功");
                  this.logging=false;
                })

            }).catch(response=>{
              this.logging=false;
            });
        }
      },
      watch:{
          showLoginDialog(val){
              this.loginDialogVisible=!!val;
          }
      }
  }
</script>
