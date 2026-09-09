<template>
  <article v-if="entry" class="reading-page">
    <NuxtLink to="/writing" class="back-link">← 全部记录</NuxtLink>
    <header class="page-intro"><div class="entry-meta"><span>{{ entry.type }}</span><time :datetime="entry.date">{{ entry.date }}</time></div><h1 v-if="entry.title">{{ entry.title }}</h1></header>
    <YMarkdown :content="entry.content" />
  </article>
</template>
<script setup lang="ts">
import { entries } from '~/data/writing'
const route = useRoute()
const entry = entries.find(item => item.slug === route.params.slug)
if (!entry) throw createError({ statusCode: 404, statusMessage: '记录不存在' })
useSeoMeta({ title: entry.title || `${entry.type} · ${entry.date}`, description: entry.summary })
</script>
