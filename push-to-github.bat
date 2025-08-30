@echo off
echo ================================
echo 推送项目到GitHub
echo ================================
echo.

echo 请按照以下步骤操作：
echo.
echo 1. 首先在GitHub上创建新仓库
echo    - 访问: https://github.com
echo    - 点击右上角 "+" → "New repository"
echo    - 仓库名称: huangxiaoxian-fortune
echo    - 设置为 Public (公开)
echo    - 点击 "Create repository"
echo.

set /p username="请输入你的GitHub用户名: "
if "%username%"=="" (
    echo 用户名不能为空！
    pause
    exit /b 1
)

set /p reponame="请输入仓库名称 (默认: huangxiaoxian-fortune): "
if "%reponame%"=="" set reponame=huangxiaoxian-fortune

echo.
echo 正在配置Git仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo 正在推送代码到GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！可能的原因：
    echo 1. GitHub仓库不存在或名称错误
    echo 2. 没有权限访问仓库
    echo 3. 网络连接问题
    echo.
    echo 请检查：
    echo - GitHub仓库是否已创建
    echo - 用户名和仓库名是否正确
    echo - 是否已登录GitHub (可能需要设置Personal Access Token)
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 代码推送成功！
echo.
echo 📋 下一步 - 在Vercel部署：
echo 1. 访问: https://vercel.com
echo 2. 用GitHub账号登录
echo 3. 点击 "New Project"
echo 4. 找到你的仓库: %username%/%reponame%
echo 5. 点击 "Import"
echo 6. 确认设置后点击 "Deploy"
echo.
echo 🎉 部署完成后，你会得到一个网站链接！
echo.

set /p openVercel="是否打开Vercel网站? (Y/N): "
if /i "%openVercel%"=="Y" (
    start https://vercel.com
)

pause
