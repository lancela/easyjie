import axios from 'axios';
import {
  MessageBox,
  Message
} from 'element-ui'

// 对axios 进行封装,创建一个新的axios对象
const serveice = axios.create({
  baseURL: 'http://134.175.100.63:6677/',
  timeout: 5000
})

// 请求数据前的拦截器
serveice.interceptors.request.use(
  config => {
    // 在这对请求进行相应的处理， 例如加token
    return config
  },
  error => {
    //  请求出错时，做相应的处理
    console.log(error);
    return Promise.reject(error)
  }
)

// 数据返回前的拦截器
serveice.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return res.data
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default serveice
