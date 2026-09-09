<template>
  <div class="personal-home">
    <header class="personal-intro">
      <h1>{{ profile.name }}</h1>
      <p>{{ profile.introduction }}</p>
    </header>

    <section id="works" class="personal-projects" aria-labelledby="works-title">
      <h2 id="works-title">最近在做</h2>
      <div class="project-list">
        <component :is="project.url ? 'a' : 'div'" v-for="project in projects" :key="project.name" :href="project.url" class="project" :target="project.url ? '_blank' : undefined" :rel="project.url ? 'noopener noreferrer' : undefined">
          <span class="project-icon">
            <img v-if="project.icon" :src="project.icon" alt="" width="26" height="26">
            <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>
          </span>
          <span class="project-copy"><span class="project-name">{{ project.name }}</span><span v-if="project.status" class="project-status">{{ project.status }}</span><span class="project-separator" aria-hidden="true"> — </span><span class="project-summary">{{ project.tagline }}</span></span>
          <span v-if="project.url" class="project-arrow" aria-hidden="true">↗</span>
        </component>
      </div>
    </section>

    <div class="personal-notes">
      <p>我喜欢从日常遇到的小问题出发，做一些自己也会用的工具，让操作少一点打断。</p>
      <p>工作与生活中的探索、实践，还有偶尔冒出来的想法，会写在 <NuxtLink to="/writing" class="inline-link">记录</NuxtLink> 里。觉得好用的工具和资源，也会整理到 <NuxtLink to="/resources" class="inline-link">分享</NuxtLink>。</p>
    </div>

    <section v-if="entries.length" class="recent-writing" aria-labelledby="writing-title">
      <div class="section-heading"><h2 id="writing-title">最近记录</h2><NuxtLink class="text-link" to="/writing">全部 →</NuxtLink></div>
      <WritingList :entries="entries.slice(0, 3)" />
    </section>

    <div class="personal-contact">
      <p>也可以在这里找到我</p>
      <div class="social-links">
        <a v-for="social in profile.social" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer">{{ social.name }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { profile, projects } from '~/data/profile'
import { entries } from '~/data/writing'
useSeoMeta({ title: '作品与日常', description: `${profile.introduction}${profile.description}` })
</script>
