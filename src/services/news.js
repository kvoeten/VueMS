import api from '@/services/api'

export default {
  getLatest () {
    return api().get('news')
  },
  getPage (id) {
    return api().get(`news/${id}`)
  },
  getArticle (id) {
    return api().get(`article/${id}`)
  },
  getDate (timestamp) {
    const date = Date.parse(timestamp)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(date) 
    return `${da} ${mo} ${ye}`
  },
  store (article) {
    return api().post(`article`, article)
  },
  update (article, id) {
    return api().put(`article/${id}`, article)
  },
  delete (id) {
    return api().delete(`article/${id}`)
  }
}
