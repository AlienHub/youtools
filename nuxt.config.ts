// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  
  // SEO 配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  
  // 其他 SEO 优化
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  ui: {
    fonts: false
  }
})
