<!-- 购物车 -->
<template>
  <div class="shopping">
    <van-nav-bar title="购物车" />
    <div v-if="isLogin && cartList.length > 0">
      <div class="edit-box">
        <span>共{{cartTotal}}件商品</span>
        <van-icon name="edit" @click="isEdit = !isEdit">编辑</van-icon>
      </div>
      <div class="checked-box" v-for="item in cartList" :key="item.goods_id">
        <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
        <img :src="item.goods.goods_image">
          <div class="goods">
            <p class="p1">{{ item.goods.goods_name }}</p>
            <p class="p2">￥{{ item.goods.goods_price_min }}</p>
            <!-- 即希望保留原本的形参，又需要通过调用函数形参 => 箭头函数包装一层 -->
            <!-- <CountBox @input="changeCount" :value="item.goods_num" class="count-box"></CountBox> -->
            <CountBox @input="(value) => changeCount(value,item.goods_id,item.goods_sku_id)" :value="item.goods_num" class="count-box"></CountBox>
          </div>
      </div>
      <div class="foot">
        <van-checkbox :value="isAllChecked" @click="toggleAllCheck()">全选</van-checkbox>
        <p>合计：￥<span>{{ selPrice }}</span></p>
        <button v-if="!isEdit" class="btn" :class="{disabled:selCount === 0}" @click="goPay()">结算({{ selCount }})</button>
        <button v-else @click="handleDel()" class="btn" :class="{disabled:selCount === 0}">删除</button>
      </div>
    </div>
    <!-- 空购物车 -->
    <div class="empty" v-else>
      <img src="@/assets/img/empty_img.png">
      <p class="empty_p">你的购物车是空的，快去逛逛吧！</p>
      <button class="empty_btn" @click="$router.push('/first')">去逛逛</button>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShoppingPage',
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isAllChecked']),
    isLogin () {
      return this.$store.getters.token
    }
  },
  created () {
    // 必须是登录过的用户，才能打开购物车列表
    // if (this.$store.getters.token) {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleAllCheck () {
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeCount (goodsNum, goodsId, goodsSkuId) {
      // console.log(goodsNum, goodsId, goodsSkuId)
      // 调用 vuex 的 action，进行数量的修改
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    async handleDel () {
      if (this.selCount === 0) return
      await this.$store.dispatch('cart/delSelect')
      this.isEdit = false
    },
    goPay () {
      // 判断有没有选中商品
      if (this.$router.push) {
        // 有选中的 商品 才进行结算跳转
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.selCartList.map(item => item.id).join(',') // 'cartId,cartId,cartId'
          }
        })
      }
    }
  },

  components: {
    CountBox
  },
  watch: {
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  }
}
</script>

<style scoped>
@import '@/styles/css/shopping.css';
</style>
