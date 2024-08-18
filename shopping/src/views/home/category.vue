<!-- 分类页 -->
<template>
  <div class="cate">
    <van-nav-bar title="全部分类"/>
    <van-search
        class="search"
        placeholder="请输入搜索关键词"
        @click="$router.push('/search')"
      >
      </van-search>

    <div>
      <ul>
        <li v-for="item in nameList" :key="item.category_id">
          <!-- <a
            :class="{active:index === activeIndex}"
            @click="activeIndex = index"
            href="javaScript:;"> -->
            {{ item.name }}
          <!-- </a> -->
        </li>
      </ul>
      <div class="grid" >
        <van-grid :column-num="3" >
          <!-- v-for="item in nameList[activeIndex]?.children" -->
          <van-grid-item
            v-for="item in childrenList"
            :key="item.category_id"
            :icon="item.image.external_url"
            :text="item.name"
            @click="$router.push(`/searchList/?search=${item.name}`)"
            />
        </van-grid>
      </div>
    </div>

  </div>
</template>

<script>
import { getCategoryData } from '@/api/category.js'

export default {
  name: 'CategoryPage',
  data () {
    return {
      nameList: [],
      childrenList: []
    }
  },
  async created () {
    const { data } = await getCategoryData()
    this.nameList = data.list
    this.childrenList = this.nameList[0].children
    console.log(this.childrenList)
  }
}
</script>

<style scoped>
@import '@/styles/css/category.css';
</style>
