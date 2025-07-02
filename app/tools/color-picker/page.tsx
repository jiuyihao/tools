'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Copy, RotateCcw } from 'lucide-react'

/**
 * 颜色选择器工具组件
 * Color picker tool component
 */
export default function ColorPickerPage() {
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState(false)

  /**
   * 处理颜色变化
   * Handle color change
   */
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    setCopied(false)
  }

  /**
   * 复制颜色值
   * Copy color value
   */
  const copyColor = (format: 'hex' | 'rgb' | 'hsl') => {
    let colorValue = ''
    
    switch (format) {
      case 'hex':
        colorValue = color
        break
      case 'rgb':
        colorValue = hexToRgb(color)
        break
      case 'hsl':
        colorValue = hexToHsl(color)
        break
    }
    
    navigator.clipboard.writeText(colorValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /**
   * 生成随机颜色
   * Generate random color
   */
  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16)
    setColor(randomColor)
    setCopied(false)
  }

  /**
   * 十六进制转RGB
   * Convert hex to RGB
   */
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      const r = parseInt(result[1], 16)
      const g = parseInt(result[2], 16)
      const b = parseInt(result[3], 16)
      return `rgb(${r}, ${g}, ${b})`
    }
    return ''
  }

  /**
   * 十六进制转HSL
   * Convert hex to HSL
   */
  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      const r = parseInt(result[1], 16) / 255
      const g = parseInt(result[2], 16) / 255
      const b = parseInt(result[3], 16) / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0
      let s = 0
      const l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }

      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    }
    return ''
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">颜色选择器</h1>
        <p className="text-muted-foreground">选择颜色并获取不同格式的颜色值</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 颜色选择器 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              颜色选择
              <Button variant="outline" size="sm" onClick={generateRandomColor}>
                <RotateCcw className="h-4 w-4 mr-2" />
                随机
              </Button>
            </CardTitle>
            <CardDescription>使用颜色选择器或输入颜色值</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-16 h-16 rounded-lg border cursor-pointer"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
            
            {/* 颜色预览 */}
            <div className="space-y-2">
              <div className="text-sm font-medium">颜色预览</div>
              <div 
                className="w-full h-32 rounded-lg border"
                style={{ backgroundColor: color }}
              />
            </div>
          </CardContent>
        </Card>

        {/* 颜色值 */}
        <Card>
          <CardHeader>
            <CardTitle>颜色值</CardTitle>
            <CardDescription>不同格式的颜色值，点击复制</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">HEX</div>
                  <div className="text-sm text-muted-foreground">{color}</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyColor('hex')}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? '已复制' : '复制'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">RGB</div>
                  <div className="text-sm text-muted-foreground">{hexToRgb(color)}</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyColor('rgb')}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? '已复制' : '复制'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">HSL</div>
                  <div className="text-sm text-muted-foreground">{hexToHsl(color)}</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyColor('hsl')}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? '已复制' : '复制'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 