<template>
  <UCard :ui="{
    root: (shrink === 2
      ? 'ring-black/8 dark:ring-white/12  rounded-[24px] w-full h-[175px] bg-white dark:bg-[var(--y-dark-bg-surface)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
      : 'ring-black/8 dark:ring-white/12  rounded-[24px] w-[175px] h-[175px] bg-white dark:bg-[var(--y-dark-bg-surface)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'),
    body: 'p-[16px] sm:p-[16px] h-full',
  }"
    :class="isLink ? 'group cursor-pointer transition-all hover:bg-[var(--color-gray-50)] dark:hover:bg-[var(--y-dark-border)]' : ''"
    @click="onCardClick"
  >
    <div v-if="shrink === 2" class="flex flex-row h-full gap-6">
      <div id="content" class="flex flex-col items-start gap-2 flex-1 min-w-0">
        <YFavicon v-if="showIcon" :title="title" :link="link" :icon-src="iconSrc" />

        <div id="title" class="text-[16px] leading-4 text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-medium w-full">
          <span class="text-wrap break-words">{{ title }}</span>
        </div>

        <div v-if="link || linkName" id="link" class="text-[14px] text-[var(--color-gray-600)] dark:text-[var(--y-dark-text-secondary)] font-light w-[108px] leading-4">
          <span :class="isLink ? 'group-hover:underline' : ''">{{ linkName || link }}</span>
        </div>
      </div>

      <!-- 竖向虚线分隔 -->
      <div class="w-px self-stretch border-l border-dashed opacity-50 border-[var(--color-gray-600)] dark:border-[var(--y-dark-text-secondary)]"></div>

      <YSideContent 
        :title="side?.title"
        :button-name="side?.buttonName"
        :action="side?.action"
      />
    </div>

    <div v-else class="flex flex-col h-full">
      <div id="content" class="flex flex-col items-start gap-2 flex-1">

        <YFavicon v-if="showIcon" :title="title" :link="link" :icon-src="iconSrc" />

        <div id="title" class="text-[16px] text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-medium w-full">
          <span class="text-wrap break-words">{{ title }}</span>
        </div>

        <div v-if="link || linkName" id="link" class="text-[14px] text-[var(--color-gray-600)] dark:text-[var(--y-dark-text-secondary)] font-light w-[108px] leading-4">
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
import YSideContent from '~/components/YSideContent.vue'

interface Props {
  title: string
  link?: string
  linkName?: string
  showIcon?: boolean
  showUpdateTime?: boolean
  updateTime?: string | Date
  iconSrc?: string
  shrink?: 1 | 2
  side?: {
    title?: string
    buttonName?: string
    action?: {
      type: 'copy' | 'link'
      value: string
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  link: '',
  linkName: '',
  showUpdateTime: false,
  updateTime: '',
  iconSrc: '',
  shrink: 1,
  side: undefined
})

const isLink = computed(() => !!props.link)

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
