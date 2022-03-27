import Vue from 'vue';
import Vuex from 'vuex';

//使用插件
Vue.use(Vuex);

//引入小仓库
import home from "@/store/home/home";
import search from "@/store/search/search";
import detail from "@/store/detail/detail";
import shopcart from "@/store/shopcart/shopcart";
import user from "@/store/user/user";
import trade from "@/store/trade/trade"
//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules: {
        // 使用前提是一定要在各自的store里添加namespaced属性
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})