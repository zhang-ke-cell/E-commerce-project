//Home模块的小仓库，用于存储Home模块的数据
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api";


/*state：仓库存储数据的地方*/
const state = {
    //state中数据默认初始值跟服务器返回的数据类型要一致，即服务器返回对象（数组），初始值就是个空对象（空数组）
    //获取三级联动的数据
    categoryList: [],
    //获取轮播图的数据
    bannerList: [],
    //获取floor数据
    floorList: []
};


/*actions(注意单词是复数，单数报错)：书写自己的业务逻辑，处理异步*/
/*这里可以书写业务逻辑，但是不能修改state*/
const actions = {
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    //获取三级联动的数据
    async getCategoryList(context) {
        // console.log('进入categories actions')
        //返回一个promise对象
        let result = await reqCategoryList()
        // console.log(result.data)
        if (result.code == 200) {
            context.commit('GETCATEGORYLIST', result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList(context) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor数据
    async getFloorList(context) {
        let result = await reqGetFloorList()
        // console.log(result.data)
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result.data)
        }
    }
};
//mutations(注意单词是复数，单数报错)：修改state
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
        // console.log('m执行了')
    },
    GETBANNERLIST(state, bannerList) {
        // console.log('mutations 1 执行了')
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        // console.log('mutations执行了')
        state.floorList = floorList
    }
};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getter = {};

export default {
    //这句话的目的是昂mapstate、mapmutations等识别其第一个参数，
    // 即index.js里的home键
    namespaced: true,
    state,
    actions,
    mutations,
    getter
}