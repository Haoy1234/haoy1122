import React, { useState, useEffect } from 'react'
import { getProvinces, getCities } from '../data/cityData'

const InputPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    province: '',
    city: ''
  })

  // 生成年份选项（1900-当前年份+10）
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 1900 + 11 }, 
    (_, i) => (1900 + i).toString()
  )

  // 生成月份选项
  const monthOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  // 生成日期选项（根据年月动态计算）
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  const dayOptions = Array.from(
    { length: getDaysInMonth(formData.year, formData.month) }, 
    (_, i) => (i + 1).toString()
  )

  // 生成小时选项（0-23）
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))

  // 生成分钟选项（0-59）
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  // 省份和城市选项
  const provinceOptions = getProvinces()
  const cityOptions = formData.province ? getCities(formData.province) : []

  // 当年份或月份改变时，调整日期
  useEffect(() => {
    const maxDay = getDaysInMonth(formData.year, formData.month)
    if (formData.day > maxDay) {
      setFormData(prev => ({ ...prev, day: maxDay }))
    }
  }, [formData.year, formData.month])

  // 当省份改变时，重置城市
  useEffect(() => {
    if (formData.province) {
      const cities = getCities(formData.province)
      if (cities.length > 0 && !cities.includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: cities[0] }))
      }
    }
  }, [formData.province])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // 验证表单数据
    if (!formData.name || !formData.gender || !formData.province || !formData.city) {
      alert('请填写完整信息')
      return
    }

    // 格式化时间字符串
    const birthTime = `${formData.year}年${formData.month}月${formData.day}日${formData.hour}点${formData.minute}分`
    const birthPlace = `${formData.province}${formData.city}`

    // 合并输入内容，不添加标点符号
    const inputString = `我叫${formData.name}性别${formData.gender}出生于${birthPlace}出生时间为${birthTime}`
    
    onSubmit({
      ...formData,
      birthTime,
      birthPlace,
      inputString
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-primary-bg">
      {/* 标题区域 */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="./images/Logo图标 (node-id=142).png" 
            alt="黄小仙Logo" 
            className="w-8 h-8 mr-3"
            onError={(e) => {
              console.error('Logo图标加载失败:', e)
              e.target.style.display = 'none'
            }}
          />
          <h1 className="text-2xl font-bold text-text-primary">黄小仙来也</h1>
        </div>
        <p className="text-text-secondary text-sm">请填写您的基本信息，开始八字分析</p>
      </div>

      {/* 输入表单 */}
      <div className="w-full max-w-4xl space-y-6">
        {/* 姓名和性别 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="mt-3">
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary"
              >
                <option value="">请选择性别</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </div>
        </div>

        {/* 出生日期时间选择器 */}
        <div className="bg-card-bg rounded-lg p-4 shadow-lg">
          <h3 className="text-text-primary font-medium mb-4 text-center">出生日期时间</h3>
          <div className="grid grid-cols-5 gap-3">
            {/* 年 */}
            <div>
              <label className="block text-text-primary font-medium mb-2 text-center text-sm">年</label>
              <select
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary text-sm"
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* 月 */}
            <div>
              <label className="block text-text-primary font-medium mb-2 text-center text-sm">月</label>
              <select
                value={formData.month}
                onChange={(e) => handleInputChange('month', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary text-sm"
              >
                {monthOptions.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* 日 */}
            <div>
              <label className="block text-text-primary font-medium mb-2 text-center text-sm">日</label>
              <select
                value={formData.day}
                onChange={(e) => handleInputChange('day', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary text-sm"
              >
                {dayOptions.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* 时 */}
            <div>
              <label className="block text-text-primary font-medium mb-2 text-center text-sm">时</label>
              <select
                value={formData.hour}
                onChange={(e) => handleInputChange('hour', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary text-sm"
              >
                {hourOptions.map(hour => (
                  <option key={hour} value={parseInt(hour)}>{hour}</option>
                ))}
              </select>
            </div>

            {/* 分 */}
            <div>
              <label className="block text-text-primary font-medium mb-2 text-center text-sm">分</label>
              <select
                value={formData.minute}
                onChange={(e) => handleInputChange('minute', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary text-sm"
              >
                {minuteOptions.map(minute => (
                  <option key={minute} value={parseInt(minute)}>{minute}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 出生地点选择器 */}
        <div className="bg-card-bg rounded-lg p-4 shadow-lg">
          <h3 className="text-text-primary font-medium mb-4 text-center">出生地点</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* 省份 */}
            <div>
              <label className="block text-text-primary font-medium mb-2">省/直辖市/自治区</label>
              <select
                value={formData.province}
                onChange={(e) => handleInputChange('province', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary"
              >
                <option value="">请选择省份</option>
                {provinceOptions.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            {/* 城市 */}
            <div>
              <label className="block text-text-primary font-medium mb-2">市/区</label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-text-primary"
                disabled={!formData.province}
              >
                <option value="">请选择城市</option>
                {cityOptions.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 预览信息 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-yellow-800 font-medium mb-2">信息预览</h4>
          <p className="text-yellow-700 text-sm">
            {formData.name || '姓名'} · {formData.gender || '性别'} · 
            {formData.year}年{formData.month}月{formData.day}日{formData.hour}点{formData.minute}分 · 
            {formData.province}{formData.city}
          </p>
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