// 获取数据的token
import {
  token
} from './config'
import axios from 'axios'

// 设置拦截器, interceptors 请求头处理
// axios.interceptors.request.use((config) => {
//   if (config.params) {
//     config.params.token = token
//   } else {
//     config.params = {
//       token
//     }
//   }
// 处理完之后返回config
//   return config
// })
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club'

export function getSwiper() {
  return axios.get('/swiper', {
    params: {
      token
    }
  }).then((res) => {
    return res.data
  })
}
