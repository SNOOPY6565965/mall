import request from '@/utils/request.js'

// 收获地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
