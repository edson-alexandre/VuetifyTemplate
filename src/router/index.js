import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../components/user/UserList'
import User from '../components/user/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usuario',
    name: 'UserList',
    component: UserList
  },    
  {
    path: '/usuario/:id',
    name: 'User',
    component: User
  },    
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
