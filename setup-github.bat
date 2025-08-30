@echo off
echo ================================
echo 黄小仙来也 - GitHub 设置助手
echo ================================
echo.

echo 请按照以下步骤操作：
echo.
echo 1. 首先访问 GitHub 创建仓库：
echo    https://github.com/new
echo.
echo 2. 仓库设置：
echo    - 仓库名：huangxiaoxian-fortune
echo    - 类型：Public (公开)
echo    - 不要勾选 "Add a README file"
echo.

set /p username="请输入你的 GitHub 用户名: "
if "%username%"=="" (
    echo 用户名不能为空！
    pause
    exit /b 1
)

echo.
echo 正在设置 GitHub 仓库连接...

git remote remove origin 2>nul
git remote add origin https://github.com/Haoy1234/-.git

echo.
echo 正在推送代码到 GitHub...

git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！可能的原因：
    echo 1. GitHub 仓库不存在
    echo 2. 用户名错误
    echo 3. 需要先在 GitHub 上创建仓库
    echo.
    echo 请检查后重试。
    pause
    exit /b 1
)

echo.
echo ✅ 代码推送成功！
echo.
echo 📋 下一步：部署到 Vercel
echo 1. 访问：https://vercel.com
echo 2. 用 GitHub 账号登录
echo 3. 点击 "New Project"
echo 4. 选择 huangxiaoxian-fortune 仓库
echo 5. 配置设置：
echo    - Framework: Vite
echo    - Build Command: npm run build
echo    - Output Directory: dist
echo 6. 点击 Deploy
echo.

set /p openVercel="是否打开 Vercel 网站? (Y/N): "
if /i "%openVercel%"=="Y" (
    start https://vercel.com/new
)

echo.
echo 🎉 GitHub 设置完成！
echo 现在可以在 Vercel 上导入项目了。
pause
