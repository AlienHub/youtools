<template>
  <div class="writing-list">
    <NuxtLink v-for="entry in entries" :key="entry.slug" :to="`/writing/${entry.slug}`" class="writing-item">
      <div class="entry-meta"><span>{{ entry.type }}</span><time :datetime="entry.date">{{ entry.date.replaceAll('-', '.') }}</time></div>
      <h2 v-if="entry.title">{{ entry.title }}</h2>
      <p>{{ entry.summary }}</p>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import type { WritingEntry } from '~/data/writing'
defineProps<{ entries: WritingEntry[] }>()
</script>
