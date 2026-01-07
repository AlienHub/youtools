<template>
  <div 
    v-if="renderedHtml" 
    class="y-markdown-card h-full flex flex-col"
  >
    <!-- 固定的顶部区域（包含关闭按钮） -->
    <div class="flex-shrink-0 relative h-14">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors z-10"
        aria-label="关闭"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Markdown内容 - 可滚动区域 -->
    <div 
      class="y-markdown overflow-y-auto flex-1 px-6 pb-6 pt-0"
      v-html="renderedHtml"
    />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{
  content: string
  title?: string
  description?: string
}>()

defineEmits<{
  close: []
}>()

// 配置 marked 选项
marked.setOptions({
  breaks: true,
  gfm: true,
})

// 渲染 Markdown
const renderedHtml = computed(() => {
  if (!props.content) return ''
  return marked(props.content)
})
</script>

<style scoped>
/* 卡片容器样式 - 类似 YCard */
.y-markdown-card {
  background-color: white;
  border-radius: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden; /* 确保内容不溢出圆角 */
}

:deep(.dark) .y-markdown-card {
  background-color: var(--y-dark-bg-surface);
  border-color: rgba(255, 255, 255, 0.12);
}

.y-markdown {
  color: var(--color-gray-700);
  line-height: 1.75;
}

/* 隐藏滚动条但保持滚动功能 */
.y-markdown {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.y-markdown::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

/* 深色模式 */
:deep(.dark) .y-markdown {
  color: var(--y-dark-text-secondary);
}

/* 标题样式 */
.y-markdown :deep(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-gray-900);
  line-height: 1.3;
}

.y-markdown :deep(h1:first-child) {
  margin-top: 0;
}

.y-markdown :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-gray-900);
  line-height: 1.4;
}

.y-markdown :deep(h3) {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
  line-height: 1.5;
}

.y-markdown :deep(h4) {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
}

/* 深色模式标题 */
:deep(.dark) .y-markdown h1,
:deep(.dark) .y-markdown h2,
:deep(.dark) .y-markdown h3,
:deep(.dark) .y-markdown h4 {
  color: var(--y-dark-text-primary);
}

/* 段落样式 */
.y-markdown :deep(p) {
  margin: 1rem 0;
  line-height: 1.75;
}

.y-markdown :deep(p:first-child) {
  margin-top: 0;
}

/* 列表样式 */
.y-markdown :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin: 1rem 0;
  padding-left: 0;
}

.y-markdown :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
  margin: 1rem 0;
  padding-left: 0;
}

.y-markdown :deep(li) {
  margin: 0.5rem 0;
  margin-left: 1rem;
}

.y-markdown :deep(li > ul),
.y-markdown :deep(li > ol) {
  margin-left: 1.5rem;
}

/* 代码块样式 */
.y-markdown :deep(code) {
  background-color: rgb(243 244 246);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

:deep(.dark) .y-markdown code {
  background-color: rgb(31 41 55);
}

.y-markdown :deep(pre) {
  background-color: rgb(243 244 246);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  overflow-x: auto;
}

:deep(.dark) .y-markdown pre {
  background-color: rgb(31 41 55);
}

.y-markdown :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

/* 引用样式 */
.y-markdown :deep(blockquote) {
  border-left: 4px solid rgb(209 213 219);
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
  color: rgb(75 85 99);
}

:deep(.dark) .y-markdown blockquote {
  border-left-color: rgb(75 85 99);
  color: rgb(156 163 175);
}

/* 链接样式 */
.y-markdown :deep(a) {
  color: rgb(37 99 235);
  text-decoration: none;
}

.y-markdown :deep(a:hover) {
  text-decoration: underline;
}

:deep(.dark) .y-markdown a {
  color: rgb(96 165 250);
}

/* 分隔线 */
.y-markdown :deep(hr) {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid rgb(229 231 235);
}

:deep(.dark) .y-markdown hr {
  border-top-color: rgb(55 65 81);
}

/* 表格样式 */
.y-markdown :deep(table) {
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;
}

.y-markdown :deep(th) {
  border: 1px solid rgb(209 213 219);
  padding: 0.5rem 1rem;
  background-color: rgb(243 244 246);
  font-weight: 600;
  text-align: left;
}

.y-markdown :deep(td) {
  border: 1px solid rgb(209 213 219);
  padding: 0.5rem 1rem;
}

:deep(.dark) .y-markdown th {
  border-color: rgb(75 85 99);
  background-color: rgb(31 41 55);
}

:deep(.dark) .y-markdown td {
  border-color: rgb(75 85 99);
}

/* 强调样式 */
.y-markdown :deep(strong) {
  font-weight: 600;
  color: var(--color-gray-900);
}

:deep(.dark) .y-markdown strong {
  color: var(--y-dark-text-primary);
}

.y-markdown :deep(em) {
  font-style: italic;
}

/* 图片样式 */
.y-markdown :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>

