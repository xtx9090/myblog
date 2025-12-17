/**
 * Pinia 状态管理入口文件
 * 创建 Pinia 实例并导出所有 store 模块
 */

import { createPinia } from 'pinia'

// 创建 Pinia 实例
const pinia = createPinia()

// 导出 Pinia 实例（供 main.ts 使用）
export default pinia
// 导出所有 store 模块
export * from './modules/app'

