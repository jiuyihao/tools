'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Copy } from 'lucide-react'

/**
 * 随机名言生成器工具组件
 * Random quote generator tool component
 */
export default function QuoteGeneratorPage() {
  const [currentQuote, setCurrentQuote] = useState('')
  const [copied, setCopied] = useState(false)

  const quotes = [
    { text: "生活不是等待暴风雨过去，而是学会在雨中跳舞。", author: "维维安·格林" },
    { text: "成功不是偶然的，它是努力、坚持、学习、牺牲和热爱你所做的事情的结果。", author: "佩莱" },
    { text: "最大的荣耀不在于从不跌倒，而在于每次跌倒后都能爬起来。", author: "孔子" },
    { text: "不要等待机会，而要创造机会。", author: "乔治·萧伯纳" },
    { text: "知识就是力量。", author: "弗朗西斯·培根" },
    { text: "时间就是金钱。", author: "本杰明·富兰克林" },
    { text: "行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。", author: "戴尔·卡耐基" },
    { text: "一个人的成功，不在于他拥有什么，而在于他给予什么。", author: "爱因斯坦" },
    { text: "如果你想要改变世界，先改变你自己。", author: "甘地" },
    { text: "失败是成功之母。", author: "中国谚语" },
    { text: "千里之行，始于足下。", author: "老子" },
    { text: "学而不思则罔，思而不学则殆。", author: "孔子" },
    { text: "己所不欲，勿施于人。", author: "孔子" },
    { text: "天行健，君子以自强不息。", author: "周易" },
    { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" }
  ]

  /**
   * 生成随机名言
   */
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    setCurrentQuote(`"${quote.text}"\n\n—— ${quote.author}`)
    setCopied(false)
  }

  /**
   * 复制名言
   */
  const copyQuote = () => {
    if (currentQuote) {
      navigator.clipboard.writeText(currentQuote)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">随机名言生成器</h1>
        <p className="text-muted-foreground">点击按钮生成励志名言</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            名言生成
            <Button variant="outline" size="sm" onClick={generateQuote}>
              <RotateCcw className="h-4 w-4 mr-2" />
              生成
            </Button>
          </CardTitle>
          <CardDescription>点击生成按钮获取随机名言</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuote ? (
            <>
              <div className="bg-muted p-6 rounded-lg text-center">
                <blockquote className="text-lg italic leading-relaxed">
                  {currentQuote}
                </blockquote>
              </div>
              <div className="flex justify-center">
                <Button variant="outline" onClick={copyQuote}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? '已复制' : '复制名言'}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              点击"生成"按钮开始获取名言
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 