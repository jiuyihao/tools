'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const CHEATSHEET = [
  { className: 'bg-blue-500', desc: '背景色 蓝色-500' },
  { className: 'text-center', desc: '文字居中' },
  { className: 'flex', desc: '弹性布局' },
  { className: 'rounded-lg', desc: '大圆角' },
  { className: 'shadow', desc: '阴影' },
  { className: 'p-4', desc: '内边距 1rem' },
  { className: 'mt-2', desc: '上外边距 0.5rem' },
  { className: 'w-full', desc: '宽度100%' },
  { className: 'hover:bg-gray-100', desc: '悬停变灰' },
  { className: 'text-sm', desc: '小号文字' },
]

export default function TailwindCheatsheetPage() {
  const [query, setQuery] = useState('')
  const filtered = CHEATSHEET.filter(item =>
    item.className.includes(query) || item.desc.includes(query)
  )
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Tailwind 类名速查</h1>
        <p className="text-muted-foreground">常用TailwindCSS类名一览，支持搜索</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>类名速查</CardTitle>
          <CardDescription>输入关键词快速查找</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="输入类名或描述..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-2">
            {filtered.length === 0 && <div className="text-muted-foreground">无匹配结果</div>}
            {filtered.map(item => (
              <div key={item.className} className="flex items-center justify-between bg-muted rounded px-3 py-2">
                <span className="font-mono text-sm">{item.className}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 