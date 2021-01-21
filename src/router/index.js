import Vue from 'vue'
import VueRouter from 'vue-router'
import Payment from '../views/Payment.vue'
import Success from '../views/Success.vue'
import Failed from '../views/Failed.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'payment',
    component: Payment
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/failed',
    name: 'failed',
    component: Failed
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
