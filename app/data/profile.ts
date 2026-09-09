export const profile = {
  name: 'Alien',
  introduction: '你好，我是 Alien。我做一些小工具，也记录工作和生活中的探索与想法。',
  description: '也在这里记录工作与生活中的探索、想法，分享自己觉得有用的东西。',
  social: [
    { name: 'GitHub', url: 'https://github.com/AlienHub' },
    { name: '小红书', url: 'https://www.xiaohongshu.com/user/profile/62a027220000000021022915' },
  ],
}

export const projects = [
  {
    name: 'Alum', platform: 'macOS', icon: '/images/alum.png',
    tagline: '无感的 Mac 验证码输入工具',
    description: '光标留在输入框，连按两次 Option，匹配并填入验证码。',
    status: '内部开发中',
  },
  {
    name: 'Hover', platform: 'macOS', icon: '/images/hover.png',
    tagline: '把需要的上下文留在眼前',
    description: '让截图、文字和实时画面浮在工作区，一边参考，一边继续。',
    url: 'https://hover.pindo.page',
  },
  {
    name: 'AutoCap', platform: 'Chrome 扩展', icon: '',
    tagline: '自动记录网页操作的浏览器插件',
    description: '自动记录网页点击、截图并高亮，整理成图文操作步骤。',
    url: 'https://chromewebstore.google.com/detail/autocap-点击记录工具/fbopkjfadlbmilalkfccmkigacggafnd',
  },
]
