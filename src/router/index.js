import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navBar from '@/components/navBar'
import homePage from '@/components/homePage'
import first from '@/components/main/first'
import second from '@/components/main/second'
import third from '@/components/main/third'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/navBar',
      component: navBar
    },
    {
      path: '/homePage',
      component: homePage,
      children:[
        {
          path: 'first',
          component: first
        },
        {
          path: 'second',
          component: second
        },
        {
          path: 'third',
          component: third
        }
      ]
    }
  ]
})
