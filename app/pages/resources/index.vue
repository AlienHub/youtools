<template>
  <div>
    <header class="page-intro"><h1>分享</h1><p>收集的工具、资源，还有一些使用心得。</p></header>
    <nav class="filter-list resource-filters" aria-label="资源分组"><a v-for="group in cardGroups" :key="group.id" :href="`#${group.id}`">{{ group.title }}</a></nav>
    <section v-for="group in cardGroups" :id="group.id" :key="group.id" class="resource-group">
      <div class="section-heading"><h2>{{ group.title }}</h2><NuxtLink v-if="group.notes" :to="`/resources/${group.id}`" class="text-link">使用说明 →</NuxtLink></div>
      <p v-if="group.description" class="group-description">{{ group.description }}</p>
      <div class="resource-grid">
        <ResourceCard v-for="card in group.cards" :key="card.id" :card="card" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { cardGroups } from '~/data/cards'
useSeoMeta({ title: '资源分享', description: '收集的实用工具、资源与使用说明。' })
</script>
