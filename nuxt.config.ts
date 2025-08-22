// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  
  // SEO 配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; img-src 'self' data: https: http:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
        },
        {
          name: 'referrer',
          content: 'no-referrer-when-downgrade'
        }
      ]
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
