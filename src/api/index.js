import axios from 'axios'
// import Qs from 'qs'
import { Message } from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 100000

axios.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   config.data = Qs.stringify(config.data)
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    try {
      if (response.data.errno === 2000) {
        if (response.data.errmsg) {
          Message({
            showClose: true,
            message: response.data.errmsg,
            type: 'success'
          })
        }
        return response
      }
      else {
        Message({
          showClose: true,
          message: response.data.errmsg
        })
        return false
      }
    } catch (error) {
      Message({
        showClose: true,
        message: response.data.errmsg
      })
      console.log(error)
      return false
    }
  },
  error => {
    Message(error.toString())
    Promise.reject(error)
    return false
  }
)
export default axios
