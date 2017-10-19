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
      loginUid:'',
      loginUser:'',//登录的用户名
      loginType:'',//登录的类型
      userArea:'',
      userStartArea:'',
      userPhone:'',
      userQQ:'',
      signUpState:'',//登录的角色
      userGroup:'',
      idcardFilled:false,//身份证是否已经填写
      token:'',//token

    },
    actions: actions,
    mutations: {
      changeLogInfo(state,payload){
        // console.log(payload)
        state.logged=!!payload.logged;
        state.loginUid=payload.loginUid;
        state.loginUser=payload.loginUser;
        state.signUpState=payload.signUpState;
        state.loginType=payload.loginType;
        state.userArea=payload.userArea;
        state.userStartArea=payload.userStartArea;
        state.userPhone=payload.userPhone;
        state.userQQ=payload.userQQ;
        state.token=payload.session;
        localStorage.setItem('token',payload.session)
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
        localStorage.setItem('token',token);
      },
      changeIdcardFilled(state,isFilled){
        state.idcardFilled=!!isFilled;
      }
    },
    getters: {}
});
export {store};
export {DispatchActions};
