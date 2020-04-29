import api from '@/services/api'
import { CLIENT_ID, CLIENT_SECRET } from '@/config'

export default {
  register (credentials) {
    return api().post('register', credentials)
  },
  login (credentials) {
    const auth = {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }
    return api().post('oauth/token', { ...credentials, ...auth })
  },
  user () {
    return api().get('user')
  }
}
