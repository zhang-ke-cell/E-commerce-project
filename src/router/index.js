// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

//引入store
import store from "@/store"
//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push方法保存一份
let originPush = VueRouter.prototype.push
//重写push|replace
//第一个参数:告诉了原来的push方法，你往哪里跳转（传递哪些参数）
//第二个、第三个参数：表示成功与失败的参数
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        //call||apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call和apply传递参数：call传递参数用逗号隔开，apply以数组的形式传递参数
        originPush.call(this,location,resolve,reject)
    }
    else{
        //后两个参数表示成功与失败的回调
        originPush.call(this,location,()=>{},()=>{})
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 返回的y=0，代表在跳转到新的路由之后滚动条会在最上方
        return { y: 0 }
    }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    //to：可以获取到你要跳转到的那个路由信息，是一个对象
    //from：可以获取到你从哪个路由而来的信息，是一个对象
    //next：放行函数     next()全部放行      next(path)放行到指令路由   next(false)若url改变，则终端跳回from路由
    // console.log(to)
    // console.log(from)
    //用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    if(token){
        //用户登录后无法再去login页面，转到首页页面
        if(to.path == '/login'){
            next('/home')
        }else{
            // 登录了，但是去的不是login
            //如果有用户名(因为一刷新页面，vuex中的userInfo信息就会丢失)
            if(name){
                next()
            }else{
                // 如果没有用户信息，派发action让仓库存储用户信息后再跳转
                try{
                    //获取用户信息成功
                    await store.dispatch('user/getUserInfo')
                    next()
                }catch (error) {
                    // token因为时间过长失效了从而获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    }else {
        // 未登录访问：交易相关（trade），支付相关（pay，paysuccess），用户中心（center）相关的要跳转到登录（login）页面
        let toPath = to.path;
        console.log(toPath)
        if(toPath.indexOf('/trade')!==-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 可以看到地址栏发生了变化，在未登陆的前提下，把想要去的路由地址储存在地址栏中
            // http://localhost:8080/#/login?redirect=%2Fcenter%2Fmyorder
            next(`/login?redirect=${toPath}`)
        }else{
            next()
        }
        // next()
    }
})
export default router