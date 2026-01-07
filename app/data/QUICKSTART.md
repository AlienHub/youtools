# 快速入门指南

## 🚀 5分钟上手

### 1. 添加新的工具分组

创建新文件夹并添加配置：

```bash
# 创建分组文件夹
mkdir app/data/groups/my-tools

# 创建配置文件
touch app/data/groups/my-tools/config.yaml
```

在 `config.yaml` 中添加内容：

```yaml
title: 我的工具
description: 收集的实用工具

cards:
  - title: 工具名称
    link: https://example.com
    linkName: 访问链接
    showIcon: true
    showUpdateTime: true
    updateTime: 2025-12-06T16:00:00
```

### 2. 添加详细说明（可选）

创建笔记文件：

```bash
touch app/data/groups/my-tools/notes.md
```

在 `notes.md` 中添加 Markdown 内容：

```markdown
# 工具使用说明

这里可以添加详细的说明文档...

## 安装步骤
1. 步骤一
2. 步骤二

## 使用技巧
- 技巧一
- 技巧二
```

### 3. 查看效果

保存文件后，浏览器会自动刷新显示新内容！

## 📝 实用技巧

### 添加自定义图标

```yaml
cards:
  - title: 工具名称
    customIcon: https://example.com/icon.png
```

### 创建宽卡片（占两列）

```yaml
cards:
  - title: 特殊工具
    shrink: 2
    side:
      title: 额外信息
      buttonName: 复制文本
      action:
        type: copy
        value: 要复制的内容
```

### 引用外部 JSON 文件

当 `action.value` 内容很长时：

```yaml
# config.yaml
action:
  type: copy
  valueFile: data.json  # 引用同目录下的文件
```

```bash
# 创建外部文件
echo '{"key": "value"}' > app/data/groups/my-tools/data.json
```

## 🎨 Markdown 样式示例

笔记支持丰富的 Markdown 语法：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体** 和 *斜体*

- 列表项 1
- 列表项 2

1. 有序列表 1
2. 有序列表 2

> 💡 这是一个提示框

`行内代码`

\`\`\`javascript
// 代码块
console.log('Hello World')
\`\`\`

[链接文字](https://example.com)

---

| 表头1 | 表头2 |
|------|------|
| 内容1 | 内容2 |
```

## 📂 目录结构参考

```
app/data/groups/
├── my-tools/              # 你的分组
│   ├── config.yaml        # 必需：卡片配置
│   ├── notes.md          # 可选：详细说明
│   └── data.json         # 可选：外部数据
```

## ⚡ 常见问题

### Q: 修改后没有生效？
A: 确保文件格式正确，YAML 对缩进敏感（使用 2 个空格）

### Q: 如何修改页面标题？
A: 编辑 `app/data/page-config.yaml`

### Q: 日期格式是什么？
A: ISO 8601 格式：`YYYY-MM-DDTHH:mm:ss`，例如 `2025-12-06T16:00:00`

### Q: 可以删除笔记吗？
A: 可以，删除 `notes.md` 文件即可

## 🔍 更多帮助

查看详细文档：`app/data/README.md`

