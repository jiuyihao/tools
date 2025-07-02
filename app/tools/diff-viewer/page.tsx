'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

/**
 * 文本差异对比工具组件
 * Text diff tool component
 */
export default function DiffViewerPage() {
  const [left, setLeft] = useState('Hello\nWorld')
  const [right, setRight] = useState('Hello\nAI')

  /**
   * 重置输入
   */
  const reset = () => {
    setLeft('')
    setRight('')
  }

  /**
   * 简单行级diff
   */
  const getDiff = () => {
    const leftLines = left.split('\n')
    const rightLines = right.split('\n')
    const maxLen = Math.max(leftLines.length, rightLines.length)
    const result = []
    for (let i = 0; i < maxLen; i++) {
      if (leftLines[i] === rightLines[i]) {
        result.push(<div key={i} className="text-green-600">{leftLines[i] || rightLines[i]}</div>)
      } else {
        if (leftLines[i]) result.push(<div key={i+"l"} className="bg-red-100 text-red-600">- {leftLines[i]}</div>)
        if (rightLines[i]) result.push(<div key={i+"r"} className="bg-blue-100 text-blue-600">+ {rightLines[i]}</div>)
      }
    }
    return result
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">文本差异对比</h1>
        <p className="text-muted-foreground">对比两段文本的不同之处</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              左侧文本
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />重置
              </Button>
            </CardTitle>
            <CardDescription>输入第一段文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={left} onChange={e => setLeft(e.target.value)} placeholder="左侧文本..." className="min-h-[200px]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>右侧文本</CardTitle>
            <CardDescription>输入第二段文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={right} onChange={e => setRight(e.target.value)} placeholder="右侧文本..." className="min-h-[200px]" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>差异结果</CardTitle>
          <CardDescription>绿色为相同，红色为左侧独有，蓝色为右侧独有</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-mono space-y-1 text-sm">{getDiff()}</div>
        </CardContent>
      </Card>
    </div>
  )
} 