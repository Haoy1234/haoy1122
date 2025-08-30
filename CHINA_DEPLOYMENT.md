# 🇨🇳 中国用户友好部署方案

## 🎯 推荐平台（国内访问友好）

### 1. GitHub Pages + 自定义域名 ⭐⭐⭐⭐⭐
**优势**：免费、稳定、国内访问良好
```bash
# 部署到 GitHub Pages
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### 2. Netlify ⭐⭐⭐⭐
**优势**：国内访问比Vercel好，功能强大
- 访问：https://netlify.com
- 拖拽 `dist` 文件夹直接部署
- 或连接GitHub自动部署

### 3. 腾讯云静态网站托管 ⭐⭐⭐⭐⭐
**优势**：国内服务商，访问速度快
- 访问：https://console.cloud.tencent.com/tcb
- 开通静态网站托管
- 上传 `dist` 文件夹

### 4. 阿里云OSS + CDN ⭐⭐⭐⭐⭐
**优势**：国内顶级CDN，访问极快
- 访问：https://oss.console.aliyun.com
- 创建存储桶，开启静态网站
- 配置CDN加速

---

## 🚀 快速解决方案：GitHub Pages

### 步骤1：启用GitHub Pages
1. 访问你的GitHub仓库：`https://github.com/Haoy1234/-`
2. 点击 "Settings" 标签
3. 滚动到 "Pages" 部分
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "gh-pages"
6. 点击 "Save"

### 步骤2：部署脚本
```bash
# 构建项目
npm run build

# 部署到 gh-pages 分支
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### 步骤3：访问网站
- 网站地址：`https://haoy1234.github.io/-/`
- 国内用户可以正常访问

---

## 🛠️ 自动化部署脚本

创建一键部署到GitHub Pages的脚本：

```bash
# deploy-github-pages.bat
@echo off
echo 正在构建项目...
npm run build

echo 正在部署到GitHub Pages...
git add dist -f
git commit -m "Deploy to GitHub Pages - %date% %time%"
git subtree push --prefix dist origin gh-pages

echo ✅ 部署完成！
echo 网站地址：https://haoy1234.github.io/-/
pause
```

---

## 🌐 域名优化方案

### 免费域名服务
1. **Freenom**：提供免费.tk/.ml/.ga域名
2. **GitHub学生包**：免费.me域名一年
3. **Cloudflare**：免费DNS + CDN服务

### 自定义域名配置
1. 在仓库根目录创建 `CNAME` 文件
2. 写入你的域名：`your-domain.com`
3. 在域名服务商添加CNAME记录指向GitHub Pages

---

## 📊 平台对比

| 平台 | 国内访问 | 部署难度 | 费用 | 推荐度 |
|------|----------|----------|------|--------|
| GitHub Pages | ⭐⭐⭐⭐ | ⭐⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐ |
| 腾讯云 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 低费用 | ⭐⭐⭐⭐⭐ |
| 阿里云 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 低费用 | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐⭐ | ⭐⭐⭐⭐⭐ | 免费 | ⭐⭐ |

---

## 🎯 立即行动方案

**最快解决方案**：
1. 运行 `deploy-github-pages.bat`
2. 等待5-10分钟生效
3. 访问：`https://haoy1234.github.io/-/`
4. 测试中国用户访问

**长期优化方案**：
1. 注册自定义域名
2. 配置Cloudflare CDN
3. 启用HTTPS和缓存优化
