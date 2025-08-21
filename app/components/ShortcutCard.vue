<template>
  <UCard
    class="relative w-[175px] h-[175px] bg-white rounded-3xl border border-[rgba(0,0,0,0.08)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]"
    :ui="{ body: 'p-0' }"
  >
    <div class="absolute left-4 top-5 w-10 h-10 rounded-[10px] border border-[rgba(0,0,0,0.08)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center">
      <div class="w-8 h-8 rounded-full bg-[#1d1f5a]"></div>
    </div>
    <div class="absolute left-4 top-20 -translate-y-1/2 text-[16px] text-black font-medium whitespace-nowrap">
      {{ title }}
    </div>
    <div class="absolute left-4 top-[103px] -translate-y-1/2 text-[14px] text-[#666] font-light w-[108px] leading-4">
      {{ link }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  link: string
}

defineProps<Props>()
</script>


