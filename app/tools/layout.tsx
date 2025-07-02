'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

/**
 * 工具页面布局组件
 * Tools layout component
 */
export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)

  /**
   * 切换主题
   * Toggle theme
   */
  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* 头部 */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">工具详情</h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  )
} 