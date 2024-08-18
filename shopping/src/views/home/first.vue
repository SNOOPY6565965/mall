<!-- 首页 -->
<template>
  <div class="first">
    <div class="box1">智慧商城</div>
    <div>
      <van-search
        placeholder="请输入搜索关键词"
        reverse-color
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        @click="$router.push('/search')"
      />
    </div>
    <!-- 轮播图 -->
    <div>
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
          <img :src=item.imgUrl>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 导航 -->
    <div>
      <van-grid :column-num="5" icon-size="60px">
        <van-grid-item
        v-for="item in navList"
        :key="item.imgUrl"
        :icon="item.imgUrl"
        text="新品首发"
        />
      </van-grid>
    </div>
    <div>
      <img src="@/assets/img/4.png">
    </div>
    <div>
      <p>——猜你喜欢——</p>
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getFirstDate } from '@/api/first.js'
import { Dialog } from 'vant'
export default {
  name: 'FirstPage',
  data () {
    return {
      bannerList: [], // 轮播图
      navList: [], // 导航
      proList: [] // 商品
    }
  },
  mounted () {
    Dialog.alert({
      title: '温馨提示',
      message: '     此商城为不完整版！！！                       请选择响应式设计模式！！！                                 每进入一个页面，                                        建议您：动动您金贵的手指                               刷新一下！！ 谢谢！！'
    }).then(() => {
      return true
    })
  },
  async created () {
    const { data: { pageData } } = await getFirstDate()
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  },
  methods: {
    onSearch () {
      this.$toast(this.value)
    },
    onFocus () {
      this.showAction = true
    },
    onCancel () {
      this.showAction = false
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped>
@import '@/styles/css/first.css';
</style>
