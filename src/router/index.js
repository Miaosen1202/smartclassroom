import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navBar from '@/components/navBar'
import homePage from '@/components/homePage'
import prepare from '@/components/main/prepare'
import second from '@/components/main/second'
import goTeach from '@/components/goTeach'
import course from '@/components/main/course'
import teachingMaterials from '@/components/task/teachingMaterials'
import disCussion from '@/components/task/disCussion'
import exerCises from '@/components/task/exerCises'
import assigNment from '@/components/task/assigNment'
import addMaterials from '@/components/task/addTo/addMaterials'
import addDiscussion from '@/components/task/addTo/addDiscussion'
import addExercises from '@/components/task/addTo/addExercises'
import addAssignment from '@/components/task/addTo/addAssignment'
import StartTeachingMaterials from '@/components/StartTheClass/StartTeachingMaterials'



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
          path: 'course',
          component: course,
          children:[
            {
              path :'teachingMaterials',
              component: teachingMaterials,
            },
            {
              path :'disCussion',
              component: disCussion,
            },{
              path :'exerCises',
              component: exerCises,
            },
            {
              path :'assigNment',
              component: assigNment,
            },
            {
              path: 'addMaterials',
              component: addMaterials
            },
            {
              path: 'addDiscussion',
              component: addDiscussion
            },
            {
              path: 'addExercises',
              component: addExercises
            },
            {
              path: 'addAssignment',
              component: addAssignment
            },

          ]
        },
        {
          path: 'prepare',
          component: prepare
        },
        {
          path: 'second',
          component: second
        }

      ]
    },
    {
      path: '/goTeach',
      component: goTeach,
    },
    {
      path: '/StartTeachingMaterials',
      component: StartTeachingMaterials,
    },

  ]
})
