# 开发者工具集 - Dev Tools Hub

一个包含12个实用开发者工具的纯前端网站，所有功能均在浏览器端运行，无需后端服务。

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 🛠️ 工具列表

### 文本处理
- **字数统计** (`/tools/word-count`) - 实时统计文本字数、字符数、行数等
- **Markdown预览** (`/tools/markdown-preview`) - 实时预览Markdown渲染效果
- **文本差异对比** (`/tools/diff-viewer`) - 对比两段文本的差异

### 颜色/设计
- **颜色选择器** (`/tools/color-picker`) - 取色并获取不同格式的颜色值
- **Tailwind速查** (`/tools/tailwind-cheatsheet`) - 常用TailwindCSS类名速查

### 日期/时间
- **倒计时** (`/tools/countdown-timer`) - 倒计时工具

### 数学/单位
- **随机数生成** (`/tools/random-number`) - 生成指定范围内的随机数

### 编码/加密
- **二维码生成** (`/tools/qr-generator`) - 生成文本或链接的二维码

### Web/DevTools
- **JSON转TS** (`/tools/json-to-ts`) - 将JSON对象转换为TypeScript接口

### 随机/生成器
- **随机名言** (`/tools/quote-generator`) - 生成励志名言
- **抽奖器** (`/tools/lottery-picker`) - 随机抽取参与者

### 文件/文档
- **文本转PDF** (`/tools/text-to-pdf`) - 将文本转换为PDF文档

## 🎨 技术栈

- **框架**: Next.js 14 + TypeScript
- **样式**: TailwindCSS + shadcn/ui
- **构建工具**: Vite (Next.js 14默认)
- **UI组件**: Radix UI + Lucide React图标

## 🌟 特性

- ✅ **纯前端**: 所有功能在浏览器端运行，无需后端
- ✅ **响应式设计**: 完美适配桌面端和移动端
- ✅ **深色模式**: 支持浅色/深色主题切换
- ✅ **现代化UI**: 使用shadcn/ui组件库
- ✅ **TypeScript**: 完整的类型支持
- ✅ **零配置**: 开箱即用，无需复杂配置

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── tools/             # 工具页面
│       ├── layout.tsx     # 工具页面布局
│       └── [tool]/        # 各个工具页面
├── components/            # 可复用组件
│   └── ui/               # shadcn/ui组件
├── lib/                  # 工具函数
└── public/              # 静态资源
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发规范

- 使用函数式组件
- 添加JSDoc注释和中文说明
- 遵循ESLint和Prettier配置
- 确保所有工具都有最小可用功能

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**开发者工具集** - 为开发者而生 🚀 