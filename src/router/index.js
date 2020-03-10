import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
const GoodsList = () => import('components/goods-list/goods-list')
const GoodsDetail = () => import('components/goods-list/goods-detail')
const Buy = () => import('components/buy/buy')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: GoodsList
  },
  {
    path: '/goods-detail',
    name: 'goods-detail',
    component: GoodsDetail
  },
  {
    path: '/buy',
    name: 'buy',
    component: Buy
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
