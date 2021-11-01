import Vue from 'vue'
import VueRouter from 'vue-router'
import mainpage from '@/views/MainPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    component: mainpage
  },

  {
    path: '*',
    redirect: '/main'
  }
]

const router = new VueRouter({
  routes
})

export default router
