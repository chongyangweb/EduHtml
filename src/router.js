import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index.vue'

import QuestionIndex from '@/views/Question/index.vue'

// 404视图
// import Error404 from '@/views/Error/404.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },

    // 404 page must be placed at the end !!!
    // {path: '*', redirect: '/404', hidden: true },
    // {path: '/404',name: '404',component: Error404},
    {path: '/Question/index',name: 'question_index',component: QuestionIndex},
    // 登录
    // {path: '/Admin/login',name: 'login',component: Login},
        
  ]
})
