/**
 * 分类管理 Composable
 * 从国际化配置中动态获取分类列表
 */

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type CategoryOption = {
  key: string // 分类键
  label: string // 分类标签（国际化）
}

/**
 * 获取所有分类选项
 * @param includeAll 是否包含"全部"选项（默认 false）
 * @returns 分类选项数组
 */
export const useCategories = (includeAll = false) => {
  const { t, messages, locale } = useI18n()

  const categories = computed<CategoryOption[]>(() => {
    // 从当前语言的 messages 中获取 categories 对象
    const currentMessages = messages.value[locale.value] as any
    const categoriesConfig = currentMessages?.categories || {}

    // 将 categories 对象转换为数组
    const categoryList: CategoryOption[] = Object.keys(categoriesConfig)
      .filter((key) => includeAll || key !== 'all') // 如果不包含 all，则过滤掉
      .map((key) => ({
        key,
        label: t(`categories.${key}`)
      }))

    // 如果包含 all，将其放在第一位
    if (includeAll && categoriesConfig.all) {
      return [
        { key: 'all', label: t('categories.all') },
        ...categoryList.filter((item) => item.key !== 'all')
      ]
    }

    return categoryList
  })

  return { categories }
}

