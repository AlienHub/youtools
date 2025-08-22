<template>
  <UContainer class="py-16">
    <div class="space-y-6">
      <!-- 标题区域 -->
      <div data-node-id="17:2" class="flex items-center justify-between gap-6">
        <div class="flex flex-col gap-2">
          <h1 class="text-[44px] leading-[52.8px] tracking-[-2px] text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-semibold">{{ pageConfig.title }}</h1>
          <p class="opacity-50 text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] text-[20px] leading-7">{{ pageConfig.description }}</p>
        </div>
        
        <!-- 社交媒体链接 -->
        <YSocialLinks 
          v-if="pageConfig.socialLinks && pageConfig.socialLinks.length > 0"
          :social-links="pageConfig.socialLinks"
          class="flex-shrink-0"
        />
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
            <div 
              v-for="card in group.cards" 
              :key="card.id"
              :class="getCardContainerClass(card.size)"
              class="group"
            >
              <YCard 
                :title="card.title"
                :link="card.link"
                :link-name="card.linkName"
                :show-icon="card.showIcon"
                :show-update-time="card.showUpdateTime"
                :update-time="card.updateTime"
                :icon-src="card.customIcon"
                :size="card.size"
              />
              
              <!-- 外部操作栏 - 只在hover时显示 -->
              <div class="flex gap-1 bg-gray-900 dark:bg-gray-800 rounded-lg px-2 py-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  v-for="sizeOption in sizeOptions"
                  :key="sizeOption.value"
                  @click="updateCardSize(group.id, card.id, sizeOption.value as 'small' | 'medium' | 'large')"
                  :class="[
                    'w-5 h-5 rounded-sm transition-all duration-200 flex items-center justify-center',
                    card.size === sizeOption.value
                      ? 'bg-white text-gray-900'
                      : 'bg-transparent text-white hover:bg-white/20'
                  ]"
                  :title="`调整为${sizeOption.label}`"
                >
                  <div :class="getSizeIcon(sizeOption.value)" class="w-3 h-3"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </UContainer>
</template>

<script setup lang="ts">
import YCard from '~/components/YCard.vue'
import YSocialLinks from '~/components/YSocialLinks.vue'
import { cardGroups, pageConfig } from '~/data/cards'

// 使用配置文件中的数据
const groups = ref(cardGroups)

// 大小选项
const sizeOptions = [
  { value: 'small', label: '1格' },
  { value: 'medium', label: '2格' },
  { value: 'large', label: '3格' }
]

// 获取大小图标
const getSizeIcon = (size: string) => {
  switch (size) {
    case 'small':
      return 'bg-white w-3 h-3' // 小方块
    case 'medium':
      return 'bg-white w-3 h-2' // 水平矩形
    case 'large':
      return 'bg-white w-3 h-3' // 大方块
    default:
      return 'bg-white w-3 h-3'
  }
}

// 获取卡片容器样式类
const getCardContainerClass = (size?: string) => {
  const baseClass = 'flex flex-col items-center'
  switch (size) {
    case 'medium':
      return `${baseClass} col-span-2`
    case 'large':
      return `${baseClass} col-span-3`
    default:
      return `${baseClass} col-span-1`
  }
}

// 更新卡片大小
const updateCardSize = (groupId: string, cardId: number, newSize: 'small' | 'medium' | 'large') => {
  const group = groups.value.find(g => g.id === groupId)
  if (group) {
    const card = group.cards.find(c => c.id === cardId)
    if (card) {
      card.size = newSize
    }
  }
}

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