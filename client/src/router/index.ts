import FriendsActivityVue from '@/views/FriendsActivity.vue'
import PeopleSearchVue from '@/views/PeopleSearch.vue'
import StatisticsVue from '@/views/Statistics.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyActivityVue from '../views/MyActivity.vue'
import StoreView from '../views/MyActivity.vue'
import SignUp from '../views/SignUp.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/workout',
      name: 'workout',
      component: Workout
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
        path: '/myactivity',
        name: 'my activity',
        component: () => import('../views/MyActivity.vue')
    },
    {
      path: '/friendsactivity',
      name: 'friends activity',
      component: FriendsActivityVue
    },
    {
      path: '/peoplesearch',
      name: 'people search',
      component: PeopleSearchVue
    },
    {
      path: '/stats',
      name: 'statistics',
      component: StatisticsVue
    },
    {
      path: '/signup',
      name: 'sign up',
      component: SignUp
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router