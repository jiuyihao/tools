'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw, Copy } from 'lucide-react'

/**
 * 随机数生成器工具组件
 * Random number generator tool component
 */
export default function RandomNumberPage() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [result, setResult] = useState<number[]>([])
  const [copied, setCopied] = useState(false)

  /**
   * 生成随机数
   * Generate random numbers
   */
  const generateRandomNumbers = () => {
    const numbers: number[] = []
    for (let i = 0; i < count; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      numbers.push(randomNum)
    }
    setResult(numbers)
    setCopied(false)
  }

  /**
   * 复制结果
   * Copy result
   */
  const copyResult = () => {
    const resultText = result.join(', ')
    navigator.clipboard.writeText(resultText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /**
   * 重置设置
   * Reset settings
   */
  const resetSettings = () => {
    setMin(1)
    setMax(100)
    setCount(1)
    setResult([])
    setCopied(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">随机数生成器</h1>
        <p className="text-muted-foreground">生成指定范围内的随机数</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 设置面板 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              生成设置
              <Button variant="outline" size="sm" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4 mr-2" />
                重置
              </Button>
            </CardTitle>
            <CardDescription>设置随机数的范围和数量</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">最小值</label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">最大值</label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(Number(e.target.value))}
                  placeholder="100"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">生成数量</label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                placeholder="1"
                min="1"
                max="100"
              />
            </div>

            <Button 
              onClick={generateRandomNumbers} 
              className="w-full"
              disabled={min >= max || count < 1 || count > 100}
            >
              生成随机数
            </Button>
          </CardContent>
        </Card>

        {/* 结果面板 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              生成结果
              {result.length > 0 && (
                <Button variant="outline" size="sm" onClick={copyResult}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? '已复制' : '复制'}
                </Button>
              )}
            </CardTitle>
            <CardDescription>生成的随机数列表</CardDescription>
          </CardHeader>
          <CardContent>
            {result.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {result.map((num, index) => (
                    <div
                      key={index}
                      className="bg-muted p-3 rounded-lg text-center font-mono text-lg"
                    >
                      {num}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">统计信息</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">最小值：</span>
                      <span className="font-mono">{Math.min(...result)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">最大值：</span>
                      <span className="font-mono">{Math.max(...result)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">平均值：</span>
                      <span className="font-mono">
                        {(result.reduce((a, b) => a + b, 0) / result.length).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">总和：</span>
                      <span className="font-mono">{result.reduce((a, b) => a + b, 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                点击"生成随机数"按钮开始生成
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 