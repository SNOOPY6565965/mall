<template>
  <div>
    <button @click="handleSub()" class="count-btn1">-</button>
    <input type="text" @change="handleChange" :value="value" class="int">
    <button @click="handleAdd()" class="count-btn2">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountPage',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      // 输入了不合法的文本 或 输入了负值，回退成原来的value值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/css/countBox.css';
</style>
