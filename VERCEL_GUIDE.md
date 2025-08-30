# 🚀 Vercel 部署完整指南

## 📋 前置准备

### 1. 创建GitHub仓库
1. 访问 [GitHub.com](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`huangxiaoxian-fortune` (或其他名称)
4. 设置为 Public (公开)
5. 点击 "Create repository"

### 2. 推送代码到GitHub

在项目目录下执行以下命令：

```bash
# 添加GitHub仓库地址 (替换为你的用户名)
git remote add origin https://github.com/你的用户名/huangxiaoxian-fortune.git

# 推送代码
git branch -M main
git push -u origin main
```

## 🌐 Vercel 部署步骤

### 第一步：访问Vercel
1. 打开 [https://vercel.com](https://vercel.com)
2. 点击 "Start Deploying"
3. 选择 "Continue with GitHub" 登录

### 第二步：导入项目
1. 登录后点击 "New Project"
2. 在 "Import Git Repository" 部分找到你的仓库
3. 点击仓库右侧的 "Import" 按钮

### 第三步：配置项目设置
Vercel会自动检测到这是一个Vite项目，配置如下：

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (默认)
- **Build Command**: `npm run build` (自动填写)
- **Output Directory**: `dist` (自动填写)
- **Install Command**: `npm install` (自动填写)

### 第四步：环境变量 (如果需要)
如果你的API需要特殊配置，可以在 "Environment Variables" 部分添加：
- 点击 "Add More"
- 添加必要的环境变量

### 第五步：部署
1. 确认所有设置正确
2. 点击 "Deploy" 按钮
3. 等待部署完成 (通常1-3分钟)

## ✅ 部署成功后

### 获取网站链接
部署成功后，你会得到一个类似这样的链接：
```
https://huangxiaoxian-fortune-abc123.vercel.app
```

### 自定义域名 (可选)
1. 在项目设置中点击 "Domains"
2. 添加自定义域名
3. 按照提示配置DNS

## 🔄 自动部署

配置完成后，每次你推送代码到GitHub，Vercel会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "更新内容"
git push origin main
# Vercel会自动检测并重新部署
```

## 📱 生成二维码

部署完成后：
1. 复制Vercel提供的网站链接
2. 打开项目中的 `qr-generator.html` 文件
3. 输入链接生成二维码
4. 下载并分享二维码

## 🛠️ 常见问题

### 问题1：构建失败
**解决方案**：
- 检查 `package.json` 中的依赖
- 确保本地 `npm run build` 能成功执行

### 问题2：图片资源404
**解决方案**：
- 确保图片路径使用相对路径 `/images/xxx.png`
- 检查 `public/images` 文件夹是否完整

### 问题3：API调用失败
**解决方案**：
- 检查API接口是否支持CORS
- 确认API密钥等环境变量配置正确

## 🎉 完成！

部署成功后，你的黄小仙八字分析网站就可以通过互联网访问了！

**下一步**：
1. 测试网站功能
2. 生成分享二维码
3. 分享给用户使用

---

💡 **提示**：如果遇到问题，可以查看Vercel的部署日志来诊断问题。
