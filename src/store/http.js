/**
 * Created by fuzl on 2017/3/3.
 */
import Vue from 'vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);
// Http Global
Vue.http.options.root = '/edu';
Vue.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;Access-Control-Allow-Origin:*';
Vue.http.options.emulateJSON = true;
const requestDebug = true;
// interceptors
Vue.http.interceptors.push(function(request, next) {

    next((response)=>{
      // console.log(response)
        switch (response.status) {
            case 201:
            case 200:
              console.log(response.body);
                if (response.body.code===200) {
                    response.body = response.body.data;
                } else {
                    // 先行resolve
                    return Promise.resolve(response.body);
                }

                break;
            case 404:
                notify('error', '访问地址或服务不存在', this);
                break;
            case 0  :
            case 500:
            case 501:
            case 502:

                notify('error', '服务暂时不可用', this);
                break;
            default:
                notify('error', response.body.message, this);
        }
    });
});
function getVueInstance(){
    if (getVueInstance.instance) {
        return getVueInstance.instance;
    }
    let instance = new Vue();
    getVueInstance.instance = instance;
    return instance
}
function notify(type, msg, instance){
    instance = instance || getVueInstance();
    requestDebug && instance.$toasted.error(msg);
}
