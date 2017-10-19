/**
 * Created by fuzl on 2017/3/4.
 * 所有的请求地址
 */
import Vue from 'vue'
import './http'
var fetchApis = {};
var requestUrl="http://wapi.louisian.net";
const APIS = {
    GET_ISLOGIN:'/my-walk/account',
    GET_YXNUM:'',
    POST_LOGIN:'/account/login',
    GET_GROUPLIST:'/group',
    GET_GROUPINFO:'/my-walk/group-info/{gid}',
    GET_USERINFO:'/user/info',
    PUT_PERSONALINFO:'/account/{id}',
    POST_IDCARD:'/my-walk/idcard',
    POST_JOINGROUP:'/group/{id}/join',
    DELETE_GROUP:'/my-walk/group-delete',
    PUT_GROUPINFO:'/my-walk/group-info',
    POST_AGREEJOIN:'/my-walk/group-agree',
    POST_REJECTJOIN:'/my-walk/group-reject',
    POST_CANCELJOIN:'/my-walk/group-cancel',

};
const postPrefix = ['post', 'save', 'delete','put'];
//将需要post的api写上post即可
function isPostAction(key) {
    key = key.toLowerCase();
    return postPrefix.some(function (action) {
        return key.indexOf(action) == 0;
    });
}
function getApiMethod(key){
  key=key.toLowerCase();
  return key.split('_')[0];
}
const vueInstance = new Vue;

for (let action in APIS) {
    let isPost = isPostAction(action);
    let method = getApiMethod(action);

    let defaultQuery = {
        body  : {},
        params: {}
    };
    fetchApis[action] = function (store, queryData = defaultQuery) {
        // get请求{params: {}} post请求{body:{}}
      //是否需要access-token
      // let accessToken=null;
        // if(queryData.params['aToken']){
        //   accessToken={headers:{
        //     'Access-Token':queryData.params['aToken']
        //   }}
        //   // console.log('aToken found')
        //   // vueInstance.$http.headers.common['Access-Token']=queryData.params['aToken'];
        //   delete queryData.params['aToken'];
        // };
        //正则判断是否有{}
        /{(.*)}/.test(APIS[action]);
        let key=RegExp.$1;

        if(key!==undefined){
          APIS[action]=APIS[action].replace(/{.*}/,queryData.params[key]);
          delete queryData[key];
        }
        let copy4PostQuery = Object.assign({}, queryData);
        copy4PostQuery.params = {};
        var args = [].concat(isPost ? [queryData.params, copy4PostQuery] : queryData);
        console.log(args);


        var promise = vueInstance.$http[method](requestUrl+APIS[action], ...args);
        return promise;
    }
}
export default fetchApis;


