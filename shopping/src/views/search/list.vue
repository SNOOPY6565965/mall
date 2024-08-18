<!-- 搜索列表页 -  一级路由-->
<template>
  <div>
    <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.push('/search')"
    />
    <div>
      <van-search
        class="search"
        :value="querySearch || '搜索商品'"
        @click="$router.push('/search')"
      >
      </van-search>
      <van-icon name="apps-o" class="apps" size="30px"></van-icon>
    </div>
    <div>
      <span>综合</span>
      <span>销量</span>
      <span>价格</span>
    </div>
    <div>
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product.js'
export default {
  name: 'ListPage',
  data () {
    return {
      page: 1,
      proList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    // 获取地址栏的搜关键字
    querySearch () {
      return this.$route.query.search
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  }
}
</script>

<style scoped>
@import '@/styles/css/searchList.css';
</style>
