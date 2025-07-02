'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

/**
 * 抽奖器工具组件
 * Lottery picker tool component
 */
export default function LotteryPickerPage() {
  const [items, setItems] = useState('张三\n李四\n王五\n赵六\n钱七\n孙八')
  const [result, setResult] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)

  /**
   * 开始抽奖
   */
  const startLottery = () => {
    const itemList = items.split('\n').filter(item => item.trim())
    if (itemList.length === 0) {
      setResult('请先输入参与者名单')
      return
    }

    setIsSpinning(true)
    
    // 模拟抽奖动画
    let count = 0
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * itemList.length)
      setResult(itemList[randomIndex])
      count++
      
      if (count > 10) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 100)
  }

  /**
   * 重置
   */
  const reset = () => {
    setItems('张三\n李四\n王五\n赵六\n钱七\n孙八')
    setResult('')
    setIsSpinning(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">抽奖器</h1>
        <p className="text-muted-foreground">输入参与者名单，随机抽取幸运者</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              参与者名单
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                重置
              </Button>
            </CardTitle>
            <CardDescription>每行输入一个参与者姓名</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={items}
              onChange={e => setItems(e.target.value)}
              placeholder="输入参与者名单，每行一个..."
              className="min-h-[200px]"
            />
            <Button 
              onClick={startLottery} 
              disabled={isSpinning}
              className="w-full mt-4"
            >
              {isSpinning ? '抽奖中...' : '开始抽奖'}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>抽奖结果</CardTitle>
            <CardDescription>恭喜中奖者！</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-primary mb-4">
                  🎉 {result} 🎉
                </div>
                <div className="text-muted-foreground">
                  恭喜这位幸运儿！
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                点击"开始抽奖"按钮开始
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 