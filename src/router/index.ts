import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@views/login/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/login', component: LoginView, name: 'login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')

  if (!token) {
    if (to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    if (to.name === 'login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
