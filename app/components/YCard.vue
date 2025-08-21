<template>
  <UCard 
    :ui="{
      root: 'ring-black/8 dark:ring-white/12  rounded-[24px] w-[175px] h-[175px]',
      body: 'p-[16px] sm:p-[16px]',
    }">
    <div class=" left-4 top-5 w-10 h-10 rounded-[10px] border border-[rgba(0,0,0,0.08)] dark:border-[#404040] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2)] flex items-center justify-center">
      <div class="w-8 h-8 rounded-full bg-[#1d1f5a]"></div>
    </div>
    <div class=" left-4 top-20 -translate-y-1/2 text-[16px] text-black dark:text-[#e5e5e5] font-medium whitespace-nowrap">
      {{ title }}
    </div>
    <div class=" left-4 top-[103px] -translate-y-1/2 text-[14px] text-[#666] dark:text-[#a3a3a3] font-light w-[108px] leading-4">
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


