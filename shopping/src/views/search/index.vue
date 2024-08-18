<!-- 搜索页 - 一级路由 -->
<template>
  <div>
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.push('/first')"
      :show-action="showAction"
      @focus="onFocus()"
    />
    <!-- 搜索 -->
    <div>
      <van-search
        class="search"
        v-model="search"
        placeholder="请输入搜索关键词"
      >
      </van-search>
      <button class="btn" @click="goSearch(search)">搜索</button>
    </div>
    <div v-if="history.length > 0">
      <span>最近搜索</span>
      <van-icon @click="clear()" name="delete-o" class="del"></van-icon>
      <ul v-for="item in history" :key="item">
        <li
        @click="goSearch(item)"
        >
        {{ item }}
      </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'SearchPage',
  data () {
    return {
      showAction: false,
      search: '', // 输入框的内容
      // history: ['手机', '小米14', '电视', '牛奶'] // 历史记录
      history: getHistoryList() // 历史记录
    }
  },
  methods: {
    onFocus () {
      this.showAction = true
    },
    goSearch (key) {
      // indexOf() 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。
      const index = this.history.indexOf(key)
      if (index !== -1) {
        // 存在相同的项，将原有的关键字移除
        // splice（从哪开始，删除几个，项1，项2）
        this.history.splice(index, 1)
      }
      this.history.unshift(key)

      setHistoryList(this.history)

      // 跳转到搜索列表页
      this.$router.push(`/searchList/?search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }

}
</script>

<style scoped>
@import '@/styles/css/search.css';
</style>
