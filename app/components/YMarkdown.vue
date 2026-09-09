<template><div class="prose-content" v-html="html" /></template>
<script setup lang="ts">
import { marked } from 'marked'
const props = defineProps<{ content: string }>()
// Only repository-authored Markdown is rendered. Raw HTML is displayed as text.
const renderer = new marked.Renderer()
renderer.html = ({ text }) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const html = computed(() => marked.parse(props.content, { async: false, gfm: true, breaks: true, renderer }))
</script>
