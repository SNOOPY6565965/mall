<!-- firsr - 猜你喜欢 -->
<template>
  <div v-if="item.goods_id" @click="$router.push(`/goods/${item.goods_id}`)">
    <div class="goods">
      <img :src="item.goods_image" class="img">
      <div class="item">
        <p class="p1">{{ item.goods_name }} </p>
        <p class="p2">已售{{item.goods_sales}}件</p>
        <span class="sp1">￥{{ item.goods_price_min }}</span>
        <span class="sp2">￥{{ item.goods_price_max }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsPage',
  props: {
    item: {
      type: Object,
      // 默认值
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '@/styles/css/goodsItem.css';
</style>
