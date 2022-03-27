<template>
  <!--轮播图-->
  <div id="floor1Swiper" ref="cur" class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(carousel, index) in list" :key="carousel.id" class="swiper-slide">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: "Carousel",
  props: ['list'],
  watch: {
    list: {
      //问题：在不加immediate的情况下无法直接使用watch监听到数据，因为list数据从未发生变化（数据是父亲给的）
      //immediate立即监听，无论数据有没有发生变化，上来就监听一次
      immediate: true,
      handler() {
        //watch处在生命周期的created阶段，可以进行数据监测，但是还没有mounted
        //启用了immediate，只能确保数据已经有了，但是无法保证v-for动态渲染结构的完成，因此还是需要nextTick
        this.$nextTick(() => {
          //只有当服务器数据回来了、v-for执行完毕了（轮播图的结构一定有了），才能执行这个回调的时候。
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,//分液器小球是否能够翻页
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        })
      }
    }
  }
}
</script>

<style scoped>

</style>