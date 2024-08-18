<!-- 首页 - 一级路由 -->
<template>
  <div>
    <!-- 二级路由展示出口 -->
     <router-view></router-view>
    <!-- vant组件 -->
    <van-tabbar route active-color="#abf" inactive-color="#000">
      <van-tabbar-item icon="wap-home-o" to="/first">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopping">购物车</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
