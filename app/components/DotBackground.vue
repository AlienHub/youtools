<template>
  <canvas ref="canvas" class="dot-background" aria-hidden="true" />
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
const colorMode = useColorMode()
let redraw = () => {}
watch(() => colorMode.value, () => redraw())

onMounted(() => {
  const element = canvas.value
  const context = element?.getContext('2d')
  if (!element || !context) return

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let width = 0
  let height = 0
  let frame = 0
  let lastFrame = 0
  let elapsed = 0
  let previousTime = 0
  let points: { x: number; y: number; alpha: number }[] = []

  // Smooth, shared waves keep neighboring dots moving together.
  // Positions always remain close to their original grid coordinates.
  const draw = () => {
    context.clearRect(0, 0, width, height)
    context.fillStyle = colorMode.value === 'dark' ? '#cccccc' : '#666666'
    const time = motion.matches ? 0 : elapsed / 1000
    for (const point of points) {
      const wave = Math.sin(point.x / 180 + time * 0.16)
        + Math.cos(point.y / 210 - time * 0.12)
      const x = point.x + Math.sin(wave + time * 0.09) * 2.2
      const y = point.y + Math.cos(wave * 0.8 + time * 0.11) * 2.2
      context.globalAlpha = point.alpha * (0.72 + Math.sin(wave + time * 0.15) * 0.28)
      context.beginPath()
      context.arc(x, y, 0.75, 0, Math.PI * 2)
      context.fill()
    }
    context.globalAlpha = 1
  }

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    element.width = Math.round(width * ratio)
    element.height = Math.round(height * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    const spacing = width <= 600 ? 26 : 19
    points = []
    for (let y = 8; y < height + spacing; y += spacing) {
      for (let x = 8; x < width + spacing; x += spacing) {
        // Fade the reading column while leaving a little texture at the edges.
        const distance = Math.abs(x - width / 2)
        const edge = Math.min(1, Math.max(0, (distance - Math.min(250, width * 0.28)) / 180))
        points.push({ x, y, alpha: (width <= 600 ? 0.065 : 0.09) + edge * 0.15 })
      }
    }
    draw()
  }

  const tick = (now: number) => {
    if (previousTime) elapsed += Math.min(now - previousTime, 100)
    previousTime = now
    if (now - lastFrame >= 1000 / 24) {
      draw()
      lastFrame = now
    }
    frame = requestAnimationFrame(tick)
  }

  const syncAnimation = () => {
    cancelAnimationFrame(frame)
    previousTime = 0
    if (!document.hidden && !motion.matches) frame = requestAnimationFrame(tick)
    else draw()
  }

  redraw = draw
  resize()
  syncAnimation()
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', syncAnimation)
  motion.addEventListener('change', syncAnimation)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', syncAnimation)
    motion.removeEventListener('change', syncAnimation)
    redraw = () => {}
  })
})
</script>

<style scoped>
.dot-background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
@media print {
  .dot-background { display: none; }
}
</style>
