/**
 * 文章评论 Composable
 * 提供评论的增删改查功能，使用 localStorage 进行数据持久化
 */

import { ref } from 'vue'

/**
 * 评论项类型
 */
export type CommentItem = {
  id: number // 评论唯一标识（时间戳）
  author: string // 评论作者（默认为"匿名"）
  content: string // 评论内容
  createdAt: string // 创建时间（ISO 格式）
}

/**
 * 文章评论管理 Composable
 * @param storageKey localStorage 存储键名，默认为 'article-comments'
 * @returns 评论映射、加载评论、获取评论、添加评论等函数
 */
export const useArticleComments = (storageKey = 'article-comments') => {
  // 评论映射：文章 ID -> 评论列表
  const commentsMap = ref<Record<number, CommentItem[]>>({})

  /**
   * 从 localStorage 加载评论数据
   */
  const loadComments = () => {
    try {
      const saved = localStorage.getItem(storageKey)
      commentsMap.value = saved ? JSON.parse(saved) : {}
    } catch (_e) {
      commentsMap.value = {}
    }
  }

  /**
   * 持久化评论数据到 localStorage
   */
  const persistComments = () => {
    localStorage.setItem(storageKey, JSON.stringify(commentsMap.value))
  }

  /**
   * 获取指定文章的评论列表
   * @param articleId 文章 ID
   * @returns 评论列表，如果文章没有评论则返回空数组
   */
  const getComments = (articleId: number) => commentsMap.value[articleId] ?? []

  /**
   * 为指定文章添加评论
   * @param articleId 文章 ID
   * @param payload 评论数据（作者可选，内容必填）
   * @returns 新创建的评论对象
   */
  const addComment = (articleId: number, payload: { author?: string; content: string }) => {
    const content = payload.content.trim()
    if (!content) return
    const author = payload.author?.trim() || '匿名'
    const list = commentsMap.value[articleId] ?? []
    const next: CommentItem = {
      id: Date.now(),
      author,
      content,
      createdAt: new Date().toISOString()
    }

    commentsMap.value = {
      ...commentsMap.value,
      [articleId]: [...list, next]
    }
    persistComments()
    return next
  }

  return {
    commentsMap,
    loadComments,
    getComments,
    addComment
  }
}

