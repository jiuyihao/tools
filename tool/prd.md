### System（系统指令）
你是一名 **10 年以上经验** 的全栈工程师兼产品设计师，精通 **TypeScript、React/Next.js、TailwindCSS、shadcn/ui、Vite** 及现代组件架构。  
作为 **Cursor IDE 内的自动化编码代理** 工作：
​
- 可直接访问文件系统，创建 / 编辑 / 删除文件，并执行 **“Install dependencies”** 等操作。  
- 必须在 **一次对话** 内完成全部任务，除非我明确要求暂停。  
- 除非被请求说明，否则始终输出 **有效代码块** 或 **文件树差异**；不要给出纯文字解释。  
- 交付的代码需结构清晰、可运行，并附 **英文 + 简明中文** 注释。
​
---
​
### User（用户指令）
目标：为个人开发者「皮智慧」打造一个 **纯前端网站**，包含 **全部小工具**（所有逻辑仅在浏览器端运行，不接入 AI 或后端存储）。
​
#### 技术栈
- **Next.js 14 + TypeScript**  
- **TailwindCSS + shadcn/ui**（支持浅/深色切换）  
- **Vite** Bundler（Next 14 默认）  
- 无任何服务器端或数据库依赖
​
#### UI / UX 要求
- 首页以卡片网格方式列出所有工具，支持响应式与浅/深色切换  
- 每个工具页面需可独立运行，无整页刷新  
- 移动端友好，所有交互均流畅
​
#### 实现要求
- **100 个工具全部实现最小可用功能**，不得留 TODO 占位  
- 组件均使用 **函数式写法**，并附 **JSDoc + 简明中文** 注释  
- 提供统一的 ESLint / Prettier 配置  
- 生成 `README.md`，包含快速启动与贡献指南（中 / EN）
​
#### 交付顺序
1. 输出 **项目文件树差异**（file-tree diff），创建完整目录与 100 个组件文件  
2. 按需分块输出 **全部代码**：核心配置文件、框架文件及 100 个工具组件实现  
3. 自动添加脚本：`npm run dev`、`npm run build`、`npm run lint`  
4. 如输出过长被截断，请在同一会话输入 **`#continue`** 续写，直至全部完成  
5. 生成完毕即视为任务完成；除非我发出新指令，请勿额外解释或提问
​
#### UI/UX 要求
- 首页以卡片网格方式列出所有工具，支持响应式与浅/深色切换
- 每个工具页面需可独立运行，无整页刷新
- 移动端友好，所有交互均流畅
---
​
#### 📦  Tools List（slug | 英文名 | 一句话功能）
​
**文本处理**  
1. `word-count` | Word Count | 实时统计文本字数  
2. `markdown-preview` | Markdown Preview | MD→HTML 预览  
3.  `diff-viewer` | Text Diff | 文本差异对比  
​
**颜色 / 设计**  
1.  `color-picker` | Color Picker | 取色并复制十六进制  
2.  `tailwind-cheatsheet` | Tailwind Lookup | 类名速查  
​
​
**日期 / 时间**  
1.  `countdown-timer` | Countdown | 倒计时  

​
**数学 / 单位**  
1.  `random-number` | RNG | 随机数生成  
​
**编码 / 加密**  
1.  `qr-generator` | QR Maker | 二维码生成  
​
**Web / DevTools**  
1.  `json-to-ts` | JSON→TS Interface  
​
**随机 / 生成器**  
1.  `quote-generator` | Quote Gen | 随机名言  
2.  `lottery-picker` | Lottery Pick | 抽奖器  
​
**文件 / 文档**  
1.  `text-to-pdf` | Text→PDF  
---
​
> **执行规则**  
> - 按“交付顺序”完成；如输出过长，使用 `#continue` 续写。  
> - 未收到新指令前，请勿额外解释或提问。
