import type { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout/index.vue'
import CreateFilm from '@/views/film/CreateFilm.vue'
import CreateRoom from '@/views/room/CreateRoom.vue'
import useAuth from '@hooks/useAuth'
import FilmView from '@views/film/index.vue'
import LoginView from '@views/login/index.vue'
import PositionView from '@views/position/index.vue'
import RoomView from '@views/room/index.vue'
import ScheduleView from '@views/schedule/index.vue'
import SeatView from '@views/seat/index.vue'
import TicketView from '@views/ticket/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const { isAuth } = useAuth()

const routes: RouteRecordRaw[] = [
  { path: '/login', component: LoginView, name: 'login' },
  {
    path: '/',
    redirect: { name: 'cinema' },
    component: LayoutView,
    children: [
      { path: 'cinema', name: 'cinema', component: PositionView, meta: { title: 'Cinema' } },
      { path: 'room', name: 'room', component: RoomView, meta: { title: 'Room' } },
      { path: 'room/create', name: 'create-room', component: CreateRoom, meta: { title: 'Create room', activeRoute: 'room' } },
      // { path: 'seat', name: 'seat', component: SeatView, meta: { title: 'Seat' } },
      { path: 'film', name: 'film', component: FilmView, meta: { title: 'Film' } },
      { path: 'film/create', name: 'create-film', component: CreateFilm, meta: { title: 'Create film', activeRoute: 'film' } },
      { path: 'schedule', name: 'schedule', component: ScheduleView, meta: { title: 'Schedule' } },
      { path: 'ticket', name: 'ticket', component: TicketView, meta: { title: 'Ticket' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (!isAuth.value) {
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
