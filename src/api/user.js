import request from '@/utils/request'
import requestcommenter from '@/utils/request-commenter'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function getCommenterInfo() {
  return requestcommenter({
    url: '/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
