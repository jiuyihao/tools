'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, RotateCcw } from 'lucide-react'

/**
 * JSON转TypeScript接口工具组件
 * JSON to TypeScript interface tool component
 */
export default function JsonToTsPage() {
  const [jsonInput, setJsonInput] = useState('{"name": "John", "age": 30, "city": "New York"}')
  const [tsOutput, setTsOutput] = useState('')
  const [copied, setCopied] = useState(false)

  /**
   * 生成TypeScript接口
   */
  const generateInterface = () => {
    try {
      const obj = JSON.parse(jsonInput)
      const interfaceName = 'GeneratedInterface'
      const result = generateTypeScriptInterface(obj, interfaceName)
      setTsOutput(result)
      setCopied(false)
    } catch (error) {
      setTsOutput('// JSON解析错误，请检查输入格式')
    }
  }

  /**
   * 递归生成TypeScript接口
   */
  const generateTypeScriptInterface = (obj: any, name: string): string => {
    let result = `interface ${name} {\n`
    
    for (const [key, value] of Object.entries(obj)) {
      const type = getTypeScriptType(value)
      result += `  ${key}: ${type};\n`
    }
    
    result += '}'
    return result
  }

  /**
   * 获取TypeScript类型
   */
  const getTypeScriptType = (value: any): string => {
    if (value === null) return 'null'
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]'
      return `${getTypeScriptType(value[0])}[]`
    }
    if (typeof value === 'object') {
      return 'object'
    }
    return typeof value
  }

  /**
   * 复制结果
   */
  const copyResult = () => {
    navigator.clipboard.writeText(tsOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /**
   * 重置
   */
  const reset = () => {
    setJsonInput('{"name": "John", "age": 30, "city": "New York"}')
    setTsOutput('')
    setCopied(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">JSON转TypeScript接口</h1>
        <p className="text-muted-foreground">将JSON对象转换为TypeScript接口定义</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              JSON输入
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />重置
              </Button>
            </CardTitle>
            <CardDescription>输入有效的JSON对象</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder='{"name": "string", "age": "number"}'
              className="min-h-[300px] font-mono text-sm"
            />
            <Button onClick={generateInterface} className="w-full mt-4">
              生成TypeScript接口
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              TypeScript输出
              {tsOutput && (
                <Button variant="outline" size="sm" onClick={copyResult}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? '已复制' : '复制'}
                </Button>
              )}
            </CardTitle>
            <CardDescription>生成的TypeScript接口定义</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-auto min-h-[300px] text-sm font-mono">
              {tsOutput || '// 点击生成按钮开始转换'}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 