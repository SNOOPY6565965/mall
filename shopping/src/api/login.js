// 此处用于存放所有登录相关的接口请求

import request from '@/utils/request.js'

// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2.获取短信验证码 246810
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3.登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
