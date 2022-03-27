//Search模块的小仓库，用于存储Search模块的数据
import { reqGetSearchInfo } from "@/api";
//state：仓库存储数据的地方
const state = {
  searchList: {}
};
//actions(注意单词是复数，单数报错)：书写自己的业务逻辑，处理异步
const actions = {
    // 这里可以书写业务逻辑，但是不能修改state
    //params={}表示params默认是{}(空对象)，若有实参传递进来则是实参
    async getSearchList (context, params = {}) {
      //params形参是当用户派发给actions的时候，传递的第二个参数，至少是一个空对象
      let result = await reqGetSearchInfo(params)
      if (result.code == 200) {
        context.commit('GETSEARCHLIST', result.data)
      }
    }
  }
;
//mutations(注意单词是复数，单数报错)：修改state
const mutations = {
  GETSEARCHLIST (state, searchList) {
    state.searchList = searchList
  }
};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  //state是当前仓库的state，并非大仓库中的state
  goodsList (state) {
    //加上|| [] 是用来解决以下问题：在断网的情况下，无法获取数据，searchList是一个空对象，会返回undefined
    //计算的属性值至少要给一个新数组
    return state.searchList.goodsList || [];
  },
  trademarkList (state) {
    return state.searchList.trademarkList || [];
  },
  attrsList (state) {
    return state.searchList.attrsList || [];
  }
};

export default {
  //这句话的目的是昂mapstate、mapmutations等识别其第一个参数，
  // 即index.js里的search键
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}