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
    GET_GROUPLIST:'/my-walk/group-list',
    GET_GROUPINFO:'/my-walk/group-info/{gid}',
    GET_PERSONALINFO:'/my-walk/personal-info',
    POST_PERSONALINFO:'/my-walk/personal-info',
    POST_IDCARD:'/my-walk/idcard',
    POST_JOINGROUP:'/my-walk/group-save',
    DELETE_GROUP:'/my-walk/group-delete',
    POST_GROUPINFO:'/my-walk/group-info',
    POST_AGREEJOIN:'/my-walk/group-agree',
    POST_REJECTJOIN:'/my-walk/group-reject',
    POST_CANCELJOIN:'/my-walk/group-cancel',

};
const noNeedTokenList=['get_login','get_islogin','get_group'];
const needFilledInfo=['join_group'];
const noNeedActive=false;
const needFilled=true;
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
function isNeedFillInfo(key) {
  key=key.toLowerCase();
  return needFilledInfo.some(function (action) {
    return key===action
  })
}
const vueInstance = new Vue;

for (let action in APIS) {
    let isPost = isPostAction(action);

    let defaultQuery = {
        body  : {},
        params: {}
    };
    fetchApis[action] = function (store, queryData = defaultQuery) {
        // get请求{params: {}} post请求{body:{}}
        let copy4PostQuery = Object.assign({}, queryData);
        copy4PostQuery.params = {};
        var args = [].concat(isPost ? [queryData.params, copy4PostQuery] : queryData);
        /{(.*)}/.test(APIS[action]);
        let key=RegExp.$1;
        console.log(args);
        if(key!==undefined){
          APIS[action].replace(/{.*}/,copy4PostQuery.params[key]);
          delete args[key];
        }
        var promise = vueInstance.$http[isPost ? 'post' : 'get'](requestUrl+APIS[action], ...args);
        return promise;
    }
}
export default fetchApis;


