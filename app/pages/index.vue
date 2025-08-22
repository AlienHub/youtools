<template>
  <UContainer class="py-16">
    <div class="space-y-6">
      <!-- 标题区域 -->
      <div data-node-id="17:2" class="flex flex-col gap-2">
        <h1 class="text-[44px] leading-[52.8px] tracking-[-2px] text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-semibold">{{ pageConfig.title }}</h1>
        <p class="opacity-50 text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] text-[20px] leading-7">{{ pageConfig.description }}</p>
      </div>

      <!-- 分组卡片 -->
      <div class="space-y-12">
        <div v-for="group in groups" :key="group.id" class="space-y-6">
          <!-- 分组标题 -->
          <div class="flex items-center gap-2.5 pr-3 py-3">
            <h3 class="text-[20px] text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-medium">{{ group.title }}</h3>
            <span v-if="group.description" class="text-sm text-[var(--color-gray-500)] dark:text-[var(--y-dark-text-secondary)]">
              {{ group.description }}
            </span>
          </div>

          <!-- 分组卡片网格 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            <YCard 
              v-for="card in group.cards" 
              :key="card.id"
              :title="card.title"
              :link="card.link"
              :link-name="card.linkName"
              :show-icon="card.showIcon"
              :show-update-time="card.showUpdateTime"
              :update-time="card.updateTime"
              :icon-src="card.customIcon"
            />
          </div>
        </div>
      </div>


    </div>
  </UContainer>
</template>

<script setup lang="ts">
import YCard from '~/components/YCard.vue'
import { cardGroups, pageConfig } from '~/data/cards'

// 使用配置文件中的数据
const groups = ref(cardGroups)

// 页面特定的 SEO 配置
useHead({
  title: pageConfig.title,
  meta: [
    { name: 'description', content: pageConfig.description },
    { property: 'og:title', content: pageConfig.title },
    { property: 'og:description', content: pageConfig.description },
    { name: 'twitter:title', content: pageConfig.title },
    { name: 'twitter:description', content: pageConfig.description },
  ]
})
</script>