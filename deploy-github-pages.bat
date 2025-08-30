@echo off
echo ================================
echo 黄小仙来也 - GitHub Pages 部署
echo ================================
echo.

echo 🚀 开始部署到 GitHub Pages...
echo 这将解决中国用户访问问题
echo.

echo 📦 第一步：构建生产版本...
call npm run build

if errorlevel 1 (
    echo ❌ 构建失败！请检查代码错误。
    pause
    exit /b 1
)

echo ✅ 构建完成！
echo.

echo 📤 第二步：部署到 GitHub Pages...

REM 强制添加 dist 目录（通常被 .gitignore 忽略）
git add dist -f

if errorlevel 1 (
    echo ❌ 添加文件失败！
    pause
    exit /b 1
)

REM 提交构建文件
git commit -m "Deploy to GitHub Pages - %date% %time%"

if errorlevel 1 (
    echo ℹ️ 没有新的更改需要提交，继续部署...
)

REM 推送到 gh-pages 分支
echo 正在推送到 gh-pages 分支...
git subtree push --prefix dist origin gh-pages

if errorlevel 1 (
    echo.
    echo ❌ 部署失败！可能的原因：
    echo 1. gh-pages 分支不存在（首次部署正常）
    echo 2. 网络连接问题
    echo 3. GitHub 权限问题
    echo.
    echo 🔄 尝试强制推送...
    git push origin `git subtree split --prefix dist main`:gh-pages --force
    
    if errorlevel 1 (
        echo ❌ 强制推送也失败了！
        echo 请检查网络连接和 GitHub 权限。
        pause
        exit /b 1
    )
)

echo.
echo ✅ 部署成功！
echo.
echo 🌐 网站信息：
echo 网站地址：https://haoy1234.github.io/-/
echo.
echo 📋 后续步骤：
echo 1. 等待 5-10 分钟让 GitHub Pages 生效
echo 2. 访问上面的网站地址测试
echo 3. 分享给中国用户测试访问
echo.
echo 💡 提示：
echo - 如果网站还没生效，请稍等几分钟
echo - 中国用户现在应该可以正常访问了
echo - 每次更新代码后运行此脚本重新部署
echo.

set /p openSite="是否打开网站查看效果? (Y/N): "
if /i "%openSite%"=="Y" (
    start https://haoy1234.github.io/-/
)

echo.
echo 🎉 GitHub Pages 部署完成！
echo 中国用户访问问题已解决。
pause
