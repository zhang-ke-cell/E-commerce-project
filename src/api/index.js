//当前这个模块，API统一进行管理
import requests from './request';
import mockRequest from "@/api/mockAjax";
import request from "./request";

//三级联动接口
// /api/product/getBaseCategoryList  get请求 无参数

//其他的组件都可以调用这个函数（请求）
export const reqCategoryList = () => {
    //发请求：axios发请求返回结果是Promise对象
    //这里url参数不用写/api，因为我们已经写过在request.js里写过baseURL属性了
    return requests({
            url: '/product/getBaseCategoryList',
            method: 'get'
        }
    )
}

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequest.get('/banner')

//获取floor数据
export const reqGetFloorList = () => mockRequest.get('/floor')

//获取search模块数据 地址：/api/list 请求方式：post  参数：十个
/*{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
}*/
//当前这个函数需要接收外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象，不然请求会失败
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params
})

// 获取产品详情页信息的接口：url：/api/item/{skuId}  请求方式是get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`, method:'get'})

//将产品添加到购物车列表中（获取更新某一产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST 注意：这个请求接口并没有返回任何数据，只是带给服务器产品信息
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

// 获取购物车列表的数据接口
// URL:/api/cart/cartList  method:get
export const reqCartList = ()=>requests({url:"/cart/cartList",method:'get'})

// 删除购物产品的接口
// URL：/api/cart/deleteCart/{skuId}     method:delete
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})// 删除购物产品的接口

//改变购物车产品的状态
// URL：/api/cart/checkCart/{skuId}/{isChecked}     method:get
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})

// 获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})

//注册
//url:api/user/passport/register    method:post 参数:phone,code,password
export const reqUserRegister  = (data)=>requests({url:`/user/passport/register`,method:"post",data})

//登录
//url:api/user/passport/login  method：post  参数：phone password
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,method:"post",data})

// 获取用户信息【需要带着用户的token向服务器要用户信息】
// url：/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
//url:api/user/passport/logout  method:get 
export const reqUserLogout = ()=>requests({url:`/user/passport/logout`,method:"get"})

//获取用户地址信息、
// url: /api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:"get"})

//获取商品清单
// url：/api/order/auth/trade    method:get
export const reqOrderInfo = ()=>requests({url:`order/auth/trade`,method:"get"})

//提交订单的接口
//url：/api/order/auth/submitOrder?tradeNo={tradeNo}     method：post
export const reqSubmitOrder = (tradeNo, data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:"post",data})

//获取支付信息
//url：/api/payment/weixin/createNative/{orderId}    method：get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取订单支付状态
//url：/api/payment/weixin/queryPayStatus/{orderId}  method：get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心数据
// uyl: /api/order/auth/{page}/{limit}      method：get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})
