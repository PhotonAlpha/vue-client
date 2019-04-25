import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Test from './views/Test.vue'
import SubTest from './views/SubTest.vue'
import SubTest2 from './views/SubTest2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/Test.vue')
    },
    {
      path: '/test/:id',
      component: Test,
      children: [
        {
          path: '',
          component: SubTest
        },
        {
          name: 'sub1',
          path: 'sub1',
          component: SubTest
        },
        {
          name: 'sub2',
          path: 'sub2',
          component: SubTest2
        }
      ]
    }
  ]
})
