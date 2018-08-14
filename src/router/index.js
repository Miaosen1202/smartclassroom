import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import first from '@/components/main/first'
import second from '@/components/main/second'
import third from '@/components/main/third'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/first',
      component: first
    },
    {
      path: '/second',
      component: second
    },
    {
      path: '/third',
      component: third
    }
  ]
})
