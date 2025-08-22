<template>
  <div class="flex items-center gap-3">
    <a
      v-for="link in socialLinks"
      :key="link.id"
      :href="link.url"
      :title="link.name"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:scale-110 hover:shadow-md"
      :class="link.color || 'hover:text-gray-900 dark:hover:text-white'"
    >
      <Icon :name="link.icon" class="w-5 h-5" />
    </a>
  </div>
</template>

<script setup lang="ts">
import type { SocialLink } from '~/data/cards'

interface Props {
  socialLinks: SocialLink[]
}

defineProps<Props>()
</script>
