import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import SaledView from '@/views/SaledView.vue'
import StockView from '@/views/StockView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },

  {
    path: '/saled',
    name: 'saled',
    component: SaledView
  },

  {
    path: '/stock',
    name: 'stock',
    component: StockView
  },

  // 404 redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router