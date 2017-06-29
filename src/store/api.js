/**
 * Created by fuzl on 2017/3/4.
 * 所有的请求地址
 */
import Vue from 'vue'
import './http'
var fetchApis = {};
var requestUrl="http://localhost:3000";
const APIS = {
    GET_ISLOGIN:'/my-walk/account',
    GET_YXNUM:'',
    GET_LOGIN:'/my-walk/login',
    GET_GROUP:'/my-walk/group',
};
const noNeedTokenList=['get_login','get_islogin'];
const postPrefix = ['post', 'save', 'delete'];
//将需要post的api写上post即可
function isPostAction(key) {
    key = key.toLowerCase();
    return postPrefix.some(function (action) {
        return key.indexOf(action) == 0;
    });
}

function isNoNeedToken(key){
    key=key.toLowerCase();
    return noNeedTokenList.some(function (action) {
      return key===action;
    })
}
const vueInstance = new Vue;
for (let action in APIS) {
    let isPost = isPostAction(action);
    let token=sessionStorage.getItem('token')||'';
    let defaultQuery = {
        body  : {},
        params: {token:token}
    };
    fetchApis[action] = function (store, queryData = defaultQuery) {
        // get请求{params: {}} post请求{body:{}}
        if(queryData.params['token']===undefined){
          queryData.params['token']=defaultQuery.params.token;
        }
        if(!isNoNeedToken(action)){
          if(!sessionStorage.getItem('token')){
            alert('登录已经过期，请重新登录');
            return;
          }
        }
        let copy4PostQuery = Object.assign({}, queryData);
        copy4PostQuery.params = {};
        var args = [].concat(isPost ? [queryData.params, copy4PostQuery] : queryData);
        var promise = vueInstance.$http[isPost ? 'post' : 'get'](requestUrl+APIS[action], ...args);
        return promise;
    }
}
export default fetchApis;


