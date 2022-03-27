//对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css"
//在当前模块引入vuex store
import store from "@/store"

// console.log(nprogress)
//1：利用axios对象的方法create，去创建一个axios实例
//2：request就是axios，只不过是稍微配置一下
const requests = axios.create({
    //配置对象，给所有的请求url地址前加上/api,这样就不用每次都再写一遍/api
    baseURL: "/api",
    //代表请求超时的时间为5s
    timeout: 5000
})

//请求拦截器：
// 在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些事
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个很重要的属性：header请求头
    if(store.state.detail.uuid_token){
        //请求头添加一个字段:userTempId，和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 在登录后跳转到Home页面，Home组件需要从服务器中捞回数据
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start();//表示进度条开始
    return config;
})

//响应拦截器：可以传入成功与失败的回调函数
// 成功的回调函数会返回服务器响应的数据
// 失败的回调会返回一个error对象
requests.interceptors.response.use(
    (res) => {
        nprogress.done();//表示进度条结束
        return res.data;
    },
    (error) => Promise.reject(new Error('fail')))

//对外暴露
export default requests