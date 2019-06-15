import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index.vue'

import QuestionIndex from '@/views/Question/index.vue'
import QuestionError from '@/views/Question/question_error.vue' // 错题答题

// 登录
import Login from '@/views/User/login.vue'
import Register from '@/views/User/register.vue'
import WechatLogin from '@/views/User/wechat_login.vue'

// 设置学习范围
import LearningScope from '@/views/User/learning_scope.vue'

// 答题成功
import QuestionSuccess from '@/views/Question/question_success.vue'

// 用户个人中心
import User from '@/views/User/index.vue'

// 试卷中心
import Paper from '@/views/Paper/index.vue'

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
    {path: '/question/index',name: 'question_index',component: QuestionIndex}, // 正常答题
    {path: '/question/question_error',name: 'question_error_index',component: QuestionError}, // 错题答题
    {path: '/question/question_success',name: 'question_success_index',component: QuestionSuccess},

    // 登录
    {path: '/user/login',name: 'login',component: Login}, 
    {path: '/user/register',name: 'register',component: Register}, 

    // 用户个人中心
    {path: '/user/index',name: 'user_index',component: User}, 
    {path: '/user/learning_scope',name: 'user_learning_scope',component: LearningScope}, // 设置学习范围

    // 试卷中心
    {path: '/paper/index',name: 'paper_index',component: Paper}, // 试卷中心



    // 登录
    {path: '/user/wechat/login/:openid',name: 'wechat_login',component: WechatLogin},// 微信登陆
    // {path: '/Admin/login',name: 'login',component: Login},
        
  ]
})
