import Vue from 'vue'
import Router from 'vue-router'
import Callback from '@/views/Callback.vue'
import PhotoIndex from '@/views/Index.vue'
import PhotoShow from '@/views/Show.vue'
import BookmarkIndex from '@/views/Bookmark.vue'
import PhotoForm from '@/views/Form.vue'
import CheckUser from '@/views/CheckUser.vue'
import NotFound from '@/views/NotFound.vue'
import UnAuthorized from '@/views/UnAuthorized.vue'

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

    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookmarkIndex,
      beforeEnter: (to, from, next) => {

        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          next()
        } else { // trigger auth0 login
          router.app.$auth.login()
        }
      }
    },

    { path: '/not-found', component: NotFound },
    { path: '/unauthenticated', component: UnAuthorized },

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

