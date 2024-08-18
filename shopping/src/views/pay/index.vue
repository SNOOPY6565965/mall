<!-- 结算支付 - 一级路由 -->
<template>
  <div class="pay">
    <div class="box">
      <van-nav-bar
      title="订单结算台"
      left-arrow
      @click-left="$router.push('/shopping')"
      />
      <img src="@/assets/img/货车动.png" class="img1">
      <div v-if="selectedAddress.address_id" class="box1">
        <p><span>{{ selectedAddress.name }}</span><span>{{ selectedAddress.phone }}</span></p>
        <p class="p2">{{ longAddress }}</p>
        <!-- <p class="p2">{{ selectedAddress.address }}</p> -->
      </div>
      <div v-else class="box2">
        <p>请选择配送地址</p>
      </div>
      <van-icon name="arrow" @click="$router.push('/address')"></van-icon>
      <ul>
        <li v-for="i in 12" :key="i"></li>
      </ul>
      <div class="goods" v-for="item in order.goodsList" :key="item">
        <img :src="item.goods_image">
        <p class="goods_name">{{ item.goods_name }}</p>
        <p class="goods_detail">
          <span class="goods_total">&times;{{ item.total_num }}</span>
          <span class="goods_price">￥{{ item.goods_price_min }}</span>
        </p>
      </div>
      <p class="totalNum">共{{ order.orderTotalNum }}件商品，合计：
        <span class="totalPrice">￥{{ order.orderTotalPrice }}</span>
      </p>
      <hr>
      <p class="p">订单总金额：<span class="sp1">￥{{ order.orderTotalPrice }}</span></p>
      <p class="p">优惠券:<span class="sp2">无优惠券可用</span></p>
      <p class="p">配送费用:<span class="sp3">+￥0.00</span></p>
      <p class="zf1">支付方式</p>
      <p class="zf2">
        <van-icon name="balance-o" size="20px" />
        余额支付(可用9999999.99元)
        <van-icon name="passed" size="20px"/>
      </p>
      <textarea
      placeholder="选填：卖家留言（50字内）"
      maxlength="50"
      class="text"
      ></textarea>
    </div>
    <div class="footer">
      <p>实付款:<span>￥{{ order.orderTotalPrice }}</span></p>
      <button class="btn" @click="submitOrder()">提交订单</button>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/address.js'
import { checkOrder, submitOrder } from '@/api/order.js'
import { Toast } from 'vant'
export default {
  name: 'PayPage',
  data () {
    return {
      addressList: [],
      order: {},
      personal: {},
      remark: ''// 备注留言
    }
  },
  computed: {
    selectedAddress () {
      // 这里地址管理非主线业务，直接获取第一个项目作为选中的地址
      return this.addressList[0] ||
      {
        address_id: '10012',
        name: '用户一',
        phone: '12345678900'
        // longAddress: '中国'
      }
    },
    longAddress () {
      // const region = this.selectedAddress.region
      // return region.province + region.city + region.region + this.selectedAddress.detail
      return '上海上海市徐汇区北京路1号楼8888室'
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    }
  },
  created () {
    this.getAddressList()
    this.getOrderList()
  },
  methods: {
    async submitOrder () {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          cartIds: this.cartIds,
          remark: this.remark
        })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum,
          remark: this.remark
        })
      }
      Toast('支付成功')
      // this.$router.replace('/order')
    },
    async getAddressList () {
      const { data: { list } } = await getAddressList()
      this.addressList = list
    },
    async getOrderList () {
      // 购物车结算
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        this.order = order
        this.personal = personal
      }
      // 立刻购买结算
      if (this.mode === 'buyNow') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
      }
    }
  }
}
</script>

<style scoped>
@import '@/styles/css/pay.css';
</style>
