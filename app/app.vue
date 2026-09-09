<template>
  <UApp>
    <DotBackground />
    <a class="skip-link" href="#main">跳到正文</a>
    <div class="site-frame">
      <header class="site-header">
        <NuxtLink to="/" class="wordmark" :aria-label="`${profile.name} 首页`"><img src="/favicon.ico" alt="" width="32" height="32"></NuxtLink>
        <nav aria-label="主导航">
          <NuxtLink to="/#works" :aria-current="route.path === '/' && route.hash === '#works' ? 'location' : undefined">作品</NuxtLink>
          <NuxtLink to="/writing" :aria-current="route.path.startsWith('/writing') ? 'page' : undefined">记录</NuxtLink>
          <NuxtLink to="/resources" :aria-current="route.path.startsWith('/resources') ? 'page' : undefined">分享</NuxtLink>
          <ClientOnly>
            <button class="theme-toggle" :aria-label="colorMode.value === 'dark' ? '切换浅色模式' : '切换深色模式'" @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'">
              <svg v-if="colorMode.value === 'dark'" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 14a8 8 0 0 1-10-10 8.5 8.5 0 1 0 10 10Z"/></svg>
            </button>
            <template #fallback><span class="theme-placeholder" aria-hidden="true" /></template>
          </ClientOnly>
        </nav>
      </header>
      <main id="main" class="site-shell" tabindex="-1"><NuxtPage /></main>
      <footer class="site-footer site-shell">
        <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
      </footer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'
const route = useRoute()
const colorMode = useColorMode()
useHead({
  titleTemplate: (title) => title ? `${title} · ${profile.name}` : `${profile.name} · 作品与日常`,
  htmlAttrs: { lang: 'zh-CN' },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})
useSeoMeta({ description: profile.introduction, ogType: 'website' })
</script>
