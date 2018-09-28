// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import echarts from 'echarts'
import md5 from 'js-md5';
/*import locale from 'element-ui/lib/locale/lang/en'*/
import i18n from './i18n/i18n';


Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
var $http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true
});
Vue.prototype.$http = $http;

Vue.use(ElementUI);
Vue.prototype.post = function (path, param, successCallback, errorCallback) {
  $http.post(`${process.env.NODE_ENV}` + path, param)
    .then((res) => {
      if (res.data.code == 200) {
        console.log("---200----");
        successCallback(res.data)
      } else if (res.data.code == 300) {
        console.log("---300----");
        this.$router.push("/")
      } else {
        if (errorCallback == undefined) {
          this.$message.error(res.data.message)
        } else {
          console.log("---500----");
          errorCallback(res)
        }
      }
    });
};
Vue.prototype.get = function (path, param, successCallback, errorCallback) {
  $http.get(`${process.env.NODE_ENV}` + path, param)
    .then((res) => {
      if (res.data.code == 200) {
        console.log("---200----");
        successCallback(res.data)
      } else if (res.data.code == 300) {
        console.log("---300----");
        this.$router.push("/")
      } else {
        console.log("---500----");
        if (errorCallback == undefined) {
          this.$message.error(res.data.message)
        } else {
          errorCallback(res)
        }
      }
    })
    .catch((err) => {
      console.error(err)
    });
};
Vue.prototype.del=function (path, param, successCallback, errorCallback) {
  this.$confirm('确认删除？')
    .then(() => {
      this.post(path, param, successCallback, errorCallback)
    })
    .catch(() => {});
};

/*// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
  timeout: 5000, // 请求的超时时间
  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  // headers: {
  // "Content-Type": "application/x-www-form-urlencoded"
  // },
  withCredentials: true // 允许携带cookie
});*

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App},
  template: '<App/>'
});


