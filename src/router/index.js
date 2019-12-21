import Vue from 'vue'
import Router from 'vue-router'


// import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  // 不存在的路由
  {
    path: '*',
    component: () => import('@/views/404')
  },
  // 跟路由重定向
  {
    path: '/', // 默认页面重定向到主页
    // name: 'Home',
    component: () => import('@/views/login/index'),
  },
  // 主页路由
  {
    path: '/index', // 默认页面重定向到主页
    // name: 'Home',
    component: () => import('@/views/index/index'),
  },
  {
    path: '/dishboard', //主路由
    component: () => import('@/layout/index'),
    redirect: '/dishboard/index',
    children: [ // 嵌套子路由
      {
        path: '/dishboard/index',
        name: 'dishboard', // 路由名称
        component: () => import('@/views/Dishboard'),
      }
    ]
  },
  {
    path: '/example', //主路由
    component: () => import('@/layout/index'),
    redirect: '/example/table',
    children: [ // 嵌套子路由

      {
        path: 'table',
        name: 'table', // 路由名称
        component: () => import('@/views/Table'),
      },
      {
        path: 'form',
        component: () => import('@/views/Form'),
      }
    ]

  },
  {
    path: '/execl', //主路由
    component: () => import('@/layout/index'),
    redirect: '/execl/export-excel',
    children: [ // 嵌套子路由
      {
        path: 'export-excel',
        name: 'export-excel', // 路由名称
        component: () => import('@/views/execl/ExportExcel'),
      },
      {
        path: 'export-select-excel',
        component: () => import('@/views/execl/ExportSelectExcel'),
      },
      {
        path: 'export-merge-header',
        name: 'export-merge-header', // 路由名称
        component: () => import('@/views/execl/ExportMergeHeader'),
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/execl/UploadExcel'),
      }
    ]
  },
  {
    path: '/table', //主路由
    component: () => import('@/layout/index'),
    redirect: '/table/dynamic-tables',
    children: [ // 嵌套子路由
      {
        path: 'dynamic-table',
        name: 'dynamic-table', // 路由名称
        component: () => import('@/views/table/dynamic-table'),
      },
      {
        path: 'darg-table',
        // name: 'darg-table',
        component: () => import('@/views/table/darg-table'),
      },
      {
        path: 'inline-edit',
        // name: 'inline-edit', // 路由名称
        component: () => import('@/views/table/inline-edit'),
      },
      {
        path: 'complex-table',
        component: () => import('@/views/table/complex-table'),
      }
    ]
  }
]


const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()


  router.matcher = newRouter.matcher // ？
}

export default router
