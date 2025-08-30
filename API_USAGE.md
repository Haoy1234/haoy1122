# 黄小仙八字分析 - 真实API功能说明

## 🚀 功能特性

现在应用已经集成了真实的Coze API功能，具备以下特性：

### ✅ 完整的API集成
- **真实API调用** - 使用Coze API进行八字分析
- **智能错误处理** - API失败时自动使用模拟数据
- **流式数据处理** - 支持Coze API的流式响应
- **详细日志记录** - 完整的调试信息输出

### 🔧 API配置
```javascript
// src/services/cozeAPI.js
const apiClient = new CozeAPI({
  token: 'pat_BrE5AY14IfYC50MLLpEYs4loaVjgOOLT9T4AAWfqUo8tOMSNVNBQkDBEGEx6oyUI',
  baseURL: 'https://api.coze.cn',
  allowPersonalAccessTokenInBrowser: true  // 允许在浏览器中使用PAT
})
```

### 📊 数据流程

1. **用户输入** → 合并为字符串：`我叫{姓名}性别{性别}出生于{出生地点}出生时间为{出生时间}`
2. **API调用** → 发送到Coze工作流：`workflow_id: '7536218586999111706'`
3. **数据解析** → 智能解析返回的JSON或文本数据
4. **结果展示** → 按照Figma设计展示11个分析模块

### 🎯 支持的分析模块

- `paipan` - 八字排盘（表格格式）
- `bazigaikuo` - 八字概括
- `jianyaozongjie` - 简要总结
- `gurenfenxi` - 古人分析
- `shiyefenxi` - 事业分析
- `aiqingfenxi` - 爱情分析
- `jinriyunshi` - 今日运势
- `jiankangfenxi` - 健康分析
- `shenshafenxi` - 神煞分析
- `shishenfenxi` - 十神分析

### 🛡️ 错误处理机制

1. **网络错误** → 自动使用模拟数据
2. **API限制** → 降级到模拟数据
3. **数据解析失败** → 使用默认数据结构
4. **用户友好提示** → 显示错误页面和重试选项

### 🔍 调试信息

打开浏览器开发者工具的Console选项卡，可以看到详细的API调用日志：

```
🚀 开始调用Coze API
📝 输入数据: 我叫张三性别男出生于北京市出生时间为1990年1月1日12点0分
📡 API响应: [StreamResponse]
📦 收到数据块: {event: 'workflow.finished', data: {...}}
✅ API调用成功: {paipan: '...', bazigaikuo: '...', ...}
```

### 📱 使用方法

1. **填写信息** - 在输入页面填写完整的个人信息
2. **开始分析** - 点击"开始分析"按钮
3. **等待结果** - 观看太极图动画，等待API响应
4. **查看结果** - 浏览完整的八字分析报告
5. **保存图片** - 点击"保存图片"按钮保存结果

### 🔧 开发者选项

如果需要修改API配置：

1. **更换Token** - 在 `src/services/cozeAPI.js` 中修改token
2. **更换工作流** - 修改 `workflow_id` 参数
3. **调整数据解析** - 修改 `parseAPIResponse` 函数
4. **自定义模拟数据** - 修改 `getDefaultResponseData` 函数

### ⚠️ 注意事项

- API Token已配置为允许在浏览器中使用
- 生产环境建议使用OAuth2.0认证
- API调用失败时会自动降级到模拟数据
- 所有用户输入都会被记录在控制台中（仅开发环境）

现在您可以测试完整的八字分析功能了！
