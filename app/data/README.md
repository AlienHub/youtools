# 数据配置说明

本目录采用模块化的 YAML 配置方式，便于维护和扩展。

## 目录结构

```
app/data/
├── cards.ts              # 类型定义和数据加载逻辑
├── page-config.yaml      # 页面全局配置
├── README.md             # 本说明文档
└── groups/               # 卡片分组目录
    ├── autoCap/          # 分组文件夹（文件夹名 = 分组 ID）
    │   └── config.yaml
    ├── shortcuts/
    │   ├── config.yaml
    │   ├── notes.md      # 分组笔记（可选）
    │   └── n8n-workflow.json  # 外部引用的 JSON 数据
    ├── mac-tools/
    │   ├── config.yaml
    │   └── notes.md      # 分组笔记（可选）
    └── white-board/
        └── config.yaml
```

## 添加新分组

1. 在 `groups/` 目录下创建新文件夹，文件夹名即为分组 ID
2. 在文件夹中创建 `config.yaml` 文件
3. 按照以下格式填写内容：

```yaml
title: 分组标题
description: 分组描述（可选）

cards:
  - title: 卡片标题
    link: https://example.com
    linkName: 链接文字
    showIcon: true
    showUpdateTime: true
    updateTime: 2025-12-06T16:00:00
    customIcon: https://example.com/icon.png  # 可选
    description: 卡片描述  # 可选
```

## 添加新卡片

在对应分组的 `config.yaml` 文件中，在 `cards:` 数组里添加新条目：

```yaml
cards:
  - title: 新卡片
    link: https://example.com
    linkName: 访问链接
    showIcon: true
    showUpdateTime: true
    updateTime: 2025-12-06T16:00:00
```

## 卡片字段说明

### 必填字段
- `title`: 卡片标题

### 可选字段
- `link`: 链接地址
- `linkName`: 链接文字
- `showIcon`: 是否显示图标（true/false）
- `showUpdateTime`: 是否显示更新时间（true/false）
- `updateTime`: 更新时间（ISO 8601 格式）
- `customIcon`: 自定义图标 URL
- `description`: 卡片描述
- `shrink`: 卡片宽度（1 或 2，2 表示占两列）

### 高级功能：侧边栏
当 `shrink: 2` 时，可以添加侧边栏内容：

```yaml
- title: 卡片标题
  shrink: 2
  side:
    title: 侧边栏标题
    buttonName: 按钮文字
    action:
      type: copy  # 或 link
      value: 要复制的文本  # 或要跳转的 URL
```

### 引用外部文件
如果 `action.value` 内容很长（如 JSON），可以使用外部文件：

```yaml
action:
  type: copy
  valueFile: data.json  # 相对于当前分组目录的文件路径
```

然后在同一目录下创建 `data.json` 文件存储具体内容。

## 添加分组笔记

每个分组可以添加详细的说明文档，支持完整的 Markdown 语法。

### 创建笔记

在分组文件夹中创建 `notes.md` 文件：

```bash
touch app/data/groups/your-group/notes.md
```

### Markdown 功能支持

笔记支持完整的 Markdown 语法：

- ✅ 标题（H1-H6）
- ✅ 段落和换行
- ✅ **粗体**、*斜体*
- ✅ 列表（有序/无序）
- ✅ 代码块和行内代码
- ✅ 引用
- ✅ 链接
- ✅ 分隔线
- ✅ 表格
- ✅ Emoji 😊

### 笔记示例

```markdown
# 工具使用指南

这里是详细的使用说明...

## 安装步骤

1. 下载文件
2. 解压缩
3. 运行安装程序

## 注意事项

> 💡 **提示**：首次使用需要授予权限

### 常见问题

**Q: 如何更新？**  
A: 在设置中点击"检查更新"

---

更多信息请访问 [官方文档](https://example.com)
```

### 显示效果

- 笔记会显示在分组标题下方
- 默认折叠，点击"📝 查看详细说明"展开
- 支持深色模式
- 响应式设计，适配各种屏幕

## 页面配置

编辑 `page-config.yaml` 可修改页面全局配置：

```yaml
title: 👋 页面标题
description: 页面描述

socialLinks:
  - id: xiaohongshu
    name: xiaohongshu
    url: https://www.xiaohongshu.com/...
    icon: simple-icons:xiaohongshu
    color: hover:text-red-500
```

## 注意事项

1. YAML 文件对缩进敏感，请使用 2 个空格缩进
2. 日期格式必须为 ISO 8601（`YYYY-MM-DDTHH:mm:ss`）
3. 文件夹名只能包含字母、数字、连字符和下划线
4. 修改后会自动热更新，无需重启服务器
5. 如果内容包含特殊字符（如冒号、引号），请使用引号包裹

