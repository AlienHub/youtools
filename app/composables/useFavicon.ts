export const useFavicon = () => {
  const faviconUrl = ref("")
  const faviconError = ref(false)
  const isLoading = ref(false)

  // 尝试多种 favicon 格式
  const getFaviconUrls = (url: string): string[] => {
    try {
      const urlObj = new URL(url)
      const baseUrl = `${urlObj.protocol}//${urlObj.hostname}`
      
      return [
        `${baseUrl}/favicon.ico`,
        `${baseUrl}/favicon.png`,
        `${baseUrl}/favicon.svg`,
        `${baseUrl}/apple-touch-icon.png`,
        `${baseUrl}/apple-touch-icon-precomposed.png`,
        `${baseUrl}/icon.png`,
        `${baseUrl}/logo.png`,
        `${baseUrl}/logo.svg`
      ]
    } catch {
      return []
    }
  }

  // 检查图片是否可访问
  const checkImageExists = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
      
      // 设置超时
      setTimeout(() => resolve(false), 3000)
    })
  }

  // 获取可用的 favicon
  const fetchFavicon = async (url: string) => {
    if (!url) {
      faviconUrl.value = ""
      faviconError.value = false
      isLoading.value = false
      return
    }

    isLoading.value = true
    faviconError.value = false
    
    const faviconUrls = getFaviconUrls(url)
    
    // 尝试网站自身的 favicon
    for (const iconUrl of faviconUrls) {
      try {
        const exists = await checkImageExists(iconUrl)
        if (exists) {
          faviconUrl.value = iconUrl
          isLoading.value = false
          return
        }
      } catch (error) {
        continue
      }
    }
    
    // 如果网站自身的 favicon 都失败，尝试使用 Google 的 favicon 服务
    try {
      const urlObj = new URL(url)
      const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
      const exists = await checkImageExists(googleFaviconUrl)
      if (exists) {
        faviconUrl.value = googleFaviconUrl
        isLoading.value = false
        return
      }
    } catch (error) {
      // 忽略错误
    }
    
    // 所有方法都失败
    faviconUrl.value = ""
    faviconError.value = true
    isLoading.value = false
  }

  // 重置状态
  const resetFavicon = () => {
    faviconUrl.value = ""
    faviconError.value = false
    isLoading.value = false
  }

  return {
    faviconUrl: readonly(faviconUrl),
    faviconError: readonly(faviconError),
    isLoading: readonly(isLoading),
    fetchFavicon,
    resetFavicon
  }
}
