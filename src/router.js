import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from "@/views/About.vue"
import Callback from '@/views/Callback.vue'
import PhotoIndex from '@/views/Index.vue'
import PhotoShow from '@/views/Show.vue'
import PhotoForm from '@/views/Form.vue'
import CheckUser from '@/views/CheckUser.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: PhotoIndex,
    },

    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: (to, from, next) => {

        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          next()
        } else { // trigger auth0 login
          router.app.$auth.login()
        }
      }
    },

    {
      path: '/photos/create', component: PhotoForm, meta: { mode: 'create' }
    },

    {
      path: '/photos/:id/edit', component: PhotoForm, meta: { mode: 'edit' }
    },
    
    {
      path: '/photos/:id', component: PhotoShow
    },

    {
      path: '/photos', component: PhotoIndex
    },

    { path: '/not-found', component: NotFound },

    { path: '*', component: NotFound },

    {
      path: '/check', 
      name: 'check',
      component: CheckUser,
      beforeEnter: (to, from, next) => {

        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          next()
        } else { // trigger auth0 login
          router.app.$auth.login()
        }
      }
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    }
  ]
})



export default router

