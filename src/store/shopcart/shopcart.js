import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from "@/api";

const state = {
    cartList:[]
}
const actions = {
    //获取购物车数据
    async getCartList(context){
        let result = await reqCartList()
        // 测试是否能获取个人购物车数据
        if(result.code==200){
            context.commit('GETCARTLIST',result.data)
        }
    },
    async deleteCartBySkuId(context,skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    async updateCheckedById(context,{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    //删除全部勾选的商品
    deleteAllCheckedCart(context){
        // 获取购物车中全部的产品（是一个数组）
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?context.dispatch('deleteCartBySkuId',item.skuId):''
              // 将每一次返回的promise添加到数组之中
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked(context,isChecked){
        let promiseAll = []
        context.state.cartList[0].cartInfoList.forEach(item=>{
            let promise = context.dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state,data){
        state.cartList = data
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
    // 计算出来的购物数据
    // cartInfoList(state){
    //     return state.cartList[0].cartInfoList()
    // }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
