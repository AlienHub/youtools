<template>
  <div class="flex h-screen overflow-hidden">
    <!-- 主内容区域 -->
    <div 
      class="main-content flex-1 overflow-y-auto"
      :class="{ 'transition-none': isResizing }"
      :style="isNotesOpen ? { width: `${mainContentWidth}%` } : { width: '100%' }"
    >
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
              <div class="flex items-center justify-between pr-3 py-3">
                <div class="flex items-center gap-2.5">
                  <h3 class="text-[20px] text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-medium">{{ group.title }}</h3>
                  <span v-if="group.description" class="text-sm text-[var(--color-gray-500)] dark:text-[var(--y-dark-text-secondary)]">
                    {{ group.description }}
                  </span>
                </div>
                <!-- 查看笔记按钮 -->
                <button 
                  v-if="group.notes"
                  @click="openNotes(group)"
                  class="group/notes flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 rounded-lg transition-all duration-200 border border-blue-200/50 dark:border-blue-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover/notes:scale-110" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  查看说明
                </button>
              </div>

              <!-- 分组卡片网格 -->
              <div 
                class="grid gap-10"
                :class="getGridCols()"
              >
                <div 
                  v-for="card in group.cards" 
                  :key="card.id"
                  :class="card.shrink === 2 ? 'sm:col-span-2 md:col-span-2 lg:col-span-2' : ''"
                >
                  <YCard 
                    :title="card.title"
                    :link="card.link"
                    :link-name="card.linkName"
                    :show-icon="card.showIcon"
                    :show-update-time="card.showUpdateTime"
                    :update-time="card.updateTime"
                    :icon-src="card.customIcon"
                    :shrink="card.shrink"
                    :side="card.side"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- 笔记侧边面板 -->
    <div 
      v-if="isNotesOpen"
      class="notes-panel dark:bg-[var(--y-dark-bg-primary)]"
      :class="[
        isMinimized ? 'p-2' : 'py-4 pr-4 pl-1',
        isResizing ? '' : 'transition-all duration-300'
      ]"
      :style="{ width: `${notesPanelWidth}%` }"
    >
        <!-- 内容区域 - 卡片式展示 -->
        <div v-if="!isMinimized" class="relative group h-full">
          <!-- 左边框拖动热区 -->
          <div 
            class="absolute left-0 top-0 bottom-0 w-3 cursor-col-resize hover:bg-blue-400/10 dark:hover:bg-blue-600/10 transition-colors z-50"
            @mousedown="startResize"
          >
            <!-- 悬停提示 -->
            <div class="absolute top-1/2 left-full ml-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
              <div class="bg-gray-900 dark:bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                <div class="font-medium text-xs">拖动调整大小</div>
              </div>
            </div>
            
            <!-- 拖动指示器 -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12 rounded-full bg-gray-400 dark:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          
          <YMarkdown 
            v-if="currentGroup?.notes" 
            :content="currentGroup.notes"
            :title="currentGroup.title"
            :description="currentGroup.description"
            @close="isNotesOpen = false"
          />
        </div>
        
        <!-- 最小化状态提示 -->
        <div v-if="isMinimized" class="flex items-center justify-center h-full relative group">
          <!-- 最小化状态的拖动热区 -->
          <div 
            class="absolute left-0 top-0 bottom-0 w-3 cursor-col-resize hover:bg-blue-400/10 dark:hover:bg-blue-600/10 transition-colors z-50"
            @mousedown="startResize"
          >
            <!-- 拖动指示器 -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12 rounded-full bg-gray-400 dark:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          
          <div class="text-gray-400 dark:text-gray-600 text-xs writing-mode-vertical transform rotate-180">
            {{ currentGroup?.title }}
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import YCard from '~/components/YCard.vue'
import YSocialLinks from '~/components/YSocialLinks.vue'
import YMarkdown from '~/components/YMarkdown.vue'
import { cardGroups, pageConfig, type CardGroup } from '~/data/cards'

// 使用配置文件中的数据
const groups = ref(cardGroups)

// 笔记抽屉状态
const isNotesOpen = ref(false)
const currentGroup = ref<CardGroup | null>(null)

// 面板宽度状态
const notesPanelWidth = ref(30) // 笔记面板宽度百分比
const previousWidth = ref(30) // 记录最小化前的宽度
const isMinimized = ref(false) // 是否已最小化
const mainContentWidth = computed(() => 100 - notesPanelWidth.value)

// 拖动调整宽度
const isResizing = ref(false)
let rafId: number | null = null

const startResize = (e: MouseEvent) => {
  isResizing.value = true
  e.preventDefault()
  
  let currentX = e.clientX
  
  const onMouseMove = (e: MouseEvent) => {
    currentX = e.clientX
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (!isResizing.value) {
          rafId = null
          return
        }
        
        const windowWidth = window.innerWidth
        const newWidth = ((windowWidth - currentX) / windowWidth) * 100
        
        // 限制宽度在 20% 到 60% 之间
        notesPanelWidth.value = Math.max(20, Math.min(60, newWidth))
        isMinimized.value = false
        
        rafId = null
      })
    }
  }
  
  const onMouseUp = () => {
    isResizing.value = false
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// 双击切换最小化/还原
const toggleMinimize = () => {
  if (isMinimized.value) {
    // 还原到之前的宽度
    notesPanelWidth.value = previousWidth.value
    isMinimized.value = false
  } else {
    // 最小化到 5%
    previousWidth.value = notesPanelWidth.value
    notesPanelWidth.value = 5
    isMinimized.value = true
  }
}

// 打开笔记抽屉
const openNotes = (group: CardGroup) => {
  currentGroup.value = group
  isNotesOpen.value = true
}

// 根据note面板状态动态调整网格列数
const getGridCols = () => {
  if (!isNotesOpen.value) {
    // note关闭时：正常的响应式布局
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  }
  
  // note打开时：根据主内容区域宽度调整
  const contentWidth = mainContentWidth.value
  
  if (contentWidth >= 70) {
    // 70%及以上：保持6列
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  } else if (contentWidth >= 60) {
    // 60-70%：5列
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
  } else if (contentWidth >= 50) {
    // 50-60%：4列
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  } else if (contentWidth >= 40) {
    // 40-50%：3列
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  } else {
    // 40%以下：2列
    return 'grid-cols-1 sm:grid-cols-2'
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

<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
  text-orientation: upright;
}

/* 隐藏滚动条但保持滚动功能 */
.main-content,
.notes-panel {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.main-content::-webkit-scrollbar,
.notes-panel::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

/* 禁用过渡动画提升拖动性能 */
.transition-none {
  transition: none !important;
}
</style>