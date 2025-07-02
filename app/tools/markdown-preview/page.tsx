'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

/**
 * Markdown预览工具组件
 * Markdown preview tool component
 */
export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(`# Markdown 预览工具

## 功能特性

- **实时预览**：输入Markdown文本，实时查看渲染效果
- **语法高亮**：支持代码块语法高亮
- **响应式设计**：适配各种屏幕尺寸

## 使用示例

### 代码块
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 列表
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2

### 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |

### 链接和图片
[访问GitHub](https://github.com)

> 这是一个引用块

**粗体文本** 和 *斜体文本*
`)

  /**
   * 清空Markdown内容
   * Clear markdown content
   */
  const clearMarkdown = () => {
    setMarkdown('')
  }

  /**
   * 渲染Markdown为HTML
   * Render markdown to HTML
   */
  const renderMarkdown = (text: string) => {
    // 简单的Markdown渲染逻辑
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/^<p>/gim, '')
      .replace(/<\/p>$/gim, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/\|(.+)\|/gim, (match) => {
        const cells = match.split('|').filter(cell => cell.trim())
        return `<tr>${cells.map(cell => `<td>${cell.trim()}</td>`).join('')}</tr>`
      })
      .replace(/> (.*$)/gim, '<blockquote>$1</blockquote>')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Markdown 预览工具</h1>
        <p className="text-muted-foreground">实时预览Markdown文本的渲染效果</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Markdown输入 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Markdown 输入
              <Button variant="outline" size="sm" onClick={clearMarkdown}>
                <RotateCcw className="h-4 w-4 mr-2" />
                清空
              </Button>
            </CardTitle>
            <CardDescription>在下方输入Markdown文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="请输入Markdown文本..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[500px] resize-none font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* HTML预览 */}
        <Card>
          <CardHeader>
            <CardTitle>HTML 预览</CardTitle>
            <CardDescription>实时渲染的HTML效果</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="min-h-[500px] p-4 border rounded-md bg-background overflow-auto prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 