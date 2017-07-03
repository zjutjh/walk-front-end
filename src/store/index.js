/**
 * Created by fuzl on 2017/3/4.
 */
import Vuex from 'vuex'
import apis from "./api";

// 只有action的store，目前只用来管理api
let actions = {};
// DispatchName，分发路径的名称
const DispatchActions = {};
for (let actionName in apis) {
    DispatchActions[actionName] = actionName;
    actions[actionName] = apis[actionName];
}
const store = new Vuex.Store({
    state: {
      logged:false,//是否登录
      loginUser:'',//登录的用户名
      loginType:'',//登录的类型
      userArea:'',
      userStartArea:'',
      signUpState:'',//登录的角色
      userGroup:'',
      idcardFilled:false,//身份证是否已经填写
      token:sessionStorage.getItem('token')||'',//token

    },
    actions: actions,
    mutations: {
      changeLogInfo(state,payload){
        // console.log(payload)
        state.logged=!!payload.logged;
        state.loginUser=payload.loginUser;
        state.signUpState=payload.signUpState;
        state.loginType=payload.loginType;
        state.userArea=payload.userArea;
        state.userStartArea=payload.userStartArea;
        sessionStorage.setItem('token',payload.session)
      },
      logOut(state){
        let setFalse=['logged','idcardFilled'];
        for(let i in state){
          state[i]='';
        }
        setFalse.each(function (name) {
          state[name]=false;
        })
      },
      changeUserGroup(state,groupId){
        state.userGroup=groupId;
      },
      changeSignUpState(state,signUpState){
        state.signUpState=signUpState;
      },
      changeToken(state,token){
        state.token=token;
        sessionStorage.setItem('token',token);
      },
      changeIdcardFilled(state,isFilled){
        state.idcardFilled=!!isFilled;
      }
    },
    getters: {}
});
export {store};
export {DispatchActions};
