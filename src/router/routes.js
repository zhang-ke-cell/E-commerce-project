import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Detail from "@/pages/Detail/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess"
import ShopCart from "@/pages/ShopCart/ShopCart"
import Trade from "@/pages/Trade/Trade"
import Pay from "@/pages/Pay/Pay"
import PaySuccess from "@/pages/PaySuccess/PaySuccess"
import Center from "@/pages/Center/Center"
import MyOrder from "@/pages/Center/MyOrder/MyOrdre"
import GroupOrder from "@/pages/Center/GroupOrder/GroupOrder"
import {next} from "lodash/seq";

export default  [
    {   //这个path地址是在地址栏里现实的地址
        path: "/home",
        // 路由懒加载，只有当用户去访问该组件的时候才会加载该组件
        component: ()=>import("@/pages/Home/Home"),
        //自定义路由信息
        meta:{show:true}
    },
    {
        name: 'search',
        //search组件接收params参数，需要写params参数的占位符
        path: "/search/:keyword?",
        component: Search,
        meta:{show:true},
        //路由组件传递props数据：search组件接收props数据
        //写法一：布尔值写法:把params参数作为路由组件上的属性
        // props:true
        //写法二：对象写法
        // props:{
        //     a:1,
        //     b:2
        // }
        //写法三：函数式写法:可以将params参数和query参数以及其他自定义参数传递给路由组件
        // props($route){
        //     return{
        //         keyWord:$route.params.keyword,//没有像a一样直接给定值，没有直接写死，这样做是为了跟params参数传递配合使用，可以与输入框进行交互
        //         k:$route.query.k,
        //         a:1,
        //         b:2
        //     }
        // },
        props:($route)=> ({keyword:$route.params.keyword,k:$route.query.k,a:1,b:2})


    },
    {
        path: "/login",
        component: Login,
        meta:{show:false}
    },
    {
        path: "/register",
        component: Register,
        meta:{show:false}
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/detail/:skuid",
        component: Detail,
        //自定义路由信息
        meta:{show:true}
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/addcartsuccess",
        name:"addcartsuccess",
        component: AddCartSuccess,
        //自定义路由信息
        meta:{show:true}
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/shopcart",
        name:"shopcart",
        component: ShopCart,
        //自定义路由信息
        meta:{show:true}
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/trade",
        name:"trade",
        component: Trade,
        //自定义路由信息
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页面，必须是从购物车而来
            if(from.path=='/shopcart'){
                next()
            }else{
                // 其他的路由组件要到交易页面则停留在当前页面
                next(false)
            }
        }
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/pay",
        name:"pay",
        component: Pay,
        //自定义路由信息
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/paysuccess",
        name:"paysuccess",
        component: PaySuccess,
        //自定义路由信息
        meta:{show:true}
    },
    {   //这个path地址是在地址栏里现实的地址
        path: "/center",
        name:"center",
        component: Center,
        //自定义路由信息
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                // 二级路由组件不用写/
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component: GroupOrder
            },
            {
                //重定向设置：只要一跳转到center组件就重定向到myorder
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    //重定向功能：在项目跑起来的时候，当访问/的时候，立马让它定向到首页
    {
        path: "*",
        redirect: "/home"
    }
]