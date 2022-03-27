<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!--没有用户名：未登录-->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航，必须要有to属性(值为路由组建的path的值)-->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
            <!-- <a href="###">登录</a>-->
            <!-- <a href="###" class="register">免费注册</a>-->
          </p>
          <!--登录了-->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/center/myorder">我的尚品汇</router-link>
          <router-link to="/center/myorder">尚品汇会员</router-link>
          <router-link to="/center/myorder">企业采购</router-link>
          <router-link to="/center/myorder">关注尚品汇</router-link>
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/center/myorder">商家后台</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!--声明式导航-->
        <router-link class="logo" to="/home">
          <img alt="" src="./images/logo.png">
        </router-link>
        <!--<a class="logo" title="尚品汇" href="###" target="_blank">-->
        <!--  <img src="./images/logo.png" alt="">-->
        <!--</a>-->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
              id="autocomplete"
              v-model="keyword"
              class="input-error
              input-xxlarge"
              type="text"/>
          <!--编程式导航-->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: ''
    }
  },
  computed:{
    // 用户名信息
    userName(){
      return this.$store.state.user.userInfo.name
    }
  },
  methods: {
    goSearch() {
      //路由传递参数：不是区分params和query参数，而是看怎么去写字符串和js表达式

      //法一：字符串形式
      //params参数：不要忘了在/search后面再加一个/
      //query参数：不要忘了在键前面加?
      //this.keyword已经是个字符串了，不能再加''
      // this.$router.push("/search/" + this.keyword + '?k=' + this.keyword.toUpperCase())

      //法二：模板字符串：``表示模板字符串，模板字符串里的js表达式要用${}表示
      // this.$router.push(`/search/${this.keyword}/?k=${this.keyword.toUpperCase()}`)

      //法三：对象：最常用的写法
      let location = {
        //若使用params参数，必须使用name属性，不能使用path属性
        name: "search",
        params: {
          keyword: this.keyword
        }
      }
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      this.$router.push(location)
      /***********************************************************************************************/
      //面试题
      // 1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
      // path不能与params一起使用，这样会造成url路径的混乱
      // 2:如何指定params参数可传可不传?
      // 如果路由要求必须传递params参数，但是你就是不传params参数，则会导致url路径有问题
      // 解决：在配置路由的时候，在占位后面加一个?,则这样params就可以传或者不传
      // 3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // 使用undefined：在params可以传或者不传的情况下，空的字符串可以使用undefined去定义
      // this.$router.push({
      //   //若使用params参数，必须使用name属性，不能使用path属性
      //   name: "search",
      //   params:{
      //     keyword: ''|| undefined
      //   },
      //   query:{
      //     k: this.keyword.toUpperCase()
      //   }
      // })
      // 4: 路由组件能不能传递props数据
      //方法一：

    },
    async logout () {
      //退出登录需要做的事
      //1. 需要发送请求，通知服务器退出登录。清除vuex中的数据token userInfo
      //2. 清除本地数据：TOKEN
      try{
        await this.$store.dispatch('user/userLogout')
        this.$router.push('/home')
      }catch (error){
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on("clear",()=>{
      this.keyword = ""
    })
  }
}
</script>
<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>