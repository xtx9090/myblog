/**
 * 封面样式工具函数
 * 用于处理文章封面的样式（CSS 渐变或图片 URL/base64）
 */

/**
 * 获取封面样式
 * @param cover 封面值（CSS 渐变或图片 URL/base64）
 * @returns 样式对象
 */
export function getCoverStyle(cover: string) {
  if (!cover) return {}
  
  // 检查是否为图片（URL 或 base64）
  const isImage = cover.startsWith('http://') || 
                  cover.startsWith('https://') || 
                  cover.startsWith('data:image/')
  
  if (isImage) {
    return {
      backgroundImage: `url(${cover})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }
  
  // CSS 渐变
  return {
    background: cover
  }
}

