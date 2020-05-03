import api from '@/services/api'

export default {
  getLatest () {
    return api().get('news')
  },
  getPage (id) {
    return api().get(`news/${id}`)
  }
}
