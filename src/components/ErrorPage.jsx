import React from 'react'

const ErrorPage = ({ onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-bg p-4">
      {/* 失败动画图标 */}
      <div className="mb-8">
        <div className="relative w-24 h-24">
          {/* 外圆 */}
          <div className="w-24 h-24 border-4 border-red-500 rounded-full flex items-center justify-center animate-pulse">
            {/* X 图标 */}
            <div className="relative w-12 h-12">
              <div className="absolute top-1/2 left-1/2 w-8 h-1 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 w-8 h-1 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
            </div>
          </div>
          
          {/* 装饰性圆点 */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* 错误信息 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">分析失败</h2>
        <p className="text-text-secondary text-lg mb-2">很抱歉，分析过程中出现了问题</p>
        <p className="text-text-secondary text-sm">请检查网络连接后重试</p>
      </div>

      {/* 失败详情卡片 */}
      <div className="bg-card-bg rounded-lg p-6 shadow-lg mb-8 max-w-md w-full">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <h3 className="text-text-primary font-bold">可能的原因</h3>
        </div>
        <ul className="text-text-secondary text-sm space-y-2">
          <li>• 网络连接不稳定</li>
          <li>• 服务器暂时繁忙</li>
          <li>• 输入信息格式有误</li>
        </ul>
      </div>

      {/* 返回按钮 */}
      <button
        onClick={onRetry}
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        重新开始
      </button>

      {/* 装饰性元素 */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-6 h-6 bg-yellow-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-yellow-300 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

export default ErrorPage
