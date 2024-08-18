import request from '@/utils/request.js'

// 订单结算确认
// mode：cart => obj { cartIds }
// mode：buyNow => obj { goodsId,goodsNum,goodsSkuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNum
      delivery: 10, // 快递配送
      couponId: 0, // 优惠卷ID，传0 不使用优惠卷
      isUsePoints: 0, // 积分 传0 不使用积分
      ...obj // 将传递过来的参数对象 动态展开
    }
  })
}

// 提交订单
// mode：cart => obj { cartIds, remark }
// mode：buyNow => obj { goodsId,goodsNum,goodsSkuId, remark}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10 快递配送
    couponId: 0,
    isUsePoints: 0,
    payType: 10, // 余额支付
    ...obj
  })
}
