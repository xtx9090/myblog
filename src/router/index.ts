/**
 * 路由配置
 * 定义应用的所有路由规则，包括路径、组件和重定向
 */

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // 使用 HTML5 History 模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes: [
    // 根路径重定向到文章列表页
    {
      path: '/',
      redirect: '/articles'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/HomePage.vue')
    },
    // 文章列表页
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/pages/ArticlesPage.vue')
    },
    // 文章详情页（动态路由）
    {
      path: '/articles/:id',
      name: 'articleDetail',
      component: () => import('@/pages/ArticleDetailPage.vue')
    },
    // 新建文章页
    {
      path: '/articles/new',
      name: 'articleNew',
      component: () => import('@/pages/ArticleEditPage.vue')
    },
    // 编辑文章页（动态路由）
    {
      path: '/articles/:id/edit',
      name: 'articleEdit',
      component: () => import('@/pages/ArticleEditPage.vue')
    },
    // 联系页
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactPage.vue')
    }
  ],
  // 路由切换时的滚动行为：滚动到页面顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

