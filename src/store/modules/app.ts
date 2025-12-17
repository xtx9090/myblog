/**
 * 应用状态管理模块
 * 管理全局应用状态，如主题切换等
 */

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  // 状态定义
  state: () => ({
    // 是否为深色主题
    isDark: false
  }),
  // 操作方法
  actions: {
    /**
     * 切换主题（深色/浅色）
     * 切换 isDark 状态并更新 DOM 类名
     */
    toggleTheme() {
      this.isDark = !this.isDark
      // 在根元素上切换 'dark' 类名，用于 CSS 主题切换
      document.documentElement.classList.toggle('dark', this.isDark)
    }
  }
})

