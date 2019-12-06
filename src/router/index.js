import Vue from 'vue'
import Router from 'vue-router'


// import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '*',
        component: () => import('@/views/404')
    },
    {
      path: '/login', // 默认页面重定向到主页
      // name: 'Home',
       component: () => import('@/views/login/index'),
    },
    {
      path: '/', // 默认页面重定向到主页
      // name: 'Home',
      redirect:'/home',
    },{
      path:'/home', //主路由
      component: () => import('@/layout/index'),
      children:[ // 嵌套子路由
        {
          path:'table',
          name:'one', // 路由名称
          component: () => import('@/views/Table'),
        },
        {
          path:'form',
          component: () => import('@/views/Form'),
        }
      ]
    }
  ]




const createRouter = () => new Router({
  scrollBehavior:() => ({y:0}),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()


  router.matcher = newRouter.matcher // ？
}

export default router
