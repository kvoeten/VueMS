import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import News from '@/components/News/News'
import Article from '@/components/News/Article'
import Editor from '@/components/News/Editor'
import Ranking from '@/components/Ranking/Ranking'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/news/edit/:id',
      name: 'edit',
      component: Editor
    },
    {
      path: '/news/edit',
      name: 'new',
      component: Editor
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '*',
      redirect: 'home'
    }
  ]
})
