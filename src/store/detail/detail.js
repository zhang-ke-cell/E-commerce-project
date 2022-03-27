import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
import {getUUID} from "../../../../shangpinhui_0415/src/utils/uuid_token";

const state = {
    goodsInfo:{},
    uuid_token:getUUID()
}

const actions = {
    async getGoodsInfo(context,skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code == 200){
            context.commit('GETGOODSINFO', result.data)
        }
    },
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车后（发请求），前台将参数带给服务器
        // 服务器写入数据成功以后，服务器并没有返回其他的数据，只是返回code=200，代表这次操作成功
        // 因为服务器没有返回其余数据，因此咱们不需要三连环储存数据

        // 当前这个函数返回promise对象
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 代表服务器加入购物车成功
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('fail') )
        }
    }
}

const mutations = {
    GETGOODSINFO(state, goodsInfo){
        state.goodsInfo = goodsInfo
    }
}

const getters = {
    // 路径导航简单的数据
    categoryView(state){
        //加 ||{}的原因：为了避免报undefiend的错，state.goodsInfo初始状态是一个空对象，空对象的categoryView属性值是undefined
        //这样一来当前计算出的categoryView属性值至少是一个空对象，假的报错不会有了
        return state.goodsInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    //产品售卖属性的变化
    spuSaleAttrList(){
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
