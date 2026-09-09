# Alien · 作品与日常

个人站，使用 Nuxt 4、Vue 3 和 Nuxt UI。首页展示作品，记录页承载探索与想法，分享页保留原有资源。

## 本地运行

```sh
pnpm install
pnpm dev
```

`pnpm build` 构建，`pnpm preview` 预览生产版本。

## 内容维护

- `app/data/profile.ts`：名字、自我介绍、社交链接、作品介绍及官网链接。
- `public/images/`：作品图标。
- `app/content/writing/*.md`：记录。文件名就是 URL slug。
- `app/data/groups/*/config.yaml`：资源卡片。格式见 `app/data/README.md`。
- `app/data/groups/*/notes.md`：资源说明，在独立阅读页展示。

### 发布记录

新建 `app/content/writing/first-note.md`：

```markdown
---
type: 想法
date: "2026-09-09"
title: 可选的标题
summary: 可选的摘要
draft: true
---

这里写正文，可以只是一句话。准备公开时将 draft 改为 false。
```

`type` 支持「探索」「想法」。日期必须加引号。记录按日期倒序，首页展示最新三条；没有已发布内容时显示空状态。修改内容后需重新构建部署。

作品可设置 `url` 作为外链；内部开发中的作品可省略 `url`，并设置 `status` 展示状态。
