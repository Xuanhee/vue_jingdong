import axios from 'axios'
import {
  token
} from './config'

export function getSeconds() {
  return axios.get('/seconds', {
    params: {
      token
    }
  }).then((res) => {
    return res.data
  })
}
