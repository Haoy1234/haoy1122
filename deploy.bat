@echo off
echo ================================
echo 黄小仙来也 - 快速部署脚本
echo ================================
echo.

echo 1. 构建项目...
call npm run build
if errorlevel 1 (
    echo 构建失败！请检查错误信息。
    pause
    exit /b 1
)

echo.
echo ✅ 构建完成！
echo.
echo 📁 构建文件位于: dist\ 文件夹
echo.
echo 🚀 部署选项:
echo.
echo 【方案一 - Netlify (推荐)】
echo 1. 访问: https://netlify.com
echo 2. 拖拽 dist 文件夹到部署区域
echo 3. 等待部署完成
echo.
echo 【方案二 - Vercel】
echo 1. 访问: https://vercel.com
echo 2. 导入GitHub仓库
echo 3. 自动部署
echo.
echo 📱 部署完成后:
echo 1. 复制网站链接
echo 2. 访问 https://cli.im 生成二维码
echo 3. 分享二维码给用户
echo.
echo 🎉 部署完成后，用户可通过二维码访问你的八字分析网站！
echo.

echo 是否打开 dist 文件夹? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    start explorer dist
)

echo.
echo 是否打开 Netlify 部署页面? (Y/N)
set /p choice2=
if /i "%choice2%"=="Y" (
    start https://netlify.com
)

pause
