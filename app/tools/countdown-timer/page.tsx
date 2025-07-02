'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

/**
 * 倒计时工具组件
 * Countdown timer tool component
 */
export default function CountdownTimerPage() {
  const [seconds, setSeconds] = useState(60)
  const [left, setLeft] = useState(60)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * 开始倒计时
   */
  const start = () => {
    if (running || left <= 0) return
    setRunning(true)
    timerRef.current = setInterval(() => {
      setLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  /**
   * 重置倒计时
   */
  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setLeft(seconds)
    setRunning(false)
  }

  /**
   * 设置秒数
   */
  const handleSet = (v: number) => {
    setSeconds(v)
    setLeft(v)
    setRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">倒计时工具</h1>
        <p className="text-muted-foreground">输入秒数，开始倒计时</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            设置倒计时
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" />重置
            </Button>
          </CardTitle>
          <CardDescription>输入秒数后点击开始</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            value={seconds}
            onChange={e => handleSet(Number(e.target.value))}
            min={1}
            max={3600}
            className="mb-2"
          />
          <Button onClick={start} disabled={running || left <= 0} className="w-full">
            {running ? '倒计时中...' : '开始倒计时'}
          </Button>
          <div className="text-center text-4xl font-mono mt-4">
            {left}s
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 