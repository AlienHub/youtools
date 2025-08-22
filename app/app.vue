<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
// 全局 SEO 配置
useHead({
  title: 'NiHaoooooo - 分享任何有趣的内容',
  meta: [
    { name: 'description', content: '分享任何有趣的内容。一个简洁的工具箱，收集各种有用的工具和资源。' },
    { name: 'keywords', content: '工具箱,工具,资源,分享,有趣,实用工具' },
    { name: 'author', content: 'NiHaoooooo' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    
    // Open Graph 标签
    { property: 'og:title', content: 'NiHaoooooo - 分享任何有趣的内容' },
    { property: 'og:description', content: '分享任何有趣的内容。一个简洁的工具箱，收集各种有用的工具和资源。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://youtools.com' }, // 请替换为你的实际域名
    { property: 'og:image', content: '/og-image.jpg' }, // 请添加你的 OG 图片
    
    // Twitter Card 标签
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'NiHaoooooo - 分享任何有趣的内容' },
    { name: 'twitter:description', content: '分享任何有趣的内容。一个简洁的工具箱，收集各种有用的工具和资源。' },
    { name: 'twitter:image', content: '/og-image.jpg' }, // 请添加你的 Twitter 图片
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})
</script>
