// 首页
import request from '@/utils/request.js'

// 获取首页数据
export const getFirstDate = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
