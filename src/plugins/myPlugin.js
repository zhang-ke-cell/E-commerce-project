// vue插件一定要暴露一个对象
let myPlugin = {}
myPlugin.install = function (Vue,options){
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase()
        console.log(params)
    })
}
export default myPlugin