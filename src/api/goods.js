import axios from 'axios'
import {
  token
} from './config'
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club'
export function getGoods() {
  return axios.get('/goods', {
    params: {
      token
    }
  }).then((res) => {
    return res.data
  })
}

export function getGoodsById(goodsId) {
  return axios.get('/goodsDetail', {
    params: {
      goodsId,
      token
    }
  }).then((res) => {
    return res.data
  })
}
