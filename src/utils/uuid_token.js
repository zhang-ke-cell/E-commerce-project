import {v4 as uuidv4} from 'uuid'
// 要生成一个随机字符串，且每次执行都不能发生变化，游客身份持久储存
export default getUUID = ()=>{
    // 从本地存储里获取uuid（看一下本地存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有就生成一个
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token = uuidv4()
        // 进行本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    //切记要有返回值，没有返回值就是undefined
    return uuid_token
}
