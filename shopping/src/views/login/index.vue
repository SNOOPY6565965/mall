<!-- 登录 - 一级路由 -->
<template>
  <div>
    <van-nav-bar
    title="会员登录"
    left-arrow
    @click-left="$router.go(-1)"
    />
    <div class="p">
      <p class="p1">手机号登录</p>
      <p class="p2">未注册的手机号登录后将自动注册</p>
    </div>
    <div class="int">
      <input v-model="mobile" type="text" placeholder="请输入手机号码">
    </div>
    <div class="int">
      <input v-model="picCode" type="text" placeholder="请输入图形验证码">
      <img :src='picUrl' v-if="picUrl" @click="getPicCode()">
    </div>
    <div class="int">
      <input v-model="msgCode" type="text" placeholder="请输入短信验证码">
      <button @click="getCode()" class="btn1">
        {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
      </button>
    </div>
    <button @click="login()" class="btn2">登录</button>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login.js'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器 second--
      timer: null, // 定时器 id
      mobile: '', // 手机号
      msgCode: ''// 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图像验证码
    async getPicCode () {
      // const { data: { base64, key } } = await request.get('/captcha/image')
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标识
    },
    // 校验 手机号 和 图形验证码 是否合格
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('图形验证码不正确')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 如果没有通过校验，没有必要往下走
        return
      }

      if (!this.timer && this.second === this.totalSecond) {
        // 发送短信验证（预期：希望如果响应的status非200，最好抛出一个错误，await只会等待成功的promise）
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        Toast('发送成功，请注意查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            // 清除
            clearInterval(this.timer)
            this.timer = null // 重置定时器 id
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        Toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)

      Toast('登录成功')

      // 进行判断，看地址栏有无回跳地址
      // 如果有 => 说明是其他页面，拦截到登录来的，需要回跳
      // 如果没有 => 正常去首页
      const url = this.$route.query.backUrl || '/'
      // this.$router.push(url)
      this.$router.replace(url)
    }
  },
  // 离开页面，清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
@import '@/styles/css/login.css';
</style>
