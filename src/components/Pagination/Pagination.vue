<template>
  <div class="pagination">
    <!--上面部分-->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumberAndEndNumber.start>1" :class="{'active':pageNo==1}" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startNumberAndEndNumber.start>2">···</button>

    <!--中间部分-->
    <button v-for="(page, index) in startNumberAndEndNumber.end" v-if="page>startNumberAndEndNumber.start" :key="index" :class="{'active':pageNo==page}" @click="$emit('getPageNo',page)">{{ page }}</button>

    <!--下面部分-->
    <button v-if="startNumberAndEndNumber.end<totalPage-1">···</button>
    <button v-if="startNumberAndEndNumber.end<totalPage" :class="{'active':pageNo==totalPage}" :disabled="pageNo==totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <button>下一页</button>

    <button style="margin-left:30px">共{{ total }}条</button>
  </div>
</template>

<
<script>
export default {
  name: "Pagination",

  props: ["pageNo", "pageSize", "total", "continues"],

  computed: {
    //总共多少页
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },

    // 计算出连续页码的起始数字和结束数字
    startNumberAndEndNumber () {
      // 定义两个变量储存起始数字和结束数字
      let start = 0, end = 0
      // 连续页码数字是5，如果出现不正常现象[就是不够5页]
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      }
      else {
        start = this.pageNo - Math.floor(this.continues / 2)
        end = this.pageNo + Math.floor(this.continues / 2)
        // 出现不正常现象[start数字出现0|负数]
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 出现不正常现象[end数字超过数据总量]
        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - this.continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background-color: skyblue;
}
</style>
