import React, { useState } from 'react'

const InputPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthTime: '',
    birthPlace: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // 验证表单数据
    if (!formData.name || !formData.gender || !formData.birthTime || !formData.birthPlace) {
      alert('请填写完整信息')
      return
    }

    // 合并输入内容，不添加标点符号
    const inputString = `我叫${formData.name}性别${formData.gender}出生于${formData.birthPlace}出生时间为${formData.birthTime}`
    
    onSubmit({
      ...formData,
      inputString
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-primary-bg">
      {/* 标题区域 */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-6 h-6 bg-yellow-600 rounded mr-2"></div>
          <h1 className="text-2xl font-bold text-text-primary">黄小仙来也</h1>
        </div>
        <p className="text-text-secondary text-sm">请填写您的基本信息，开始八字分析</p>
      </div>

      {/* 输入表单 */}
      <div className="w-full max-w-md space-y-4">
        {/* 姓名输入 */}
        <div className="bg-card-bg rounded-lg p-4 shadow-lg">
          <label className="block text-text-primary font-medium mb-2">姓名</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="请输入您的姓名"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* 性别选择 */}
        <div className="bg-card-bg rounded-lg p-4 shadow-lg">
          <label className="block text-text-primary font-medium mb-2">性别</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="男"
                checked={formData.gender === '男'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="mr-2"
              />
              <span className="text-text-primary">男</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="女"
                checked={formData.gender === '女'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="mr-2"
              />
              <span className="text-text-primary">女</span>
            </label>
          </div>
        </div>

        {/* 出生时间 */}
        <div className="bg-card-bg rounded-lg p-4 shadow-lg">
          <label className="block text-text-primary font-medium mb-2">出生时间</label>
          <input
            type="text"
            value={formData.birthTime}
            onChange={(e) => handleInputChange('birthTime', e.target.value)}
            placeholder="例：2000年2月8日12点50分"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* 出生地点 */}
        <div className="bg-card-bg rounded-lg p-4 shadow-lg">
          <label className="block text-text-primary font-medium mb-2">出生地点</label>
          <input
            type="text"
            value={formData.birthPlace}
            onChange={(e) => handleInputChange('birthPlace', e.target.value)}
            placeholder="例：河北省邢台市"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* 确认按钮 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
        >
          开始分析
        </button>
      </div>
    </div>
  )
}

export default InputPage