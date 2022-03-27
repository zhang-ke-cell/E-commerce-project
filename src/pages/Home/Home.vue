<template>
  <div>
    <!--三级联动组件：已经在main.js里注册过了，不需要再import引入了-->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!--通过:list动态属性来给子组件Floor传递props数据-->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer";
import Recommend from "@/pages/Home/Recommend/Recommend";
import Rank from "@/pages/Home/Rank/Rank";
import Like from "@/pages/Home/Like/Like";
import Floor from "@/pages/Home/Floor/Floor";
import Brand from "@/pages/Home/Brand/Brand";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },

  computed:{
    ...mapState('home', ['floorList'])
  },

  mounted(){
    //获取floor组件的数据
    // console.log('home开始挂载')
    this.$store.dispatch('home/getFloorList')

    // console.log('mounted执行了')
  }
}
</script>

<style scoped>

</style>