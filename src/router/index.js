import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  
  {
    path: '/',
    
    component: Layout,
    redirect: '/dashboard',
    name: '智慧分子实验室',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/person',
  //   component: Layout,
  //   redirect: '/person/list',
  //   name: '人员管理',
  //   meta: { title: '人员管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '人员管理',
  //       component: () => import('@/views/person/list'),
  //       meta: { title: '人员管理', icon: 'table' }
  //     }
  //     ,
  //     {
  //       path: 'update/:id',
  //       name: '人员编辑',
  //       component: () => import('@/views/person/update'),
  //       meta: { title: ' 人员修改',  icon: 'table'  },
  //       hidden: true
  //     }, 
  //   ]
  // },
   //{ path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // {
  //   path: '/person',
  //   component: Layout,
  //   redirect: '/person/list',
  //   name: '人员管理',
  //   meta: { title: '人员管理', icon: 'example',roles: ['4'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '人员管理',
  //       component: () => import('@/views/person/list'),
  //       meta: { title: '人员管理', icon: 'table' }
  //     }
  //     ,
  //     {
  //       path: 'update/:id',
  //       name: '人员编辑',
  //       component: () => import('@/views/person/update'),
  //       meta: { title: ' 人员修改',  icon: 'table'  },
  //       hidden: true
  //     }, 
  //   ]
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test1',
  //   name: '测试',
  //   meta: { title: '测试', icon: 'example',roles: ['1'] },
  //   children: [
  //     {
  //       path: 'index',
  //       name: '测试',
  //       component: () => import('@/views/test/test1'),
  //       meta: { title: '测试', icon: 'example' }
  //     },{
  //       path: 'detail_test',
  //       name: '测试详情',
  //       component: () => import('@/views/sample/detail_test'),
  //       meta: { title: '测试详情', icon: 'example' }
  //     },{
  //       path: 'detail_test2',
  //       name: '测试详情2',
  //       component: () => import('@/views/sample/detail_test2'),
  //       meta: { title: '测试详情2', icon: 'example' }
  //     }
  //   ]
  // },
  //10
  {
    path: '/warning',
    component: Layout,
    redirect: '/warning/index',
    name: '样本预警',
    meta: { title: '样本预警', icon: 'example',roles: ['1'] },
    children: [
      // {
      //   path: 'index',
      //   name: '样本预警',
      //   component: () => import('@/views/warning/index'),
      //   meta: { title: '样本预警', icon: 'example' }
      // },
      {
        path: 'sampleWarning',
        name: '样本预警',
        component: () => import('@/views/warning/sampleWarning'),
        meta: { title: '样本预警', icon: 'example' }
      },{
        path: 'sampleGeneral',
        name: '实验室概况',
        component: () => import('@/views/warning/sampleGeneral'),
        meta: { title: '实验室概况', icon: 'example' }
      },{
        path: 'sampleForecast',
        name: '实验室检测能力预测预警',
        component: () => import('@/views/warning/sampleForecast'),
        meta: { title: '实验室检测能力预测预警', icon: 'example' }
      },{
        path: 'sampleDetail',
        name: '采样数据详情',
        component: () => import('@/views/warning/sampleDetail'),
        meta: { title: '采样数据详情', icon: 'example' }
      },{
        path: 'sampleMap',
        name: '各采样点数据',
        component: () => import('@/views/warning/sampleMap'),
        meta: { title: '各采样点数据', icon: 'example' }
      }
      // ,{
      //   path: 'labVideo',
      //   name: '实验室监控',
      //   component: () => import('@/views/warning/labVideo'),
      //   meta: { title: '实验室监控', icon: 'example' }
      // }
    ]
  },
  {
    path: '/sample',
    component: Layout,
    redirect: '/sample/select',
    name: '样本中心',
    meta: { title: '样本中心', icon: 'example',roles: ['1'] },
    children: [
      {
        path: 'select',
        name: '样本查询',
        component: () => import('@/views/sample/select'),
        meta: { title: '样本查询', icon: 'example' }
      },{
        path: 'pdf1',
        name: '样本查询说明',
        component: () => import('@/views/sample/pdf1'),
        meta: { title: '样本查询说明', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
      {
        path: 'select_detail',
        name: '样本详情',
        component: () => import('@/views/sample/select_detail'),
        meta: { title: '样本详情', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
      {
        path: 'receive',
        name: '样本接收',
        component: () => import('@/views/sample/receive'),
        meta: { title: '样本接收', icon: 'example' }
      },{
        path: 'detail2',
        name: '样本接收详情',
        component: () => import('@/views/sample/detail2'),
        meta: { title: '样本接收详情', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
      {
        path: 'progress',
        name: '样本进度',
        component: () => import('@/views/sample/progress'),
        meta: { title: '样本进度', icon: 'example' }
      },
      {
        path: 'result',
        name: '样本结果',
        component: () => import('@/views/sample/result'),
        meta: { title: '样本结果', icon: 'example' }
      },{
        path: 'detail',
        name: '实验结果详情',
        component: () => import('@/views/sample/detail'),
        meta: { title: '实验结果详情', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
    ]
  },
  {
    path: '/Basic_data_settings',
    component: Layout,
    redirect: '/Basic_data_settings/Detection_threshold',
    name: '基础数据设置',
    meta: { title: '基础数据设置', icon: 'example',roles: ['1'] },
    children: [
      {
        path: 'Detection_threshold',
        name: '检测量阈值设置',
        component: () => import('@/views/Basic_data_settings/Detection_threshold'),
        meta: { title: '检测量阈值设置', icon: 'example' }
      },{
        path: 'pdf1',
        name: '基础数据设置说明',
        component: () => import('@/views/Basic_data_settings/pdf1'),
        meta: { title: '基础数据设置说明', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
      {
        path: 'forecast_DSdefault',
        name: '大筛样本预测设置',
        component: () => import('@/views/Basic_data_settings/forecast_DSdefault'),
        meta: { title: '大筛样本预测设置', icon: 'example' }
      },
      {
        path: 'instrumentinfo',
        name: '仪器管理',
        component: () => import('@/views/Basic_data_settings/instrumentinfo'),
        meta: { title: '仪器管理', icon: 'example' }
      }
    ]
  },
  // {
  //   path: '/performance',
  //   component: Layout,
  //   redirect: '/performance/performancedetail',
  //   name: '绩效管理',
  //   meta: { title: '绩效管理', icon: 'example',roles: ['1'] },
  //   children: [
  //     // {
  //     //   path: 'Detection_threshold',
  //     //   name: '样本接收1',
  //     //   component: () => import('@/views/performance/performancedetail'),
  //     //   meta: { title: '样本接收1', icon: 'example' }
  //     // },
  //     {
  //       path: 'forecast_DSdefault',
  //       name: '绩效管理',
  //       component: () => import('@/views/performance/performancemanage'),
  //       meta: { title: '绩效管理', icon: 'example' }
  //     },{
  //       path: 'pdf1',
  //       name: '绩效管理说明',
  //       component: () => import('@/views/performance/pdf1'),
  //       meta: { title: '绩效管理说明', icon: 'tree' },
  //       query:{
  //         //batch_number:this.multipleSelection
         
  //       },
  //       hidden:true
  //     },
  //   ]
  // },
  {
    path: '/smartLab',
    component: Layout,
    redirect: '/smartLab/labOperation',
    name: '迎检',
    meta: { title: '迎检', icon: 'example',roles: ['1'] },
    children: [
      // {
      //   path: 'labOperation',
      //   name: '实验室运行图',
      //   component: () => import('@/views/smartLab/labOperation'),
      //   meta: { title: '实验室运行图', icon: 'table' }
      // },
      {
        path: 'pdf1',
        name: '迎检说明',
        component: () => import('@/views/smartLab/pdf1'),
        meta: { title: '迎检说明', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
      {
        path: 'labAptitude',
        name: '实验室资质',
        component:() => import('@/views/smartLab/labAptitude'),
        meta:{ title: '实验室资质', icon: 'table' }
      },
      {
        path: 'labAptitudeAdd',
        name: '实验室资质添加',
        component:() => import('@/views/smartLab/labAptitudeAdd'),
        meta:{ title: '实验室资质添加', icon: 'table' },
        hidden: true
      },

      {
        path: 'personInformation',
        name: '人员资质',
        component:() => import('@/views/smartLab/personInformation'),
        meta:{ title: '人员资质', icon: 'table' }
      },
      {
        path:'personInformationAdd',
        name:'添加人员资质',
        component:() => import('@/views/smartLab/personInformationAdd'),
        meta:{ title: '添加人员资质', icon: 'table' },
        hidden:true
      },
      {
        path:'personInformationDetail/:id',
        name:'人员信息详情',
        component:() => import('@/views/smartLab/personInformationDetail'),
        meta:{ title: '人员信息详情', icon: 'table' },
        hidden:true
      }
      // ,{
      //   path: 'cameraDetail',
      //   name: '视频监控',
      //   component: () => import('@/views/smartLab/cameraDetail'),
      //   meta: { title: '视频监控', icon: 'table' }
      // },
    ]
  },
  // {
  //   path: '/point',
  //   component: Layout,
  //   redirect: '/point/point',
  //   name: '采样点设置管理',
  //   meta: { title: '采样点设置管理', icon: 'example',roles: ['2'] },
  //   children: [
  //     {
  //       path: 'updatepoint/:id',
  //       name: '修改采样点',
  //       component: () => import('@/views/point/updatepoint'),
  //       hidden: true,
  //       meta: { title: '修改采样点', icon: 'table' }
  //     },
  //     {
  //       path: 'point',
  //       name: '采样点列表',
  //       component: () => import('@/views/point/point'),
  //       meta: { title: '采样点列表', icon: 'table'}
  //     },    
  //     {
  //       path: 'scheduling',
  //       name: '班次列表',
  //       component: () => import('@/views/point/scheduling'),
  //       meta: { title: '班次列表', icon: 'table' }
  //     } 
  //     ,     
  //     {
  //       path: 'updatesch',
  //       name: '人员编辑',
  //       component: () => import('@/views/point/updatesch'),
  //       meta: { title: ' 班次修改', icon: 'table' },
  //       hidden: true
  //     },   
  //     {
  //       path: 'paiban/:channelId',
  //       name: '人员排班',
  //       component: () => import('@/views/point/paiban'),
  //       meta: { title: ' 采样点排班', icon: 'table' },
  //       // hidden: true
  //     }, 
  //     {
  //       path: 'addpanban',
  //       name: '排班编辑',
  //       component: () => import('@/views/point/addpanban'),
  //       meta: { title: ' 排班编辑', icon: 'table' },
  //        hidden: true
  //     },
  //   ]
  // },
  // {
  //   path: '/hospset',
  //   component: Layout,
  //   redirect: '/hospset/list',
  //   name: '设置管理',
  //   meta: { title: '智能排班', icon: 'example',roles: ['3'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '设置列表',
  //       component: () => import('@/views/labset/list'),
  //       meta: { title: '实验室管理列表', icon: 'table' }
  //     },
  //     {
  //       path: 'add',
  //       name: '实验室设置添加',
  //       component: () => import('@/views/labset/add'),
  //       meta: { title: '实验室设置添加', icon: 'tree' },
  //       hidden:true
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: '实验室修改',
  //       component: () =>import('@/views/labset/add'),
  //       meta: { title: '编辑', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'hosp/list',
  //       name: '班次管理',
  //       component: () => import('@/views/hosp/list'),
  //       meta: { title: '班次管理', icon: 'table' },
  //       hidden: false
  //     },
  //     {
  //       path: 'hosp/add2',
  //       name: '排班添加',
  //       component: () =>import('@/views/hosp/schedule'),
  //       meta: { title: '排班添加', icon: 'tree'  },
  //       hidden:true

  //     },
  //     {
  //       path: 'hosp/edit2/:id',
  //       name: '排班修改',
  //       component: () =>import('@/views/hosp/schedule'),
  //       meta: { title: '编辑', noCache: true },
  //       hidden: true
  //     },
  //     // {
  //     //   path: 'hosp/labSchedule',
  //     //   name: '实验室排班管理',
  //     //   component: () => import('@/views/hosp/labSchedule'),
  //     //   meta: { title: '实验室排班管理', icon: 'table' },
  //     //   hidden: false
  //     // },
  //     {
  //       path: 'updatepoint/:id',
  //       name: '实验室排班',
  //       component: () => import('@/views/labset/labpaiban'),
  //       meta: { title: '实验室排班', icon: 'table' }
  //     },     
  //     {
  //       path: 'updatepaiban',
  //       name: '编辑排班',
  //       component: () => import('@/views/labset/updatepaiban'),
  //       meta: { title: '编辑排班', icon: 'table'},
  //       hidden:true
  //     },  

  //     // {
  //     //   path: 'hosp/edit/:id',
  //     //   name: 'schedule',
  //     //   component: () =>import('@/views/hosp/add'),
  //     //   meta: { title: '编辑', noCache: true },
  //     //   hidden: true
  //     // },
  //     // {
  //     //   path: 'hospital/show/:id',
  //     //   name: '查看',
  //     //   component: () => import('@/views/hosp/show'),
  //     //   meta: { title: '查看', noCache: true },
  //     //   hidden: true
  //     // },
  //     // {
  //     //   path: 'hospital/schedule/:hoscode',
  //     //   name: '排班',
  //     //   component: () => import('@/views/hosp/schedule'),
  //     //   meta: { title: '排班', icon: 'table' },
  //     //   hidden: false
  //     // }        
  //   ]
  // },
   {
    path: '/car',
    component: Layout,
    redirect: '/car/list',
    name: '转运车辆排班',
    alwaysShow: true,
    meta: { title: '智能调度', icon: 'example',roles: ['1'] },
    children: [
      
      {
        path: 'list',
        name: '车辆管理',
        component: () => import('@/views/car/list'),
        meta: { title: '车辆管理', icon: 'table' }
      },{
        path: 'pdf1',
        name: '迎检说明',
        component: () => import('@/views/car/pdf1'),
        meta: { title: '迎检说明', icon: 'tree' },
        query:{
          //batch_number:this.multipleSelection
         
        },
        hidden:true
      },
      {
        path: 'add',
        name: '车辆添加',
        component: () => import('@/views/car/add'),
        meta: { title: '车辆添加', icon: 'tree' },
        hidden:true
      },
      {
        path: 'edit/:id',
        name: '车辆修改',
        component: () =>import('@/views/car/add'),
        meta: { title: '编辑', noCache: true },
        hidden: true
      },
      {
        path: 'route/list',
        name: '转运路线管理',
        component: () => import('@/views/route/list'),
        meta: { title: '转运路线管理', icon: 'table' }
      },
      {
        path: 'show/:id',
        name: '路线修改',
        component: () =>import('@/views/route/show'),
        meta: { title: '路线修改', noCache: true },
        hidden: true
      },
      // {
      //   path: 'add2',
      //   name: '路线方案名称',
      //   component: () => import('@/views/route/add'),
      //   meta: { title: '路线添加', icon: 'tree' }
      // },
      {
        path: 'add2/',
        name: '路线添加',
        component: () => import('@/views/route/add'),
        meta: { title: '路线添加', icon: 'tree' },
        hidden:true
      },
      // {
      //   path: 'lie/',
      //   name: '动态添加列',
      //   component: () => import('@/views/route/lie'),
      //   meta: { title: '动态添加列', icon: 'tree' }
      // },
      {
        path: 'edit2/:id',
        name: '路线修改',
        component: () =>import('@/views/route/add'),
        meta: { title: '路线修改', noCache: true },
        hidden: true
      },
      {
        path: 'route/schedule',
        name: '车辆排班管理',
        component: () => import('@/views/route/schedule'),
        meta: { title: '车辆排班管理', icon: 'table' }
      },      
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userInfo/list',
    name: 'userInfo',
    meta: { title: '用户管理', icon: 'table' },
    alwaysShow: true,
    hidden:true,
    children: [
      {
        path: 'userInfo/list',
        name: '用户列表',
        component: () =>import('@/views/user/userInfo/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'userInfo/show/:id',
        name: '用户查看',
              component: () =>import('@/views/user/userInfo/show'),
        meta: { title: '用户查看' },
        hidden: true
      },
      {
        path: 'userInfo/authList',
        name: '认证审批列表',
              component: () =>import('@/views/user/userInfo/authList'),
        meta: { title: '认证审批列表', icon: 'table' }
      }      
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/order/index',
    name: 'BasesInfo',
    meta: { title: '统计管理', icon: 'table' },
    alwaysShow: true,
    hidden:true,
    children: [
        {
          path: 'order/index',
          name: '预约统计',
          component: () =>import('@/views/statistics/order/index'),
          meta: { title: '预约统计' }
        }
      ]
  },  
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    hidden:true,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   hidden:true,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  {
    path: '/root',
    component: Layout,
    redirect: '/root/total',
    name: '排班总览',
    hidden:true,
    meta: { title: '排班总览', icon: 'example',roles: ['1'] },
    children: [
      {
        path: 'total',
        name: '排班总览',
        component: () => import('@/views/root/total'),
        meta: { title: '排班总览', icon: 'table' }
      },
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },



   { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
  
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router


// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })
