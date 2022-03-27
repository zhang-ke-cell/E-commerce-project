import {reqAddressInfo,reqOrderInfo} from "@/api";

const state = {
    addressInfo:[],
    orderInfo:{}
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
        }
        // console.log(result)
    },
    // 获取商品清单数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state,address){
        state.addressInfo =address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}