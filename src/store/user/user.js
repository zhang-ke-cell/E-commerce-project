// 登录与注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout} from "@/api";
import {setToken,getToken,removeToken} from "@/utils/token"

const state = {
    code:"",
    token:getToken(),
    userInfo:{}
}
const actions = {
    // 获取验证码
    async getCode(context,phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            context.commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async userRegister(context,user){
        let result =  await reqUserRegister(user)
        console.log(result)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 登录业务
    async userLogin(context,data){
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一标识符(uuid)
        // 将来经常通过带token找服务器要用户信息进行展示
        // console.log(result)
        if(result.code==200){
            context.commit("USERLOGIN",result.data.token);
            //持久化储存token
            setToken(result.data.token);
            // localStorage.setItem("TOKEN",result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        // console.log('userInfo的返回是：',result.data)
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout(context){
        //只是向服务器发起一次请求，通知服务器清除token
        let result = await reqUserLogout()
        // console.log('退出登录的result',result)
        if(result.code==200){
            context.commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }

}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
        // console.log('state.token',state.token)
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清楚本地数据
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        // 本地存储数据清空
        removeToken()
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