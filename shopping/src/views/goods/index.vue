<!-- 商品详情 - 一级路由 -->
<template>
  <div class="goods">
    <van-nav-bar
      :v-model="goodsId"
      title="商品详情页"
      left-arrow
      @click-left="$router.push('/searchList')"
    />
    <van-swipe @change="onChange()" :autoplay="2000">
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <img :src="item.external_url" class="imgUrl">
        <span class="page">{{ page }} / {{ images.length }}</span>
      </van-swipe-item>
    </van-swipe>
    <div class="price">
      <span class="min">￥{{ detail.goods_price_min }}</span>
      <span class="max">￥{{ detail.line_price_max }}</span>
      <span class="sales">已售{{ detail.goods_sales }}件</span>
    </div>
    <p class="name">{{ detail.goods_name }}</p>
    <p class="icon">
      <van-icon name="passed"/>
      七天无理由退货
      <van-icon name="passed"/>
      48小时发货
      <van-icon name="arrow"/>
    </p>
    <p class="p">
      <span>商品评价({{ total }}条)</span>
      <span class="p_sp">
        查看更多
      <van-icon name="arrow"/>
      </span>
    </p>
    <div class="ul">
      <ul v-for="item in commentList" :key="item.comment_id">
        <li>
          <img :src="item.user.avatar_url || defaultImg" class="defaultImg">
          <span class="li_sp">{{ item.user.nick_name }}</span>
          <van-rate size=16px gutter=2px :value="item.score / 2" :count="6" color="#ffd21e" void-color="#fed"/>
          <p>{{ item.content }}</p>
          <p class="p2">{{ item.create_time }}</p>
        </li>
      </ul>
    </div>
    <!-- 商品描述 -->
    <div v-html="detail.content" class="content"></div>
    <!-- 底部 -->
    <van-tabbar active-color="black" inactive-color="black" route fixed>
      <van-tabbar-item icon="wap-home-o" to="/first">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopping" class="shopping-cart">购物车</van-tabbar-item>
      <p class="cart" v-if="cartTotal > 0">{{ cartTotal }}</p>
      <button class="btn1" @click="addFn()">加入购物车</button>
      <button class="btn2" @click="buyFn()">立即购买</button>
    </van-tabbar>
    <!-- 加入购物车/立即购买 共用的弹层 -->
    <van-action-sheet
    v-model="showPannel"
    :title = "mode === 'cart' ? '加入购物车' : '立即购买'">
      <div class="sheet">
        <img :src="detail.goods_image" class="sheetImg">
        <p class="sheet-p1"><span>￥</span>{{ detail.goods_price_min }}</p>
        <p class="sheet-p2">库存{{ detail.stock_total }}</p>
        <div class="count">
          <span>数量</span>
          <!-- v-model应用于组件时，本质上是 :value 和 @input 的简写 -->
          <CountBox v-model="addCount" class="count-box"></CountBox>
        </div>
        <div class="stock">
          <!-- 有库存 -->
          <div v-if="detail.stock_total > 0" @click="addCart()">
            <button v-if="mode === 'cart'" class="btn-sheet1">加入购物车</button>
            <button v-else class="btn-sheet2" @click="goBuyNow()">立即购买</button>
          </div>
          <!-- 没有库存 -->
          <div class="none" v-else>该商品已售完</div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProComments, getProDetail } from '@/api/product'
import defaultImg from '@/assets/img/defaultImg.webp'
import CountBox from '@/components/CountBox.vue'
import { Toast } from 'vant'
import { addCart } from '@/api/cart.js'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'GoodsPage',
  mixins: [loginConfirm],
  data () {
    return {
      detail: {},
      images: [],
      page: 1,
      total: 0, // 评价总数
      commentList: [], // 评价列表
      defaultImg,
      showPannel: false, // 控制弹层的 显示隐藏
      mode: 'cart',
      addCount: 1, // 数字框绑定的数据
      cartTotal: 0 // 购物车角标
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  created () {
    this.getDetail()
    this.getComments()
  },
  methods: {
    onChange () {
      this.page += 1
      if (this.page > this.images.length) {
        this.page = 1
      }
    },
    async getDetail () {
      const { data: { detail } } = await getProDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
    },
    async getComments () {
      const { data: { list, total } } = await getProComments(this.goodsId, 5)
      this.commentList = list
      this.total = total
    },
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    buyFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    },
    async addCart () {
      // 判断 token 是否存在

      if (this.loginConfirm()) {
        return
      }
      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      Toast('加入购物车')
      this.showPannel = false
      console.log(this.cartTotal)
    },
    goBuyNow () {
      // 未登录的处理，需要弹出一个确认框
      // 当前的操作需要登录才能继续 => 去登录 再逛逛
      // 判断 token 是否存在
      if (this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.addCount
        }
      })
    }
  },
  components: {
    CountBox
  }
}
</script>

<style scoped>
@import '@/styles/css/goods.css';
</style>
