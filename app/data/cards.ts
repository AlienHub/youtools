export interface Card {
  id: number
  title: string
  link?: string
  linkName?: string
  showIcon?: boolean
  showUpdateTime?: boolean
  updateTime?: Date
  description?: string
  customIcon?: string
  // 卡片宽度收缩比例（1 或 2）。2 表示占用两列。
  shrink?: 1 | 2
  // 当 shrink=2 时的右侧区域数据
  side?: {
    title?: string
    // 按钮名称
    buttonName?: string
    // 按钮操作
    action?: {
      // 复制文本 或 跳转 URL
      type: 'copy' | 'link'
      // 当 type=copy 时是要复制的文本；当 type=link 时是跳转的 URL
      value: string
    }
  }
}

export interface CardGroup {
  id: string
  title: string
  description?: string
  cards: Card[]
}

// 自动 ID 生成器
let nextCardId = 1

// 生成数字 ID
const generateNumericId = (): number => {
  return nextCardId++
}

// 生成 UUID（可选，如果需要更复杂的 ID）
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 创建卡片（使用数字 ID）
const createCard = (cardData: Omit<Card, 'id'>): Card => {
  return {
    id: generateNumericId(),
    ...cardData
  }
}

// 批量创建卡片（更简洁的方式）
const createCards = (cardsData: Omit<Card, 'id'>[]): Card[] => {
  return cardsData.map(cardData => createCard(cardData))
}

// 创建分组（最简洁的方式）
const createGroup = (groupData: Omit<CardGroup, 'cards'>, cardsData: Omit<Card, 'id'>[]): CardGroup => {
  return {
    ...groupData,
    cards: createCards(cardsData)
  }
}

// 重置 ID 计数器（用于开发环境）
export const resetCardIdCounter = () => {
  nextCardId = 1
}

// 获取下一个可用的 ID（用于调试）
export const getNextCardId = () => nextCardId

export const cardGroups: CardGroup[] = [
  createGroup(
    {
      id: 'autoCap',
      title: 'AutoCap',
      description: '自动记录、框选记录、手动截图一应俱全，更好用的截图浏览器插件。',
    },
    [
      {
        title: 'AutoCap',
        link: 'https://chromewebstore.google.com/detail/autocap-%E7%82%B9%E5%87%BB%E8%AE%B0%E5%BD%95%E5%B7%A5%E5%85%B7/fbopkjfadlbmilalkfccmkigacggafnd',
        linkName: '安装 AutoCap',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-12-06T16:00:00'),
        customIcon: 'https://download.pindo.life/autocap-icon.png'
      }
    ]
  ),
  // 快捷指令
  createGroup(
    {
      id: 'shortcuts',
      title: '快捷指令',
      description: '简单好用的快捷指令',
    },
    [
      {
        title: 'Auto验证码',
        link: 'https://www.icloud.com/shortcuts/685e9f6668704d06be65ebd11a2a0172',
        linkName: '获取快捷指令',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00'),
      },
      {
        title: '快速阅读HTML报告',
        link: 'https://www.icloud.com/shortcuts/ba4b41a98dda4fb39bf65f003f3c4ac3',
        linkName: '获取快捷指令',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00'),
      },
      {
        title: 'AI 日程助手',
        link: 'https://www.icloud.com/shortcuts/8654c724d406411898db75f61084386d',
        linkName: '获取快捷指令',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-23T21:00:00'),
      },
      {
        title: 'AI 公众号总结',
        link: 'https://www.icloud.com/shortcuts/3fb21248693746299029b51977a6f11f',
        linkName: '获取快捷指令',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-27T10:30:00'),
        shrink: 2,
        side: {
          title: '获取 N8N 工作流',
          buttonName: '复制工作流',
          action: { 
            type: 'copy', 
            value: JSON.stringify({
              "nodes": [
                {
                  "parameters": {
                    "httpMethod": "POST",
                    "path": "0956468b-5cf8-4b14-a6af-3b8502d185c3",
                    "responseMode": "lastNode",
                    "options": {}
                  },
                  "type": "n8n-nodes-base.webhook",
                  "typeVersion": 2.1,
                  "position": [-368, -80],
                  "id": "8e97fb5b-bb01-4e80-a72f-6729ab906aae",
                  "name": "Webhook",
                  "webhookId": "0956468b-5cf8-4b14-a6af-3b8502d185c3"
                },
                {
                  "parameters": {
                    "promptType": "define",
                    "text": "={{ $json.article_content }}",
                    "options": {
                      "systemMessage": "角色 (Persona)\n你是一位顶尖出版社的资深内容编辑，以眼光独到、逻辑严谨、善于发现文章核心价值而著称。\n\n任务指令 (Instructions)\n1. 核心任务\n为以下公众号文章撰写一份高质量的、便于读者快速理解的总结。\n\n2. 输出结构\n严格按照以下两部分输出：\n\n第一部分：核心摘要\n\n在开头生成一段简明扼要的摘要（3-5句话）。\n\n内容需精准概括文章的核心论点、主要论证和最终结论。\n\n输出要求 (Requirements)\n语言风格：专业、客观、精炼，通俗易懂。\n\n思维模式：请完全代入编辑角色，用审视和提炼的眼光来处理文本，旨在产出一份超越普通概括的优质总结。"
                    }
                  },
                  "type": "@n8n/n8n-nodes-langchain.agent",
                  "typeVersion": 2.2,
                  "position": [272, -80],
                  "id": "ddf14e60-f401-4a41-bf05-764f71121c27",
                  "name": "AI Agent"
                },
                {
                  "parameters": {
                    "model": {
                      "__rl": true,
                      "value": "qwen-turbo",
                      "mode": "id"
                    },
                    "options": {}
                  },
                  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
                  "typeVersion": 1.2,
                  "position": [272, 128],
                  "id": "88ddd474-cd60-401d-bc49-7e1fd04c4fac",
                  "name": "OpenAI Chat Model",
                  "credentials": {
                    "openAiApi": {
                      "id": "lvjdPIQX74g9Vc1I",
                      "name": "OpenAi account"
                    }
                  }
                },
                {
                  "parameters": {
                    "url": "={{ $json.query.url }}",
                    "sendHeaders": true,
                    "headerParameters": {
                      "parameters": [
                        {
                          "name": "user-agent",
                          "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
                        }
                      ]
                    },
                    "options": {}
                  },
                  "type": "n8n-nodes-base.httpRequest",
                  "typeVersion": 4.2,
                  "position": [-128, -80],
                  "id": "96e8f50a-4beb-4ba0-af60-d08543d19f05",
                  "name": "微信公众号内容获取"
                },
                {
                  "parameters": {
                    "language": "python",
                    "pythonCode": "# 导入所需的库\n# 注意：您需要在 n8n 的环境变量中安装 beautifulsoup4。\n# 环境变量名: N8N_PYTHON_PACKAGES\n# 值: beautifulsoup4\nfrom bs4 import BeautifulSoup\n\n# n8n 会将输入数据作为名为 'items' 的列表传递给这个脚本\n# 我们将创建一个新的列表来存放处理后的结果\nresults = []\n\n# 遍历 n8n 传递过来的每一个 item\nfor item in items:\n    # **FIX**: 根据您的截图，HTML内容存放在 'data' 字段中，而不是 'html'\n    # 使用 .get() 方法可以避免在字段不存在时报错\n    html_content = item.json.get('data')\n\n    # 准备一个新的字典来存放输出结果\n    # 将 item.json 转换为标准 Python 字典使其可修改\n    new_json = dict(item.json)\n\n    if html_content:\n        try:\n            # 使用 BeautifulSoup 解析 HTML\n            # 'html.parser' 是 Python 内置的解析器\n            soup = BeautifulSoup(html_content, 'html.parser')\n\n            # 使用 CSS 选择器 '#page-content' 来查找对应的 div 元素\n            # select_one 会返回第一个匹配的元素，因为 ID 是唯一的，所以这很适用\n            content_div = soup.select_one('#page-content')\n\n            if content_div:\n                # 如果找到了该元素，就提取其中的所有文本\n                # separator='\\n' 会在不同 HTML 签的文本之间插入换行符，使格式更美观\n                # strip=True 会移除每个文本块开头和结尾多余的空白字符\n                article_text = content_div.get_text(separator='\\n', strip=True)\n                new_json['article_content'] = article_text\n            else:\n                # 如果没有找到对应的元素，则返回提示信息\n                new_json['article_content'] = '未找到ID为 \"page-content\" 的元素'\n\n        except Exception as e:\n            # 如果解析过程中发生任何错误，记录错误信息\n            new_json['error'] = str(e)\n            new_json['article_content'] = None\n    else:\n        # 如果输入的 item 中没有 'html' 或 'data' 字段\n        new_json['article_content'] = '未提供HTML内容'\n\n    # 将处理后的数据添加到结果列表中\n    results.append({'json': new_json})\n\n# 将最终的结果返回给 n8n 的下一个节点\nreturn results\n"
                  },
                  "type": "n8n-nodes-base.code",
                  "typeVersion": 2,
                  "position": [112, -80],
                  "id": "21559195-df49-425b-a9bd-3e6c6c2b4b09",
                  "name": "文本提取解析"
                }
              ],
              "connections": {
                "Webhook": {
                  "main": [
                    [
                      {
                        "node": "微信公众号内容获取",
                        "type": "main",
                        "index": 0
                      }
                    ]
                  ]
                },
                "AI Agent": {
                  "main": [
                    []
                  ]
                },
                "OpenAI Chat Model": {
                  "ai_languageModel": [
                    [
                      {
                        "node": "AI Agent",
                        "type": "ai_languageModel",
                        "index": 0
                      }
                    ]
                  ]
                },
                "微信公众号内容获取": {
                  "main": [
                    [
                      {
                        "node": "文本提取解析",
                        "type": "main",
                        "index": 0
                      }
                    ]
                  ]
                },
                "文本提取解析": {
                  "main": [
                    [
                      {
                        "node": "AI Agent",
                        "type": "main",
                        "index": 0
                      }
                    ]
                  ]
                }
              },
              "pinData": {},
              "meta": {
                "instanceId": "d6480a2a6de221b9d79a55002b272cb99a06eb75b284f7aaeacd4ffc89527a1f"
              }
            }, null, 2)
          }
        }
      }
    ]
  ),

  createGroup(
    {
      id: 'mac-tools',
      title: 'Mac工具',
      description: '收集记录一些好用的Mac工具',
    },
    [
      {
        title: 'Ice 导航栏软件',
        link: 'https://download.pindo.life/ice.dmg',
        linkName: '下载 Ice 中文版',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00'),
        customIcon: 'https://ice.pindo.life/icon.png'
      },
      {
        title: 'Ice - MacOS26 测试版',
        link: 'https://download.pindo.life/Ice.zip',
        linkName: '🚧无中文🚧',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00'),
        customIcon: 'https://ice.pindo.life/icon.png'
      },
      {
        title: 'NotchBin 灵动岛',
        link: 'https://download.pindo.life/NotchBin.dmg',
        linkName: '下载 NotchBin 中文版',
        showIcon: false,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00')
      },
      {
        title: 'BLEUnlock',
        link: 'https://github.com/ts1/BLEUnlock/releases/download/1.12.2/BLEUnlock-1.12.2.zip',
        linkName: '下载 BLEUnlock',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-12-22T19:57:00')
      }
    ]
  ),

  createGroup(
    {
      id: 'white-board',
      title: '白板软件',
      description: '收集记录一些好用的白板软件',
    },
    [
      {
        title: 'Infinity',
        link: 'https://infinity.ooo/',
        linkName: 'infinity',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00'),
        description: '无限画布设计工具'
      },
      {
        title: "Excalidraw",
        link: 'https://excalidraw.com/',
        linkName: 'Excalidraw',
        showIcon: true,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00'),
        description: 'Excalidraw'
      }
    ]
  )
]

// 获取所有分组
export const getCardGroups = () => cardGroups

// 根据分组ID获取分组
export const getCardGroupById = (id: string) => {
  return cardGroups.find(group => group.id === id)
}

// 获取所有卡片（扁平化）
export const getAllCards = () => {
  return cardGroups.flatMap(group => group.cards)
}

// 根据ID获取卡片
export const getCardById = (id: number) => {
  return getAllCards().find(card => card.id === id)
}

// 搜索卡片（跨分组）
export const searchCards = (query: string) => {
  const searchQuery = query.toLowerCase()
  return cardGroups.map(group => ({
    ...group,
    cards: group.cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery) ||
      card.description?.toLowerCase().includes(searchQuery) ||
      group.title.toLowerCase().includes(searchQuery)
    )
  })).filter(group => group.cards.length > 0)
}

// 社交媒体链接配置
export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  color?: string
}

// 页面配置
export interface PageConfig {
  title: string
  description: string
  socialLinks?: SocialLink[]
}

export const pageConfig: PageConfig = {
  title: "👋 NiHaoooooo",
  description: "分享任何有趣的内容。",
  socialLinks: [
    {
      id: 'xiaohongshu',
      name: 'xiaohongshu',
      url: 'https://www.xiaohongshu.com/user/profile/62a027220000000021022915',
      icon: 'simple-icons:xiaohongshu',
      color: 'hover:text-red-500'
    }
  ]
}

// 获取页面配置
export const getPageConfig = () => pageConfig
