import {
  MainLayout,
  LoginLayout,
  UserLayout,
  NewsLayout,
  GamesLayout
} from '@/components/layouts'

import Login from '@/views/login'
import Register from '@/views/login/Register'
import resetPassword from '@/views/login/resetPassword'
import home from '@/views/home'
import userProject from '@/views/userProject'
import userSet from '@/views/userSet'
import userCommunity from '@/views/userCommunity'
import project from '@/views/project'
import projectSetting from '@/views/projectSetting'
import projectAuth from '@/views/projectAuth'
import projectChart from '@/views/projectChart'
import projectNew from '@/views/projectNew'
import news from '@/views/news'
import NewsDetails from '@/views/news/NewsDetails'
import Recommended from '@/views/games/Recommended'
import gamesDetails from '@/views/news/NewsDetails'

import agreement1 from '@/views/login/agreement/1agreement'
import agreement2 from '@/views/login/agreement/2agreement'
import agreement3 from '@/views/login/agreement/3agreement'

import agreement4 from '@/views/login/agreement/4agreement'

// 基础路由
export const constRouterMap = [
  {
    path: '/agreement1',
    name: 'agreement1',
    component: agreement1
  },
  {
    path: '/agreement2',
    name: 'agreement2',
    component: agreement2
  },
  {
    path: '/agreement3',
    name: 'agreement3',
    component: agreement3
  },
  {
    path: '/agreement4',
    name: 'agreement4',
    component: agreement4
  },
  // 登陆组册
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '/',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/resetPassword',
        name: 'resetPassword',
        component: resetPassword
      }
    ]
  },
  {
    path: '/',
    meta: {
      title: '首页'
    },
    component: MainLayout,
    children: [
      // 首页
      {
        path: '/',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: home
      },
      // 个人中心模块
      {
        path: '/user',
        component: UserLayout,
        children: [
          {
            path: '/my',
            name: 'apps',
            component: userProject
          },
          {
            path: '/set',
            name: 'userset',
            component: userSet
          },
          {
            path: '/community',
            name: 'community',
            component: userCommunity
          }
        ]
      },
      // 项目模块
      {
        path: 'project/:name/config',
        component: project,
        children: [
          // 设置
          {
            path: 'set',
            name: 'BaseSetting',
            component: projectSetting
          },
          // 权限
          {
            path: 'authorty',
            name: 'powerSettings',
            component: projectAuth
          },
          // 图表
          {
            path: 'chart',
            name: 'CustomSettings',
            component: projectChart
          }
        ]
      },
      // 新建项目
      {
        path: '/newapp',
        name: 'newapp',
        component: projectNew
      },
      //新闻模块
      {
        path: '/news',
        component: NewsLayout,
        children: [
          {
            path: '/',
            name: 'newscenter',
            component: news
          },
          {
            path: 'details',
            name: 'newsdetails',
            component: NewsDetails
          }
        ]
      },
      //游戏模块
      {
        path: '/games',
        component: GamesLayout,
        children: [
          {
            path: '/',
            name: 'gamesRecommended',
            component: Recommended
          },
          {
            path: 'details',
            name: 'newsdetails',
            component: gamesDetails
          }
        ]
      }
    ]
  }
]
