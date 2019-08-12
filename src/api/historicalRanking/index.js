import axios from '../index'
const { api } = require('@/dev')
const config = {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
}
// 获取历史 get
export const getHistory = data => {
  return axios.get(`${api}/web/tops`, { params: data })
}
// 获取历史区间 post
export const postHistory = data => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios.post(`${api}/web/tops`, formData, config)
}

// 获取历史 get
export const getHistoryArticle = data => {
  return axios.get(`${api}/article/tops`, { params: data })
}
// 获取历史区间 post
export const postHistoryArticle = data => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios.post(`${api}/article/tops`, formData, config)
}
