<template>
  <div>
    <header class="page-intro"><h1>记录</h1><p>一些实践中的发现，也有还没完全想明白的事。</p></header>
    <div class="filter-list" role="group" aria-label="记录类型"><button v-for="type in filters" :key="type" :aria-pressed="selected === type" @click="selected = type">{{ type }}</button></div>
    <WritingList v-if="visibleEntries.length" :entries="visibleEntries" />
    <p v-else class="empty-writing">{{ entries.length ? '这个分类还没有记录。' : '还没有发布记录。' }}</p>
  </div>
</template>
<script setup lang="ts">
import { entries } from '~/data/writing'
const filters = ['全部', '探索', '想法'] as const
const selected = ref<typeof filters[number]>('全部')
const visibleEntries = computed(() => entries.filter(entry => selected.value === '全部' || entry.type === selected.value))
useSeoMeta({ title: '记录', description: '工作与生活中的探索、实践和想法。' })
</script>
