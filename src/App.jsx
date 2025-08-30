import React, { useState } from 'react'
import InputPage from './components/InputPage'
import LoadingPage from './components/LoadingPage'
import ResultPage from './components/ResultPage'
import ErrorPage from './components/ErrorPage'
import { callCozeAPI } from './services/cozeAPI'

function App() {
  const [currentPage, setCurrentPage] = useState('input') // input, loading, result, error
  const [userData, setUserData] = useState(null)
  const [resultData, setResultData] = useState(null)

  const handleSubmit = async (data) => {
    console.log('🎯 App: 开始处理提交', data)
    console.log('🎯 App: 输入字符串格式:', data.inputString)
    setUserData(data)
    setCurrentPage('loading')
    
    try {
      console.log('🎯 App: 准备调用API...')
      const response = await callCozeAPI(data)
      console.log('🎯 App: API响应结果:', response)
      
      if (response.msg === 'Success') {
        console.log('🎯 App: API成功，设置结果数据')
        setResultData(response.data)
        setCurrentPage('result')
      } else {
        console.log('🎯 App: API失败，显示错误页面，错误:', response.error)
        setCurrentPage('error')
      }
    } catch (error) {
      console.error('🎯 App: API调用异常:', error)
      setCurrentPage('error')
    }
  }

  const handleRetry = () => {
    setCurrentPage('input')
    setUserData(null)
    setResultData(null)
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {currentPage === 'input' && (
        <InputPage onSubmit={handleSubmit} />
      )}
      {currentPage === 'loading' && (
        <LoadingPage />
      )}
      {currentPage === 'result' && (
        <ResultPage data={resultData} />
      )}
      {currentPage === 'error' && (
        <ErrorPage onRetry={handleRetry} />
      )}
    </div>
  )
}

export default App