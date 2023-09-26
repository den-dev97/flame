import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import Favorites from '@/views/favorites/index.vue'
import Peoples from '@/views/peoples/index.vue'
import Person from '@/views/peoples/_id.vue'

const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/peoples',
      name: 'peoples',
      component: Peoples
    },
    {
      path: '/peoples/:id',
      name: 'Person',
      component: Person
    }
  ]
})

export default router
