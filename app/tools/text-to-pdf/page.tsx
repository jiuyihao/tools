'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw, Download } from 'lucide-react'

/**
 * 文本转PDF工具组件
 * Text to PDF tool component
 */
export default function TextToPdfPage() {
  const [text, setText] = useState('这是一个示例文本。\n\n您可以在这里输入任何文本内容，然后将其转换为PDF格式。\n\n支持多行文本和基本格式。')
  const [filename, setFilename] = useState('document.pdf')

  /**
   * 生成PDF
   */
  const generatePDF = () => {
    // 创建一个简单的PDF内容
    const content = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #333; }
            p { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>文档标题</h1>
          <div>${text.replace(/\n/g, '<br>')}</div>
        </body>
      </html>
    `

    // 创建Blob对象
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    // 创建下载链接
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL
    URL.revokeObjectURL(url)
  }

  /**
   * 重置
   */
  const reset = () => {
    setText('这是一个示例文本。\n\n您可以在这里输入任何文本内容，然后将其转换为PDF格式。\n\n支持多行文本和基本格式。')
    setFilename('document.pdf')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">文本转PDF</h1>
        <p className="text-muted-foreground">将文本内容转换为PDF文档</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              文本输入
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                重置
              </Button>
            </CardTitle>
            <CardDescription>输入要转换的文本内容</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">文件名</label>
              <input
                type="text"
                value={filename}
                onChange={e => setFilename(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="document.pdf"
              />
            </div>
            <Textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="输入文本内容..."
              className="min-h-[300px]"
            />
            <Button onClick={generatePDF} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              生成PDF
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>预览</CardTitle>
            <CardDescription>文本内容预览</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg min-h-[300px] whitespace-pre-wrap">
              {text || '在这里输入文本内容...'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 