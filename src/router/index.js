import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const layout = {
  path: '/layout',
  name: 'layout',
  component: () => import('../views/layout.vue'),
  children: [
    {
      path: '/websiteList',
      name: 'websiteList',
      meta: {
        title: '网站列表'
        // doNotNeedSubmenuChildren: true
      },
      component: () => import('../views/websiteList.vue')
    },
    {
      path: '/articleList',
      name: 'articleList',
      meta: {
        title: '文章列表'
      },
      component: () => import('../views/articleList.vue')
    },
    {
      path: '/historicalRanking',
      name: 'historicalRanking',
      props: route => ({ query: route.query }),
      meta: {
        title: '历史排名',
        navDoNot: true
      },
      component: () => import('../views/historicalRanking.vue')
    }
  ]
}
const index = {
  path: '',
  name: 'index',
  redirect: '/login'
}
const other = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  }
]

export default new Router({
  // mode: 'history',
  routes: [
    index,
    layout,
    ...other
  ]
})
