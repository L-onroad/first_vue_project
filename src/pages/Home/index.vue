<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {ListContainer, TodayRecommend, Rank, Like, Floor, Brand},
  beforeCreate() {
    this.$store.dispatch('floorList')
  },
  mounted() {
    // 获取登录信息
    if(this.$store.state.users.token) {
      this.$store.dispatch('getUserInfo')
    }
  },
  methods: {

  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style scoped lang="less">

</style>