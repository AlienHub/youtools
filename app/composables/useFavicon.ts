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
    
    try {
      const urlObj = new URL(url)
      const domain = urlObj.hostname
      
      // 使用我们的代理 API 来获取 favicon
      const proxyUrl = `/api/favicon/${domain}`
      const exists = await checkImageExists(proxyUrl)
      if (exists) {
        faviconUrl.value = proxyUrl
        isLoading.value = false
        return
      }
    } catch (error) {
      // 如果代理 API 失败，回退到 Google 服务
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
      
      // 尝试使用 DuckDuckGo 的 favicon 服务作为备选
      try {
        const urlObj = new URL(url)
        const duckDuckGoFaviconUrl = `https://icons.duckduckgo.com/ip3/${urlObj.hostname}.ico`
        const exists = await checkImageExists(duckDuckGoFaviconUrl)
        if (exists) {
          faviconUrl.value = duckDuckGoFaviconUrl
          isLoading.value = false
          return
        }
      } catch (error) {
        // 忽略错误
      }
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
