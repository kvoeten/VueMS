import api from '@/services/api'

export default {
  get () {
    return api().get('ranking/top')
  },
  query (query) {
    return api().get(`ranking`, {
      params: query
    })
  }
}
