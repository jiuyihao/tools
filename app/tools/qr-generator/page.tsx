'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Download, RotateCcw } from 'lucide-react'

/**
 * 二维码生成器工具组件
 * QR code generator tool component
 */
export default function QRGeneratorPage() {
  const [text, setText] = useState('https://example.com')
  const [size, setSize] = useState(200)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  /**
   * 生成二维码
   * Generate QR code
   */
  useEffect(() => {
    if (text) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
      setQrCodeUrl(qrUrl)
    }
  }, [text, size])

  /**
   * 下载二维码
   * Download QR code
   */
  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.href = qrCodeUrl
      link.download = 'qrcode.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  /**
   * 重置设置
   * Reset settings
   */
  const resetSettings = () => {
    setText('https://example.com')
    setSize(200)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">二维码生成器</h1>
        <p className="text-muted-foreground">生成文本或链接的二维码</p>
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
            <CardDescription>输入要生成二维码的文本或链接</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">文本/链接</label>
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="输入文本或链接..."
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">二维码尺寸</label>
              <Input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                placeholder="200"
                min="100"
                max="1000"
                className="mt-1"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              <p>支持的内容类型：</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>网址链接</li>
                <li>文本信息</li>
                <li>邮箱地址</li>
                <li>电话号码</li>
                <li>WiFi配置</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 二维码预览 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              二维码预览
              {qrCodeUrl && (
                <Button variant="outline" size="sm" onClick={downloadQRCode}>
                  <Download className="h-4 w-4 mr-2" />
                  下载
                </Button>
              )}
            </CardTitle>
            <CardDescription>实时生成的二维码图像</CardDescription>
          </CardHeader>
          <CardContent>
            {qrCodeUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="border rounded-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">二维码信息</div>
                  <div className="text-xs text-muted-foreground break-all">
                    {text}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    尺寸: {size}x{size}px
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                输入文本或链接开始生成二维码
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 