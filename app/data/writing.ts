import yaml from 'js-yaml'

export interface WritingEntry {
  slug: string
  title?: string
  date: string
  type: '探索' | '想法'
  summary: string
  content: string
}

const documents = import.meta.glob<string>('../content/writing/*.md', { query: '?raw', eager: true, import: 'default' })
export const entries: WritingEntry[] = Object.entries(documents).flatMap(([path, raw]) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error(`记录缺少 YAML 元信息：${path}`)
  const meta = yaml.load(match[1]!) as Record<string, unknown>
  if (meta.draft === true) return []
  if (typeof meta.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date))) throw new Error(`记录日期需为带引号的 YYYY-MM-DD：${path}`)
  if (meta.type !== '探索' && meta.type !== '想法') throw new Error(`记录类型需为探索或想法：${path}`)
  const content = match[2]!.trim()
  if (!content) throw new Error(`记录正文为空：${path}`)
  return [{
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: typeof meta.title === 'string' ? meta.title : undefined,
    date: meta.date,
    type: meta.type,
    summary: typeof meta.summary === 'string' ? meta.summary : content.replace(/[#*_>`\[\]]/g, '').replace(/\s+/g, ' ').slice(0, 120),
    content,
  }]
}).sort((a, b) => b.date.localeCompare(a.date))
