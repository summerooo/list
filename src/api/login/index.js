import axios from '../index'
const { api } = require('@/dev')
const config = {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
}
// 登陆
export const login = data => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios.post(`${api}/user/login`, formData, config)
}
