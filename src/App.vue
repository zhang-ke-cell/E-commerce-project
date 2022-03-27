<template>
  <div>
    <h1 v-upper="msg">为了测试自定义插件</h1>
    <Header></Header>
    <!--显示路由组件-->
    <router-view></router-view>
    <!--在Home、Search显示，在Login、Register隐藏-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
  export default {
    name: "App",
    components: {
      Header,
      Footer
    },
    data(){
      return {
        msg:'haha'
      }
    },
    /*所有组件中，app组件是最先执行的；而且mounted挂载只会执行一次*/
    mounted() {
      //通知Vuex发请求，获取商品分类的三级列表的数据，存储于仓库当中
      //这里的mounted只会执行一次，可把重复执行的，且只需执行一次即可的内容（比如发送请求获取数据）提前到这里写。
      this.$store.dispatch('home/getCategoryList')
    }
  }

</script>

<style scoped>

</style>