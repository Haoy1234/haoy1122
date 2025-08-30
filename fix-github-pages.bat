@echo off
echo ================================
echo 修复 GitHub Pages 404 错误
echo ================================
echo.

echo 🔍 第一步：检查当前状态...
git status

echo.
echo 📦 第二步：重新构建项目...
call npm run build

if errorlevel 1 (
    echo ❌ 构建失败！请检查代码错误。
    pause
    exit /b 1
)

echo ✅ 构建完成！
echo.

echo 🗑️ 第三步：清理旧的 gh-pages 分支...
git push origin --delete gh-pages 2>nul
echo 旧分支已删除（如果存在）

echo.
echo 📤 第四步：重新部署到 GitHub Pages...

REM 强制添加 dist 目录
git add dist -f
git commit -m "Fix GitHub Pages deployment - %date% %time%"

REM 创建新的 gh-pages 分支并推送
git subtree push --prefix dist origin gh-pages

if errorlevel 1 (
    echo.
    echo ❌ 部署失败！尝试强制推送...
    git push origin `git subtree split --prefix dist main`:gh-pages --force
    
    if errorlevel 1 (
        echo ❌ 强制推送也失败了！
        echo.
        echo 🔧 尝试手动方式...
        
        REM 手动创建 gh-pages 分支
        git checkout -b gh-pages-temp
        git rm -rf .
        xcopy dist\* . /E /H /Y
        git add .
        git commit -m "Deploy to GitHub Pages"
        git push origin gh-pages-temp:gh-pages --force
        git checkout main
        git branch -D gh-pages-temp
    )
)

echo.
echo ✅ 部署完成！
echo.
echo 🌐 现在需要在 GitHub 上启用 Pages：
echo 1. 访问：https://github.com/Haoy1234/-/settings/pages
echo 2. Source 选择 "Deploy from a branch"
echo 3. Branch 选择 "gh-pages" 和 "/ (root)"
echo 4. 点击 "Save"
echo.

set /p openSettings="是否打开 GitHub Pages 设置页面? (Y/N): "
if /i "%openSettings%"=="Y" (
    start https://github.com/Haoy1234/-/settings/pages
)

echo.
echo 📋 等待 5-10 分钟后访问：
echo https://haoy1234.github.io/-/
echo.

echo 🎉 修复完成！
pause
