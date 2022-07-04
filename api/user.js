import { request } from "@/plugins/request";

export const login = data => {
  return request({
    method: 'post',
    url: 'users/login',
    data
  })
}

export const register = data => {
  return request({
    method: 'post',
    url: 'users',
    data
  })
}

export const addFollow = username => {
  return request({
    method: 'post',
    url: `profiles/${username}/follow`,
  })
}

export const removeFollow = username => {
  return request({
    method: 'delete',
    url: `profiles/${username}/follow`,
  })
}

export const getProfile = username => {
  return request({
    method: 'get',
    url: `profiles/${username}`,
  })
}

export const updateUser = data => {
  return request({
    method: 'put',
    url: 'user',
    data
  })
}
