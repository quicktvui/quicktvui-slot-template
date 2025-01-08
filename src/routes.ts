import home from './views/home.vue'
import clock from "./views/clock/index.vue"
import qlist from "./views/qlist/index.vue"

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/clock',
    name: 'clock',
    component: clock
  },
  {
    path: '/qlist',
    name: 'qlist',
    component: qlist
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('./views/error.vue')
  }
]

export default routes
