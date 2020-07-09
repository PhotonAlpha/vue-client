import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout(src/layout/index.vue) */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: 'dashboard', icon: 'fas fa-tachometer-alt' }
  //     }
  //   ]
  // },
  {
    path: '/java',
    component: Layout,
    children: [
      {
        path: '/java',
        name: 'java',
        component: () => import('@/views/java/index'),
        meta: { title: 'java', icon: 'fab fa-java' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/springboot',
    children: [
      {
        path: '/springboot',
        name: 'spring-boot',
        component: () => import('@/views/springboot/index'),
        meta: { title: 'springboot', icon: 'fas fa-seedling' }
      },
      {
        path: '/blog/:sha',
        hidden: true,
        name: 'spring-details',
        component: () => import('@/views/details/index'),
        meta: { title: 'springdetails', icon: 'fas fa-bolt' }
      }
    ]
  },
  {
    path: '/springcloud',
    component: Layout,
    children: [
      {
        path: '/springcloud',
        name: 'spring-cloud',
        component: () => import('@/views/springcloud/index'),
        meta: { title: 'springcloud', icon: 'fab fa-cloudversify' }
      }
    ]
  },
  {
    path: '/docker',
    component: Layout,
    children: [
      {
        path: '/docker',
        name: 'docker',
        component: () => import('@/views/docker/index'),
        meta: { title: 'docker', icon: 'fas fa-bolt' }
      }
    ]
  },
  {
    path: '/javascript',
    component: Layout,
    meta: { title: 'javascript', icon: 'fas fa-seedling' },
    children: [
      {
        path: '/vue',
        name: 'vue-framework',
        component: () => import('@/views/vue/index'),
        meta: { title: 'vue', icon: 'fas fa-seedling' }
      },
      {
        path: '/react',
        name: 'react-framework',
        component: () => import('@/views/react/index'),
        meta: { title: 'react', icon: 'fas fa-bolt' }
      },
      {
        path: '/graphQL',
        name: 'graphQL',
        component: () => import('@/views/graphQL/index'),
        meta: { title: 'graphQL', icon: 'fas fa-tape' }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('@/views/auth/index'),
    hidden: true
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: 'about', icon: 'fas fa-bullseye' }
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/test/index'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: process.env.VUE_APP_SRC, // when enable the history module, shoud keep the base path same with public path(e.g. publicPath: '/alarm/', the VUE_APP_SRC = '/alarm')
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
