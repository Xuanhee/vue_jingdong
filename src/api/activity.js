import axios from 'axios'
import {
  token
} from './config'

export function getActivity() {
  return axios.get('/activitys', {
    params: {
      token
    }
  }).then((res) => {
    return res.data
  })
}
