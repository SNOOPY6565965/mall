import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 数组里面包对象
    {
      path: '/',
      component: Home,
      // 重定向
      redirect: '/first',
      // 二级路由
      children: [
        { path: '/first', component: () => import('@/views/home/first.vue') },
        { path: '/category', component: () => import('@/views/home/category.vue') },
        { path: '/shopping', component: () => import('@/views/home/shopping.vue') }
      ]
    },
    { path: '/login', component: () => import('@/views/login') },
    { path: '/search', component: () => import('@/views/search') },
    { path: '/searchlist', component: () => import('@/views/search/list.vue') },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: '/goods/:id', component: () => import('@/views/goods') },
    { path: '/pay', component: () => import('@/views/pay') }
  ]
})

// 全局前置导航守卫

// 所有的路由在真正被访问到之前（解析渲染对应组件页面前），都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面

// to：到哪里去，到哪去的完整路由信息对象（路径，参数）；
// from：从哪里来，从哪来的完整路由信息对象（路径，参数）；
// next（）：是否放行；
// 1.next()    ：直接放行，放行到to要去的路径；
// 2.next(路径)：进行拦截，拦截到next里面配置的路径。

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/order']

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看 to.path 是否在 authUrls 中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 权限页面，需要判断token
  // const token = store.state.user.userInfo.token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
