<template>
  <div
    id="icon"
    class="w-10 h-10 rounded-[10px] border border-[rgba(0,0,0,0.08)] dark:border-[var(--y-dark-border)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden"
  >
    <img
      v-if="effectiveIcon && !faviconError && !isLoading"
      :src="effectiveIcon"
      :alt="title"
      class="w-8 h-8 object-cover rounded-full"
      @error="faviconError = true"
    />
    <div v-else-if="isLoading" class="w-8 h-8 rounded-full bg-[var(--color-gray-200)] dark:bg-[var(--color-gray-700)] animate-pulse"></div>
    <div v-else class="w-6 h-6 rounded-full bg-[var(--y-dark-bg)] dark:bg-[var(--color-gray-200)]"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  link?: string
  iconSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  link: '',
  iconSrc: ''
})

const { faviconUrl, faviconError, isLoading, fetchFavicon } = useFavicon()

const effectiveIcon = computed(() => {
  // 优先使用用户传入的自定义图标
  if (props.iconSrc) return props.iconSrc
  return faviconUrl.value
})

watch(
  () => [props.link, props.iconSrc],
  ([newLink, newIconSrc]) => {
    // 如果用户传入了自定义图标，则不抓取 favicon
    if (newIconSrc) return
    if (newLink) fetchFavicon(newLink)
  },
  { immediate: true }
)
</script>
