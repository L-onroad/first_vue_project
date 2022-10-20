<template>
  <div class="pagination">
    <button :disabled="currentPage==1" @click="$emit('searchPage', currentPage - 1)">上一页</button>
    <button v-if="pageStartToEnd.start > 1" @click="$emit('searchPage', 1)" :class="{active: currentPage == 1}">1</button>
    <button v-if="pageStartToEnd.start > 2">...</button>
    <button v-for="(page,index) in pageStartToEnd.end" :key="index" v-show="page >= pageStartToEnd.start" @click="$emit('searchPage', page)"  :class="{active: currentPage == page}">{{page}}</button>
    <button v-if="pageStartToEnd.end < totalPage - 1">···</button>
    <button v-if="pageStartToEnd.end < totalPage" @click="$emit('searchPage', totalPage)" :class="{active: currentPage == totalPage}">{{totalPage}}</button>
    <button :disabled="currentPage==totalPage" @click="$emit('searchPage', currentPage + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ totalPage }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["totalGoods", "currentPage", "continues", "pageGoods"],
  computed: {
    totalPage() {
      return Math.ceil(this.totalGoods / this.pageGoods);
    },
    pageStartToEnd() {
      let start = 0,
        end = 0;
      let { totalPage, currentPage, continues } = this;
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        start = currentPage - parseInt(continues / 2);
        end = currentPage + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, currentPage, end };
    },
  },
};
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