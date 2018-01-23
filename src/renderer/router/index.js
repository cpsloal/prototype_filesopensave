import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/file-open',
      name: 'file-open-page',
      component: require('@/components/FileOpenPage').default
    },
    {
      path: '/file-save',
      name: 'file-save-page',
      component: require('@/components/FileSavePage').default
    },
    {
      path: '/file-open-save',
      name: 'file-open-save-page',
      component: require('@/components/FileOpenSavePage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
