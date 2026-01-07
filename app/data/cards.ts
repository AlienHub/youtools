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
  // 笔记内容（Markdown 格式）
  notes?: string
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

// 从 YAML 文件导入数据
import yaml from 'js-yaml'

// 接口定义用于 YAML 数据中的原始卡片结构
interface RawCard extends Omit<Card, 'id' | 'updateTime'> {
  updateTime?: string
}

interface RawCardGroup extends Omit<CardGroup, 'cards'> {
  title: string
  description?: string
  cards: RawCard[]
}

// 动态导入所有分组的 YAML 配置文件
const groupConfigs = import.meta.glob<string>('./groups/*/config.yaml', { 
  query: '?raw',
  eager: true,
  import: 'default'
})

// 动态导入所有 JSON 文件（用于外部数据引用）
const externalJsonFiles = import.meta.glob<string>('./groups/*/*.json', { 
  query: '?raw',
  eager: true,
  import: 'default'
})

// 动态导入所有笔记 Markdown 文件
const notesFiles = import.meta.glob<string>('./groups/*/notes.md', { 
  query: '?raw',
  eager: true,
  import: 'default'
})

// 辅助函数：处理卡片中的外部文件引用
const processCardWithFileReferences = (card: any, groupId: string): Card => {
  const processedCard = { ...card }
  
  // 处理 side.action.valueFile
  if (card.side?.action?.valueFile) {
    const fileName = card.side.action.valueFile
    const filePath = `./groups/${groupId}/${fileName}`
    
    // 查找对应的 JSON 文件内容
    const jsonContent = externalJsonFiles[filePath]
    if (jsonContent) {
      // 将 JSON 内容作为字符串赋值给 value，并删除 valueFile
      processedCard.side = {
        ...card.side,
        action: {
          ...card.side.action,
          value: jsonContent,
          valueFile: undefined
        }
      }
      // 删除 valueFile 字段
      delete processedCard.side.action.valueFile
    }
  }
  
  return {
    ...processedCard,
    id: generateNumericId(),
    updateTime: card.updateTime ? new Date(card.updateTime) : undefined
  }
}

// 将 YAML 数据转换为带有 Date 对象和自动 ID 的 CardGroup[]
const loadCardGroups = (): CardGroup[] => {
  const groups: CardGroup[] = []
  
  // 遍历所有导入的 YAML 文件
  for (const [path, yamlContent] of Object.entries(groupConfigs)) {
    // 从路径中提取文件夹名称作为 id
    // 例如: './groups/autoCap/config.yaml' -> 'autoCap'
    const match = path.match(/\.\/groups\/([^/]+)\/config\.yaml/)
    if (!match || !match[1]) continue
    
    const groupId: string = match[1]
    
    // 解析 YAML
    const rawGroup = yaml.load(yamlContent) as RawCardGroup
    
    // 转换卡片数据（添加 ID、转换日期、处理文件引用）
    const cards: Card[] = rawGroup.cards.map(card => 
      processCardWithFileReferences(card, groupId)
    )
    
    // 加载笔记文件（如果存在）
    const notesPath = `./groups/${groupId}/notes.md`
    const notesContent = notesFiles[notesPath]
    
    // 创建分组
    groups.push({
      id: groupId,
      title: rawGroup.title,
      description: rawGroup.description,
      cards,
      notes: notesContent || undefined
    })
  }
  
  return groups
}

export const cardGroups: CardGroup[] = loadCardGroups()

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

// 导入页面配置 YAML
import pageConfigYaml from './page-config.yaml?raw'

// 解析并导出页面配置
export const pageConfig: PageConfig = yaml.load(pageConfigYaml) as PageConfig

// 获取页面配置
export const getPageConfig = () => pageConfig
