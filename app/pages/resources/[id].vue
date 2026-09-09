<template>
  <article v-if="group" class="reading-page">
    <NuxtLink to="/resources" class="back-link">← 全部分享</NuxtLink>
    <header class="page-intro"><p class="eyebrow">使用说明</p><h1>{{ group.title }}</h1><p v-if="group.description">{{ group.description }}</p></header>
    <YMarkdown :content="group.notes!" />
  </article>
</template>
<script setup lang="ts">
import { cardGroups } from '~/data/cards'
const route = useRoute()
const group = cardGroups.find(item => item.id === route.params.id)
if (!group?.notes) throw createError({ statusCode: 404, statusMessage: '说明不存在' })
useSeoMeta({ title: group.title, description: group.description })
</script>
