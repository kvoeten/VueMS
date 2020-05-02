import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { APP_TITLE, NAVIGATION_DRAWER } from '@/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    expiration: null,
    user: {
      name: APP_TITLE,
      email: 'Navigation Drawer',
      icon: '/static/assets/Error.png',
      gradecode: 0
    },
    isUserLoggedIn: false,
    drawer: NAVIGATION_DRAWER.slice(0, 6)
  },
  mutations: {
    setToken (state, info) {
      if (info) {
        state.token = info.token
        state.expiration = Date.now() + info.expires
      } else {
        state.token = null
        state.expiration = null
      }
      state.isUserLoggedIn = !!(info)
    },
    setUser (state, user) {
      state.user = user
      this.state.drawer = []
      NAVIGATION_DRAWER.forEach(entry => {
        let skipLogin = (entry.loggedin != null && (entry.loggedin !== this.state.isUserLoggedIn))
        let skipGrade = (entry.grade != null && (entry.grade > this.state.user.gradecode))
        if (!skipLogin && !skipGrade) this.state.drawer.push(entry)
      })
    }
  },
  actions: {
    setToken ({commit}, info) {
      commit('setToken', info)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    logout ({commit}) {
      commit('setToken', null)
      commit('setUser', {
        name: APP_TITLE,
        email: 'Navigation Drawer',
        icon: '/static/assets/Error.png',
        gradecode: 0
      })
    }
  }
})
