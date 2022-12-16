import FriendsActivityVue from '@/views/FriendsActivity.vue'
import PeopleSearchVue from '@/views/PeopleSearch.vue'
import StatisticsVue from '@/views/Statistics.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyActivityVue from '../views/MyActivity.vue'
import StoreView from '../views/MyActivity.vue'
import SignUp from '../views/SignUp.vue'
import UserEdit from '../views/admin/UserEdit.vue'
import UserImages from '../views/admin/UserImages.vue'
import UsersListVue from '@/views/admin/UsersList.vue'
import session from '@/stores/session'
import AccessDenied from '../views/AccessDenied.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
        path: '/myactivity',
        name: 'my activity',
        component: () => import('../views/MyActivity.vue'),
        beforeEnter: (to, from, next) => {
            if (session.user) {
                next();
            } else {
                next('/accessdenied');
            }
        } 
    },
    {
      path: '/accessdenied',
      name: 'access denied',
      component: AccessDenied
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
      path: '/admin/users',
      name: 'admin_users',
      component: UsersListVue
    },
    {
      path: '/admin/user/:id',
      name: 'admin_user_edit',
      component: () => import('../views/admin/UserEdit.vue')
    },
    {
      path: '/admin/user_image/:id',
      name: 'admin_user_images',
      component: () => import('../views/admin/UserImages.vue')
    }
  ]
})

export default router