# 🚀 黄小仙来也 - 部署指南

## 📦 项目已构建完成
构建文件位于 `dist/` 文件夹中，包含：
- `index.html` - 主页面
- `assets/` - CSS和JS文件
- `images/` - 所有图片资源

## 🌐 部署方案

### 方案一：Netlify 拖拽部署 (推荐，最简单)

1. **访问 Netlify**
   - 打开 [https://netlify.com](https://netlify.com)
   - 点击 "Deploy to Netlify"

2. **拖拽部署**
   - 将整个 `dist` 文件夹拖拽到 Netlify 的部署区域
   - 等待部署完成（约1-2分钟）

3. **获取链接**
   - 部署完成后会获得一个 `.netlify.app` 域名
   - 例如：`https://amazing-site-123456.netlify.app`

### 方案二：Vercel 部署

1. **访问 Vercel**
   - 打开 [https://vercel.com](https://vercel.com)
   - 用GitHub账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 连接你的GitHub仓库

3. **配置部署**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 方案三：GitHub Pages

1. **推送到GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **配置GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / docs

## 📱 生成二维码

部署完成后，使用以下方式生成二维码：

### 在线二维码生成器
1. [草料二维码](https://cli.im/)
2. [联图网](https://www.liantu.com/)
3. [二维码生成器](https://www.qr-code-generator.com/)

### 步骤
1. 复制部署后的网站链接
2. 粘贴到二维码生成器
3. 下载二维码图片
4. 分享给用户

## 🔧 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 所有图片资源加载正常
- [ ] API调用功能正常
- [ ] 移动端适配良好
- [ ] 二维码生成并测试

## 📞 技术支持

如果遇到部署问题：
1. 检查构建日志
2. 确认所有文件路径正确
3. 验证API接口可访问性

## 🎉 完成！

部署完成后，你将获得：
- ✅ 公网可访问的网站
- ✅ 二维码分享功能
- ✅ 移动端友好体验
- ✅ 专业的八字分析服务
