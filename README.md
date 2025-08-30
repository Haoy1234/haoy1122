# 黄小仙来也 - 八字分析前端应用

这是一个基于React开发的八字分析前端应用，集成了Coze API进行智能八字分析。

## 功能特性

- 📱 **移动端优先设计** - 完美适配手机和桌面设备
- 🎨 **Figma设计还原** - 严格按照设计稿实现UI界面
- 🔮 **智能八字分析** - 集成Coze API提供专业分析
- 💾 **图片保存功能** - 支持将分析结果保存为图片
- ⚡ **流畅用户体验** - 包含加载动画和错误处理

## 页面结构

### 1. 输入页面
- 姓名输入框
- 性别选择（男/女）
- 出生时间输入
- 出生地点输入
- 数据验证和提交

### 2. 等待页面
- 太极图旋转动画
- 加载提示文字
- 点状加载动画

### 3. 成功页面
- 完整的八字分析结果展示
- 包含11个分析模块：
  - 八字概括
  - 简要总结
  - 八字排盘（表格形式）
  - 今日运势
  - 相似古人
  - 事业分析
  - 健康分析
  - 感情分析
  - 神煞分析
  - 十神分析
- 保存图片功能

### 4. 失败页面
- 错误提示动画
- 失败原因说明
- 重新开始按钮

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **API集成**: Coze API (@coze/api)
- **图片生成**: html2canvas
- **字体**: Alexandria, Noto Sans JP, Noto Sans SC

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 预览生产版本
```bash
npm run preview
```

## API配置

项目使用Coze API进行八字分析，API配置位于 `src/services/cozeAPI.js`：

```javascript
const apiClient = new CozeAPI({
  token: 'your_api_token_here',
  baseURL: 'https://api.coze.cn'
})
```

### API数据格式

输入数据会被合并为字符串格式：
```
我叫{姓名}性别{性别}出生于{出生地点}出生时间为{出生时间}
```

返回数据包含以下字段：
- `paipan`: 八字排盘（Markdown表格格式）
- `bazigaikuo`: 八字概括
- `jianyaozongjie`: 简要总结
- `gurenfenxi`: 古人分析
- `shiyefenxi`: 事业分析
- `aiqingfenxi`: 爱情分析
- `jinriyunshi`: 今日运势
- `jiankangfenxi`: 健康分析
- `shenshafenxi`: 神煞分析
- `shishenfenxi`: 十神分析

## 移动端适配

- 响应式设计，支持各种屏幕尺寸
- 触摸友好的交互设计
- 移动端图片保存优化
- 滚动优化和性能优化

## 项目结构

```
src/
├── components/          # React组件
│   ├── InputPage.jsx   # 输入页面
│   ├── LoadingPage.jsx # 等待页面
│   ├── ResultPage.jsx  # 结果页面
│   └── ErrorPage.jsx   # 错误页面
├── services/           # API服务
│   └── cozeAPI.js     # Coze API集成
├── App.jsx            # 主应用组件
├── main.jsx          # 应用入口
└── index.css         # 全局样式
```

## 开发注意事项

1. **严格按照Figma设计** - 所有UI元素都严格按照设计稿实现
2. **API错误处理** - 完善的错误处理和用户提示
3. **性能优化** - 图片生成和移动端性能优化
4. **数据验证** - 输入数据的完整性验证
5. **跨平台兼容** - 确保在不同设备和浏览器上正常运行

## 部署说明

项目构建后生成的静态文件可以部署到任何静态文件服务器：

1. 运行 `npm run build` 生成构建文件
2. 将 `dist` 目录部署到服务器
3. 确保服务器支持SPA路由（如需要）

## 许可证

本项目仅供学习和研究使用。
