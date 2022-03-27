import Vue from 'vue'
import App from './App.vue'
import { Button, MessageBox } from 'element-ui';

//引入路由
import router from '@/router'
Vue.config.productionTip = false

//引入仓库
import store from "./store";

//注册全局组件
import TypeNav from "@/components/TypeNav/TypeNav";
import Carousel from "@/components/Carousel/Carousel"
import Pagination from "@/components/Pagination/Pagination"

//第一个参数：全局组件的名字。第二个参数：是哪一个组件。
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//测试接口
// import {reqCategoryList} from "@/api";
// reqCategoryList()

//引入MockServer.js，用于模拟数据
import '@/mock/mockJs'

//引入swiper样式(在main.js中引入，使得所有的组件都可以使用)
import "swiper/css/swiper.css"

// 统一接收api文件夹里面的全部请求函数
import * as API from "@/api"

// 引入插件
import VueLazyload from "vue-lazyload";
// 注册插件
import weimei from "@/assets/1.gif"
Vue.use(VueLazyload,{
    //懒加载默认的图片
    loading:weimei
})


//引入自定义插件
import myPlugin from "@/plugins/myPlugin";
Vue.use(myPlugin,{
    name:"upper"
})

// 引入表单验证插件
import "@/plugins/validate"

new Vue({
    render: h => h(App),
    // 全局事件总线$bus的配置
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    //注册路由信息 ：可以让全部的组件（路由|非路由组件）都可以获取到$route，#router属性
    //$route(路由)：可以获取路由信息（path、query、params）
    //$router:进行编程式导航，实现路由跳转push、replace
    router,
    //注册仓库：为所有的组件实例添加属性$store
    store
}).$mount('#app')
