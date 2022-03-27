<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!--事件委派|事件代理，即在两个兄弟上触发的事件交给父亲盒子来操纵-->
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!--过渡动画-->
        <transition name="sort">
          <!-- 三级联动-->
          <div v-show="show" class="sort">
            <!--利用事件委托+编程式导航实现路由地跳转与传递参数-->
            <div class="all-sort-list2" @click="goSearch">

              <!--一级分类-->
              <div v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId"
                   :class="{cur:currentIndex==index}"
                   class="item">
                <h3 @mouseenter="changeIndex(index)">
                  <!--不要忘了删除href属性，否则会无法进行路由跳转-->
                  <a :data-category1Id="c1.categoryId" :data-categoryName="c1.categoryName">{{ c1.categoryName }}</a>
                </h3>

                <!--二级分类-->
                <div :style="{display:currentIndex==index?'block':'none'}" class="item-list clearfix">
                  <div v-for="c2 in c1.categoryChild" :key="c2.categoryId" class="subitem">
                    <dl class="fore">
                      <dt>
                        <a :data-category2Id="c2.categoryId"
                           :data-categoryName="c2.categoryName">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId"> <a :data-category3Id="c3.categoryId"
                                                                                    :data-categoryName="c3.categoryName">{{ c3.categoryName }}</a> </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a> <a href="###">美妆馆</a> <a href="###">尚品汇超市</a> <a href="###">全球购</a> <a href="###">闪购</a> <a href="###">团购</a> <a href="###">有趣</a> <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流函数
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data () {
    return {
      currentIndex: -1,
      show: true
    }
  },

  methods: {
    /*一级分类鼠标进入修改响应式数据的currentIndex属性*/
    //throttle节流函数回调别用箭头函数，否则可能出现上下文this的问题
    changeIndex: throttle(function (index) {
      //index表示鼠标移上某一个一级分类的索引值
      //正常情况下(用户慢慢操作)：鼠标一进入每一个一级分类的h3，触发鼠标进入事件，可正常执行。
      //非正常情况下(用户操作过快)：本身全部的一级分类都应该触发鼠标进入事件，但经测试，只有部分h3触发了。
      this.currentIndex = index
      // console.log(this.currentIndex)
    }, 50),

    /*进行路由跳转的方法*/
    goSearch (event) {
      //最好的解决方案：编程式导航 + 事件委派（把全部的子节点[h3、dt、dl、em]的事件委派给父亲节点）
      //事件委派存在一些问题：
      //1. 点击a标签的时候才会进行路由跳转：怎么能确定点击的的一定是a标签
      //2. 即使能确定是标签，如何区分是一级、二级、三级分类的标签

      //解决问题1：给节点中的a标签加上自定义属性（html允许自定义属性，以data-开头的就是自定义属性）:data-categoryName，其余子节点是没有的
      //获取到当前触发这个事件的节点【h3、a、dt、dl】，带有data-categoryname这样的节点一定是a标签
      //节点有一个属性dataset属性，可获取节点的自定义属性(会将大写的属性全部变成小写)与属性值。
      let element = event.target
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {//判断是否是a标签
        //整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {//判断是否是一级分类a标签
          query.category1Id = category1id
        }
        else if (category2id) {//判断是否是二级分类a标签
          query.category2Id = category2id
        }
        else {//三级分类a标签
          query.category3Id = category3id
        }
        //判断：如果进行路由跳转的时候，带有params参数，也要传过去
        if (this.$route.params) {
          location.params = this.$route.params
        }
        //整理完参数:将location和query两个对象进行合并
        location.query = query
        this.$router.push(location)
      }
    },

    /*当鼠标移入的时候，让商品分类列表进行展示*/
    enterShow () {
      this.show = true
    },

    /*当鼠标移出时，让商品分类列表进行隐藏*/
    leaveShow () {
      //鼠标移出后currentIndex变为-1
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },

  },

  computed: {
    //此处的state就是大仓库的那个状态
    ...mapState('home', ["categoryList"])
  },

  mounted () {
    //当进行路由跳转时，组件会重新挂载，通过让show变为false来实现组件的隐藏功能
    //如果不是Home组件，则将typeNav进行隐藏
    if (this.$route.path != '/home') {
      // console.log('show被mounted修改了')
      this.show = false
    }
    this.$store.dispatch('home/getCategoryList')
  }
}
</script>


<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    //过度动画开始的状态（进入）
    .sort-enter {
      height: 0px;
    }

    //过度动画的结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }

    //定义动画时间、速率
    .sort-enter-active {
      transition: all 1s linear;
    }
  }
}
</style>