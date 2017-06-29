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
      logged:false,
      loginUser:'',
      loginType:'',
      signUpState:'',
      idcardFilled:false,
      token:sessionStorage.getItem('token')||'',

    },
    actions: actions,
    mutations: {
      changeLogInfo(state,payload){
        // console.log(payload)
        state.logged=!!payload.logged;
        state.loginUser=payload.loginUser;
        state.signUpState=payload.signUpState;
        state.loginType=payload.loginType;
        sessionStorage.setItem('token',payload.session)
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
