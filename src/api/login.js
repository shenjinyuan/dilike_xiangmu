import request from '@/utils/request.js'
//登录
export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: "POST",
    data
  })
}
//验证图片
export function getverify(data) {
  return request({
    url: `/user-service/user/imageCode/${data}`,
    responseType:'blob'
  })
}
