<template>
  <article class="resource-card">
    <component :is="card.link ? 'a' : 'div'" :href="card.link || undefined" :target="card.link ? '_blank' : undefined" :rel="card.link ? 'noopener noreferrer' : undefined" class="resource-main">
      <div class="resource-card-heading"><h3>{{ card.title }}</h3><span v-if="card.link" aria-hidden="true">↗</span></div>
      <p v-if="card.description || card.linkName || card.link">{{ card.description || card.linkName || card.link }}</p>
      <time v-if="card.showUpdateTime && validDate" :datetime="validDate">更新于 {{ validDate }}</time>
    </component>
    <div v-if="card.side" class="resource-action"><span>{{ card.side.title }}</span><button v-if="card.side.action?.type === 'copy'" @click="copyContent">{{ card.side.buttonName || '复制' }}</button><a v-else-if="card.side.action?.type === 'link'" :href="card.side.action.value" target="_blank" rel="noopener noreferrer">{{ card.side.buttonName || '打开' }} ↗</a><span v-if="feedback" class="copy-feedback" role="status">{{ feedback }}</span></div>
  </article>
</template>
<script setup lang="ts">
import type { Card } from '~/data/cards'
const props = defineProps<{ card: Card }>()
const feedback = ref('')
const { copy } = useClipboard({ legacy: true })
const validDate = computed(() => {
  const date = props.card.updateTime
  return date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : ''
})
async function copyContent() {
  try { await copy(props.card.side?.action?.value || ''); feedback.value = '已复制' }
  catch { feedback.value = '复制失败，请重试' }
}
</script>
