export const useTimeFormat = () => {
  // 格式化相对时间
  const formatRelativeTime = (time: string | Date): string => {
    if (!time) return ''
    
    const date = typeof time === 'string' ? new Date(time) : time
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return '刚刚'
    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}小时前`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}天前`
    
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // 格式化绝对时间
  const formatAbsoluteTime = (time: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    if (!time) return ''
    
    const date = typeof time === 'string' ? new Date(time) : time
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    
    return date.toLocaleDateString('zh-CN', options || defaultOptions)
  }

  // 格式化日期
  const formatDate = (time: string | Date): string => {
    if (!time) return ''
    
    const date = typeof time === 'string' ? new Date(time) : time
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // 检查时间是否有效
  const isValidTime = (time: string | Date): boolean => {
    if (!time) return false
    
    const date = typeof time === 'string' ? new Date(time) : time
    return !isNaN(date.getTime())
  }

  // 获取时间差（毫秒）
  const getTimeDiff = (time: string | Date): number => {
    if (!time) return 0
    
    const date = typeof time === 'string' ? new Date(time) : time
    const now = new Date()
    return now.getTime() - date.getTime()
  }

  return {
    formatRelativeTime,
    formatAbsoluteTime,
    formatDate,
    isValidTime,
    getTimeDiff
  }
}
