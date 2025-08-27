<template>
  <div id="side" class="flex items-center flex-col flex-1 min-w-0 gap-1">
    <div class="text-[16px] text-center text-[var(--color-gray-900)] dark:text-[var(--y-dark-text-primary)] font-medium truncate max-w-full">
      {{ title }}
    </div>
    <div class="w-full h-full flex items-center justify-center">
      <UButton
        v-if="buttonName && action"
        size="sm"
        variant="solid"
        color="primary"
        class="rounded-[24px] h-[38px] px-5 text-[16px] bg-black text-white active:bg-black/60 hover:bg-black/90 hover:cursor-pointer dark:bg-white dark:text-black dark:hover:bg-white/90 dark:active:bg-white/60"
        @click.stop="onButtonClick"
      >{{ buttonName }}</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  buttonName?: string
  action?: {
    type: 'copy' | 'link'
    value: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  buttonName: '',
  action: undefined
})

const { copy } = useClipboard()

const onButtonClick = async () => {
  if (!props.action) return
  const { type, value } = props.action
  
  if (type === 'copy') {
    await copy(value)
  } else if (type === 'link') {
    window.open(value, '_blank')
  }
}
</script>
