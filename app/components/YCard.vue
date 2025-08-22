<template>
  <UCard :ui="{
    root: `ring-black/8 dark:ring-white/12 rounded-[24px] bg-white dark:bg-[var(--y-dark-bg-surface)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all duration-300 ${cardSizeClasses.root}`,
    body: 'p-[16px] sm:p-[16px] h-full',
  }"
    :class="[
      isLink ? 'group cursor-pointer transition-all hover:bg-[var(--color-gray-50)] dark:hover:bg-[var(--y-dark-border)]' : '',
      'relative'
    ]"
    @click="onCardClick"
  >
    <div class="flex flex-col h-full">
      <div id="content" class="flex flex-col items-start gap-2 flex-1">

        <YFavicon v-if="showIcon" :title="title" :link="link" :icon-src="iconSrc" />

        <div id="title" :class="`${cardSizeClasses.title} text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-medium w-full`">
          <span class="text-wrap break-words">{{ title }}</span>
        </div>

        <div v-if="link || linkName" id="link" :class="`${cardSizeClasses.description} text-[var(--color-gray-600)] dark:text-[var(--y-dark-text-secondary)] font-light leading-4`">
          <span :class="isLink ? 'group-hover:underline' : ''">{{ linkName || link }}</span>
        </div>
      </div>

      <div id="footer" class="flex items-center justify-end mt-auto">
        <div v-if="showUpdateTime && updateTime" class="text-[12px] text-[var(--color-gray-500)] dark:text-[var(--color-gray-600)]">
          {{ formatRelativeTime(updateTime) }}
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import YFavicon from '~/components/YFavicon.vue'

interface Props {
  title: string
  link?: string
  linkName?: string
  showIcon?: boolean
  showUpdateTime?: boolean
  updateTime?: string | Date
  iconSrc?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  link: '',
  linkName: '',
  showUpdateTime: false,
  updateTime: '',
  iconSrc: '',
  size: 'small'
})

const isLink = computed(() => !!props.link)

// 卡片大小样式类
const cardSizeClasses = computed(() => {
  switch (props.size) {
    case 'medium':
      return {
        root: 'w-[350px] h-[175px]',
        title: 'text-[18px] leading-[22px]',
        description: 'text-[15px] leading-[20px]'
      }
    case 'large':
      return {
        root: 'w-[525px] h-[175px]',
        title: 'text-[20px] leading-[24px]',
        description: 'text-[16px] leading-[22px]'
      }
    default: // small
      return {
        root: 'w-[175px] h-[175px]',
        title: 'text-[16px] leading-[20px]',
        description: 'text-[14px] leading-[18px]'
      }
  }
})

const { formatRelativeTime } = useTimeFormat()



const onCardClick = () => {
  if (!props.link) return
  try {
    window.open(props.link, '_blank')
  } catch (error) {
    // noop
  }
}
</script>
