import axios from '../index'
const { api } = require('@/dev')
const config = {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
}

// 获取table 列表数据
export const getTableList = data => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios.post(`${api}/article/get`, formData)
}
// 增加选项
export const addListData = data => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios.post(`${api}/article/insert`, formData, config)
}
// 编辑选项
export const editListData = data => {
  let formData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }
  return axios.post(`${api}/article/update`, formData, config)
}
// 删除接口
export const deleteListData = data => {
  let formData = new FormData()
  // let arr = []
  for (let i in data) {
    // arr.push(data[i].id)
    formData.append('id', data[i].id)
  }
  return axios.post(`${api}/article/delete`, formData, config)
}
