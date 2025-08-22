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
        title: 'NotchBin 灵动岛',
        link: 'https://download.pindo.life/NotchBin.dmg',
        linkName: '下载 NotchBin 中文版',
        showIcon: false,
        showUpdateTime: true,
        updateTime: new Date('2025-08-22T16:00:00')
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

// 页面配置
export interface PageConfig {
  title: string
  description: string
}

export const pageConfig: PageConfig = {
  title: "👋 NiHaoooooo",
  description: "分享任何有趣的内容。"
}

// 获取页面配置
export const getPageConfig = () => pageConfig
