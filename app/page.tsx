'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Moon, Sun, ExternalLink, Search, X, Sparkles, Zap, Palette, Clock, Calculator, Code, Wrench, Dice1, FileText } from 'lucide-react'

/**
 * 工具数据接口
 * Tool data interface
 */
interface Tool {
  slug: string
  name: string
  description: string
  category: string
  icon: string
  size: 'small' | 'medium' | 'large'
  gradient: string
}

/**
 * 工具列表数据
 * Tools list data
 */
const tools: Tool[] = [
  // 文本处理
  { slug: 'word-count', name: 'Word Count', description: '实时统计文本字数、字符数、行数等信息', category: '文本处理', icon: '📝', size: 'medium', gradient: 'from-blue-500 to-cyan-500' },
  { slug: 'markdown-preview', name: 'Markdown Preview', description: '实时预览Markdown渲染效果，支持语法高亮', category: '文本处理', icon: '📄', size: 'large', gradient: 'from-purple-500 to-pink-500' },
  { slug: 'diff-viewer', name: 'Text Diff', description: '对比两段文本的差异，高亮显示变化', category: '文本处理', icon: '🔍', size: 'medium', gradient: 'from-green-500 to-emerald-500' },
  
  // 颜色/设计
  { slug: 'color-picker', name: 'Color Picker', description: '取色并获取HEX、RGB、HSL格式的颜色值', category: '颜色/设计', icon: '🎨', size: 'large', gradient: 'from-pink-500 to-rose-500' },
  { slug: 'tailwind-cheatsheet', name: 'Tailwind Lookup', description: '常用TailwindCSS类名速查，支持搜索', category: '颜色/设计', icon: '🎯', size: 'small', gradient: 'from-indigo-500 to-purple-500' },
  
  // 日期/时间
  { slug: 'countdown-timer', name: 'Countdown', description: '倒计时工具，支持自定义时间设置', category: '日期/时间', icon: '⏰', size: 'small', gradient: 'from-orange-500 to-red-500' },
  
  // 数学/单位
  { slug: 'random-number', name: 'RNG', description: '生成指定范围内的随机数，包含统计信息', category: '数学/单位', icon: '🎲', size: 'medium', gradient: 'from-yellow-500 to-orange-500' },
  
  // 编码/加密
  { slug: 'qr-generator', name: 'QR Maker', description: '生成文本或链接的二维码，支持自定义尺寸', category: '编码/加密', icon: '📱', size: 'medium', gradient: 'from-teal-500 to-cyan-500' },
  
  // Web/DevTools
  { slug: 'json-to-ts', name: 'JSON→TS Interface', description: '将JSON对象转换为TypeScript接口定义', category: 'Web/DevTools', icon: '🔧', size: 'large', gradient: 'from-slate-500 to-gray-500' },
  
  // 随机/生成器
  { slug: 'quote-generator', name: 'Quote Gen', description: '生成励志名言，支持复制分享', category: '随机/生成器', icon: '💭', size: 'small', gradient: 'from-violet-500 to-purple-500' },
  { slug: 'lottery-picker', name: 'Lottery Pick', description: '随机抽取参与者，支持自定义名单', category: '随机/生成器', icon: '🎰', size: 'medium', gradient: 'from-red-500 to-pink-500' },
  
  // 文件/文档
  { slug: 'text-to-pdf', name: 'Text→PDF', description: '将文本转换为PDF文档，支持自定义文件名', category: '文件/文档', icon: '📄', size: 'medium', gradient: 'from-blue-600 to-indigo-600' },
]

/**
 * 分类图标映射
 * Category icon mapping
 */
const categoryIcons = {
  '文本处理': FileText,
  '颜色/设计': Palette,
  '日期/时间': Clock,
  '数学/单位': Calculator,
  '编码/加密': Code,
  'Web/DevTools': Wrench,
  '随机/生成器': Dice1,
  '文件/文档': FileText,
}

const categories = [
  { key: 'all', label: '全部工具' },
  { key: '文本处理', label: '文本处理' },
  { key: '颜色/设计', label: '颜色 / 设计' },
  { key: '日期/时间', label: '日期 / 时间' },
  { key: '数学/单位', label: '数学 / 单位' },
  { key: '编码/加密', label: '编码 / 加密' },
  { key: 'Web/DevTools', label: 'Web / DevTools' },
  { key: '随机/生成器', label: '随机 / 生成器' },
  { key: '文件/文档', label: '文件 / 文档' },
]

/**
 * 主页面组件
 * Main page component
 */
export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  /**
   * 切换主题
   * Toggle theme
   */
  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  /**
   * 跳转到工具页面
   * Navigate to tool page
   */
  const navigateToTool = (slug: string) => {
    window.location.href = `/tools/${slug}`
  }

  /**
   * 清空搜索
   * Clear search
   */
  const clearSearch = () => {
    setSearchQuery('')
  }

  /**
   * 过滤工具
   * Filter tools based on search query
   */
  const filteredTools = useMemo(() => {
    let filtered = tools
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.slug.toLowerCase().includes(query)
      )
    }
    return filtered
  }, [activeCategory, searchQuery])

  /**
   * 按分类分组过滤后的工具
   * Group filtered tools by category
   */
  const groupedFilteredTools = useMemo(() => {
    return filteredTools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = []
      }
      acc[tool.category].push(tool)
      return acc
    }, {} as Record<string, Tool[]>)
  }, [filteredTools])

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* 头部 */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                开发者工具集
              </h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-accent"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="container mx-auto px-4 py-8">
          {/* 分类Tab */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`px-5 py-2 rounded-full font-medium text-base transition-all border border-transparent focus:outline-none
                  ${activeCategory === cat.key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-muted text-foreground hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white'}
                `}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 搜索框 */}
          <div className="mb-8">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="搜索工具名称、描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-12 text-lg border-2 focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {searchQuery && (
              <div className="text-center mt-3 text-sm text-muted-foreground">
                找到 <span className="font-semibold text-blue-600">{filteredTools.length}</span> 个工具
              </div>
            )}
          </div>

          {/* 工具卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTools.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                暂无工具，换个关键词试试吧！
              </div>
            )}
            {filteredTools.map(tool => (
              <Card
                key={tool.slug}
                className="group cursor-pointer hover:shadow-xl transition-all h-48 flex flex-col justify-between border border-border bg-gradient-to-br from-background to-muted/60"
                onClick={() => navigateToTool(tool.slug)}
              >
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold">
                    {tool.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {tool.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-end items-end pb-2">
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* 底部 */}
        <footer className="border-t mt-20 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="font-semibold">开发者工具集</span>
              </div>
              <p className="text-muted-foreground">
                © 2024 为开发者而生 - 提升开发效率的实用工具集合
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 