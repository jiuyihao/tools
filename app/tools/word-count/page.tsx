'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, RotateCcw } from 'lucide-react'

/**
 * 字数统计工具组件
 * Word count tool component
 */
export default function WordCountPage() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    paragraphs: 0
  })

  /**
   * 计算文本统计信息
   * Calculate text statistics
   */
  useEffect(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split('\n').length : 0
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs
    })
  }, [text])

  /**
   * 清空文本
   * Clear text
   */
  const clearText = () => {
    setText('')
  }

  /**
   * 复制统计结果
   * Copy statistics
   */
  const copyStats = () => {
    const statsText = `字符数（含空格）：${stats.characters}
字符数（不含空格）：${stats.charactersNoSpaces}
单词数：${stats.words}
行数：${stats.lines}
段落数：${stats.paragraphs}`
    
    navigator.clipboard.writeText(statsText)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">字数统计工具</h1>
        <p className="text-muted-foreground">实时统计文本的字数、字符数、行数等信息</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              输入文本
              <Button variant="outline" size="sm" onClick={clearText}>
                <RotateCcw className="h-4 w-4 mr-2" />
                清空
              </Button>
            </CardTitle>
            <CardDescription>在下方输入框中粘贴或输入要统计的文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="请输入要统计的文本..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>

        {/* 统计结果 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              统计结果
              <Button variant="outline" size="sm" onClick={copyStats}>
                <Copy className="h-4 w-4 mr-2" />
                复制
              </Button>
            </CardTitle>
            <CardDescription>实时显示文本统计信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{stats.characters}</div>
                  <div className="text-sm text-muted-foreground">字符数（含空格）</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
                  <div className="text-sm text-muted-foreground">字符数（不含空格）</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">{stats.words}</div>
                  <div className="text-sm text-muted-foreground">单词数</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">{stats.lines}</div>
                  <div className="text-sm text-muted-foreground">行数</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">{stats.paragraphs}</div>
                  <div className="text-sm text-muted-foreground">段落数</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 