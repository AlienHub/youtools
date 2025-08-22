export default defineEventHandler(async (event) => {
  const domain = getRouterParam(event, 'domain')
  
  if (!domain) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Domain parameter is required'
    })
  }

  try {
    // 尝试获取 favicon
    const faviconUrls = [
      `https://${domain}/favicon.ico`,
      `https://${domain}/favicon.png`,
      `https://${domain}/favicon.svg`,
      `https://${domain}/apple-touch-icon.png`,
      `https://${domain}/apple-touch-icon-precomposed.png`,
      `https://${domain}/icon.png`,
      `https://${domain}/logo.png`,
      `https://${domain}/logo.svg`
    ]

    for (const url of faviconUrls) {
      try {
        const response = await $fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)'
          }
        })
        
        // 如果成功获取到图标，返回它
        setHeader(event, 'Content-Type', 'image/x-icon')
        setHeader(event, 'Cache-Control', 'public, max-age=86400') // 缓存24小时
        return response
      } catch (error) {
        continue
      }
    }

    // 如果直接获取失败，尝试使用 Google 的 favicon 服务
    try {
      const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
      const response = await $fetch(googleFaviconUrl, {
        method: 'GET'
      })
      
      setHeader(event, 'Content-Type', 'image/png')
      setHeader(event, 'Cache-Control', 'public, max-age=86400')
      return response
    } catch (error) {
      // 如果 Google 服务也失败，返回默认图标
      throw createError({
        statusCode: 404,
        statusMessage: 'Favicon not found'
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch favicon'
    })
  }
})
