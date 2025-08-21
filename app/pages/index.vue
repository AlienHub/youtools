<template>
  <UContainer class="py-16">
    <div class="space-y-6">
      <div data-node-id="17:2">
        <h1 class="text-[44px] leading-[52.8px] tracking-[-2px] text-[#333] font-semibold">Alien</h1>
        <p class="opacity-30 text-[#666] text-[20px] leading-7">一些有意思的快捷指令！</p>
      </div>

      <div class="flex items-center gap-2.5 pr-3 py-3">
        <h2 class="text-[24px] text-black">快捷指令</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <ShortcutCard v-for="i in 6" :key="i" title="Titles" link="Links" />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import ShortcutCard from '~/components/ShortcutCard.vue'
</script>