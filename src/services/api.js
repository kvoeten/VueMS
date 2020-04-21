import axios from 'axios'
import store from '@/store/store'
import { API_URL } from '@/config'

export default () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
