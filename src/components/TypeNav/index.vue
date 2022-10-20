<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托，离开标题样式消失 -->
      <div @mouseleave="recoverShow" @mouseenter="ifShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 渲染第一层数据 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: current === index }"
              >
                <h3 @mouseenter="changeItem(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-categoryId1="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 通过js控制组件显示隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: current === index ? 'block' : 'none' }"
                >
                  <!-- 渲染第二层数据 -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-categoryId2="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 渲染第三层数据 -->
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-categoryId3="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
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
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">乐享超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      current: -1,
      show: true,
    };
  },
  mounted() {
    // this.$store.dispatch("categoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  methods: {
    //鼠标移入三级联动板块函数逻辑（实现移入鼠标改变背景颜色同时对展示内容节流）
    changeItem: throttle(function (index) {
      this.current = index;
    }, 50),
    //鼠标移出三级联动板块函数逻辑
    recoverShow() {
      this.current = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    ifShow() {
      this.show = true;
    },
    goSearch(event) {
      // 整理参数，路由传参
      let { categoryname, categoryid1, categoryid2, categoryid3 } = event.target.dataset;
      // 判断传递参数
      if (categoryname) {        
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (categoryid1) {
          query.category1Id = categoryid1;
        } else if (categoryid2) {
          query.category2Id = categoryid2;
        } else if (categoryid3) {
          query.category3Id = categoryid3;
        }
        location.query = query;
        // 判断是否有params参数，有就一起合并传递
        if (this.$route.params) {
          location.params = this.$route.params
        }
        this.$router.push(location);
      }
    },
  },
  computed: {
    //mapState传入对象获取返回的数据
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 15),
    }),
  },
};
</script>

<style scoped lang="less">
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

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: rgb(129, 201, 237);
        }
      }
    }
    //定义非home组件下的商品栏显示隐藏动画效果
    .sort-enter, .sort-leave-to {
      opacity: 0;
    }
    .sort-enter-to, .sort-leave {
      opacity: 1;
    }
    .sort-enter-active, .sort-leave-active {
      transition: all .3s linear;
    }
  }
}
</style>