import { nextTick, type Ref } from 'vue'

/**
 * 代码复制功能 Composable
 * 为代码块添加复制按钮并处理复制逻辑
 * @param contentRef 内容容器的引用
 * @param t 翻译函数（可选，如果不提供则使用默认文本）
 */
export const useCodeCopy = (
  contentRef: Ref<HTMLElement | undefined>,
  t?: (key: string) => string
) => {
  // 默认翻译文本
  const defaultT = (key: string) => {
    const defaults: Record<string, string> = {
      'copy': '复制',
      'copied': '已复制!',
      'copyFailed': '复制失败',
      'copyCode': '复制代码'
    }
    return defaults[key] || key
  }
  
  const translate = t || defaultT

  /**
   * 显示复制成功反馈
   */
  const showCopySuccess = (button: HTMLElement): void => {
    const originalText = button.textContent
    button.textContent = translate('copied')
    button.classList.add('copied')
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('copied')
    }, 2000)
  }

  /**
   * 显示复制失败反馈
   */
  const showCopyError = (button: HTMLElement): void => {
    const originalText = button.textContent
    button.textContent = translate('copyFailed')
    button.classList.add('error')
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('error')
    }, 2000)
  }

  /**
   * 复制文本到剪贴板
   * 使用现代的 Clipboard API，如果失败则显示错误提示
   */
  const copyToClipboard = async (text: string, button: HTMLElement): Promise<void> => {
    // 检查 Clipboard API 是否可用
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      console.error('Clipboard API 不可用')
      showCopyError(button)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      showCopySuccess(button)
    } catch (err) {
      console.error('复制失败:', err)
      showCopyError(button)
    }
  }

  /**
   * 创建复制按钮
   */
  const createCopyButton = (codeText: string): HTMLButtonElement => {
    const copyButton = document.createElement('button')
    copyButton.className = 'copy-code-btn'
    copyButton.textContent = translate('copy')
    copyButton.type = 'button'
    copyButton.setAttribute('aria-label', translate('copyCode'))
    
    copyButton.addEventListener('click', () => {
      copyToClipboard(codeText, copyButton)
    })
    
    return copyButton
  }

  /**
   * 为所有代码块添加复制按钮
   */
  const addCopyButtons = (): void => {
    nextTick(() => {
      if (!contentRef.value) return
      
      const codeBlocks = contentRef.value.querySelectorAll('pre.hljs')
      
      codeBlocks.forEach((pre) => {
        // 如果已经添加过复制按钮，跳过
        if (pre.querySelector('.copy-code-btn')) return
        
        const codeElement = pre.querySelector('code')
        if (!codeElement) return
        
        // 获取代码文本（去除 HTML 标签）
        const codeText = codeElement.textContent || codeElement.innerText || ''
        
        // 创建并添加复制按钮
        const copyButton = createCopyButton(codeText)
        pre.appendChild(copyButton)
      })
    })
  }

  return {
    addCopyButtons
  }
}

