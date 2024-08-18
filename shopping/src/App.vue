<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppPage'
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>
<!-- 下载安装 -->
<!--
  axios
  npm install axios
-->
<!--  Vant组件：自动按需导入
1.  yarn add vant@latest-v2
2.  yarn add babel-plugin-import -D
3.  babel.config.js中配置
4.  utils - vant-ui.js按需导入注册
5.  在main.js中导入vant-ui.js
-->
<!-- vw适配
1.  yarn add postcss-px-to-viewport@1.1.1 -D
2.  在根目录新建postcss.config.js文件
-->
