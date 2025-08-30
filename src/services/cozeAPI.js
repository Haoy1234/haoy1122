/**
 * 调用Coze API进行八字分析
 * 根据官方文档: https://www.coze.cn/open/docs/developer_guides/workflow_run
 */
export const callCozeAPI = async (userData) => {
  console.log('🚀 开始调用Coze API')
  console.log('📝 输入数据:', userData.inputString)
  
  const apiUrl = 'https://api.coze.cn/v1/workflow/run'
  const token = 'pat_BrE5AY14IfYC50MLLpEYs4loaVjgOOLT9T4AAWfqUo8tOMSNVNBQkDBEGEx6oyUI'
  const workflowId = '7536218586999111706'
  
  const requestBody = {
    workflow_id: workflowId,
    parameters: {
      input: userData.inputString
    }
  }
  
  console.log('📋 API请求配置:', {
    url: apiUrl,
    workflow_id: workflowId,
    parameters: requestBody.parameters
  })
  
  try {
    console.log('🔄 正在发起API请求...')
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    
    console.log('📡 收到响应，状态码:', response.status)
    console.log('📡 响应头:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API请求失败:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`)
    }
    
    const responseData = await response.json()
    console.log('✅ API响应成功:', responseData)
    
    // 解析响应数据
    if (responseData.code === 0 && responseData.data) {
      console.log('🎯 开始解析响应数据')
      const parsedData = parseAPIResponse(responseData.data)
      
      return {
        msg: 'Success',
        data: parsedData
      }
    } else {
      console.error('❌ API返回错误:', responseData)
      throw new Error(responseData.msg || 'API返回未知错误')
    }
    
  } catch (error) {
    console.error('❌ API调用失败详情:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return {
      msg: 'Error',
      error: error.message || '网络请求失败'
    }
  }
}

/**
 * 解析API响应数据
 */
const parseAPIResponse = (responseData) => {
  console.log('🔍 开始解析响应数据:', responseData)
  
  try {
    let data = responseData
    
    // 如果响应数据是字符串，尝试解析JSON
    if (typeof responseData === 'string') {
      try {
        data = JSON.parse(responseData)
        console.log('📝 JSON解析成功:', data)
      } catch (e) {
        console.log('📝 纯文本响应，尝试智能解析')
        return parseTextResponse(responseData)
      }
    }
    
    // 提取各个字段 - 严格按照规则映射，保持原始格式
    const result = {
      paipan: cleanText(data.paipan || data.排盘 || data.paipan_result || ''),
      bazigaikuo: cleanText(data.bazigaikuo || data.八字概括 || data.bazi_summary || ''),
      jianyaozongjie: cleanText(data.jianyaozongjie || data.简要总结 || data.brief_summary || ''),
      gurenfenxi: cleanText(data.gurenfenxi || data.古人分析 || data.ancient_analysis || ''),
      shiyefenxi: cleanText(data.shiyefenxi || data.事业分析 || data.career_analysis || ''),
      aiqingfenxi: cleanText(data.aiqingfenxi || data.爱情分析 || data.love_analysis || data.感情分析 || ''),
      jinriyunshi: cleanText(data.jinriyunshi || data.今日运势 || data.today_fortune || ''),
      jiankangfenxi: cleanText(data.jiankangfenxi || data.健康分析 || data.health_analysis || data.jinqianfenxi || data.jiankang || data.health || ''),
      shenshafenxi: cleanText(data.shenshafenxi || data.神煞分析 || data.deity_analysis || ''),
      shishenfenxi: cleanText(data.shishenfenxi || data.十神分析 || data.ten_gods_analysis || '')
    }
    
    console.log('✅ 数据解析完成:', result)
    console.log('🔍 API原始数据所有字段:', Object.keys(data))
    console.log('🔍 查找健康相关字段:')
    Object.keys(data).forEach(key => {
      if (key.includes('健康') || key.includes('health') || key.includes('jiankang') || key.includes('jinqian')) {
        console.log(`  - ${key}: ${data[key]}`)
      }
    })
    return result
    
  } catch (error) {
    console.error('❌ 数据解析失败:', error)
    // 解析失败时返回空数据，不提供预设内容
    return {
      paipan: '',
      bazigaikuo: '',
      jianyaozongjie: '',
      gurenfenxi: '',
      shiyefenxi: '',
      aiqingfenxi: '',
      jinriyunshi: '',
      jiankangfenxi: '',
      shenshafenxi: '',
      shishenfenxi: ''
    }
  }
}

/**
 * 清理文本格式
 */
const cleanText = (text) => {
  if (!text) return ''
  
  return text
    .replace(/\\n/g, '\n')           // 处理转义的换行符
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1')     // 移除斜体标记
    .replace(/【(.*?)】/g, '')        // 移除中文标题标记
    .replace(/^\s*-\s*/gm, '')       // 移除列表标记
    .replace(/^\s*\*\s*/gm, '')      // 移除星号列表标记
    .replace(/^\s*\d+\.\s*/gm, '')   // 移除数字列表标记
    .trim()
}

/**
 * 解析纯文本响应
 */
const parseTextResponse = (text) => {
  console.log('📝 解析纯文本响应:', text)
  
  // 初始化空结果
  const result = {
    paipan: '',
    bazigaikuo: '',
    jianyaozongjie: '',
    gurenfenxi: '',
    shiyefenxi: '',
    aiqingfenxi: '',
    jinriyunshi: '',
    jiankangfenxi: '',
    shenshafenxi: '',
    shishenfenxi: ''
  }
  
  // 尝试解析文本中的各个部分
  const sections = text.split(/【|】/).filter(s => s.trim())
  
  for (let i = 0; i < sections.length - 1; i += 2) {
    const title = sections[i]?.trim()
    const content = sections[i + 1]?.trim()
    
    if (title && content) {
      if (title.includes('排盘')) result.paipan = content
      else if (title.includes('八字概括')) result.bazigaikuo = content
      else if (title.includes('简要总结') || title.includes('总结')) result.jianyaozongjie = content
      else if (title.includes('古人分析') || title.includes('相似古人')) result.gurenfenxi = content
      else if (title.includes('事业分析')) result.shiyefenxi = content
      else if (title.includes('爱情分析') || title.includes('感情分析')) result.aiqingfenxi = content
      else if (title.includes('今日运势') || title.includes('运势')) result.jinriyunshi = content
      else if (title.includes('健康分析')) result.jiankangfenxi = content
      else if (title.includes('神煞分析')) result.shenshafenxi = content
      else if (title.includes('十神分析')) result.shishenfenxi = content
    }
  }
  
  return result
}