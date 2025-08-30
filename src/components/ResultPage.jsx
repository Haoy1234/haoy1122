import React from 'react'
import html2canvas from 'html2canvas'

const ResultPage = ({ data }) => {
  // 调试：打印所有数据
  console.log('🎯 ResultPage 接收到的数据:', data)
  console.log('🎯 健康分析数据:', data?.jiankangfenxi)
  console.log('🎯 神煞分析原始数据:', data?.shenshafenxi)
  console.log('🎯 神煞分析处理后数据:', processText(data?.shenshafenxi))

  const handleSaveImage = async () => {
    try {
      const element = document.getElementById('result-page')
      const canvas = await html2canvas(element, {
        backgroundColor: '#AA957B',
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      // 移动端和桌面端不同的保存方式
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // 移动端：长按保存
        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = '黄小仙八字分析.png'
        link.href = imgData
        link.click()
      } else {
        // 桌面端：直接下载
        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = '黄小仙八字分析.png'
        link.href = imgData
        link.click()
      }
    } catch (error) {
      console.error('保存图片失败:', error)
      alert('保存图片失败，请重试')
    }
  }

  // 渲染排盘表格
  const renderPaipanTable = (paipanText) => {
    if (!paipanText) return ''
    
    // 如果是Markdown表格格式，解析并渲染为HTML表格
    if (paipanText.includes('|')) {
      const lines = paipanText.split('\n').filter(line => line.trim())
      const tableRows = lines.filter(line => line.includes('|') && !line.includes('---'))
      
      if (tableRows.length > 0) {
        return (
          <table style={{ 
            width: '100%', 
            fontSize: '8px', 
            lineHeight: '16px',
            textAlign: 'center',
            borderCollapse: 'collapse',
            fontFamily: 'Alexandria',
            fontWeight: '700'
          }}>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index}>
                  {row.split('|').filter(cell => cell.trim()).map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ 
                      padding: '1px 2px', 
                      fontSize: '7px',
                      lineHeight: '12px'
                    }}>
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    }
    
    // 普通文本
    return paipanText
  }

  // 处理文本换行和Markdown符号
  const processText = (text) => {
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* 保存按钮 */}
      <button
        onClick={handleSaveImage}
        className="fixed top-4 right-4 z-50 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-700 transition-colors"
      >
        📱 保存图片
      </button>

      {/* A4页面容器 - 严格595px×842px */}
      <div 
        id="result-page"
        style={{
          position: 'relative',
          width: '595px',
          height: '842px',
          background: '#AA957B',
          overflow: 'hidden' // 防止内容溢出
        }}
      >
        {/* 背景图片 */}
        <img 
          src="/images/背景图片 (node-id=14).png"
          alt="背景"
          style={{
            position: 'absolute',
            width: '740px',
            height: '1042px',
            left: '-85px',
            top: '-293px',
            objectFit: 'cover',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
          }}
          onError={(e) => {
            console.error('背景图片加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* Logo图标 */}
        <img 
          src="/images/Logo图标 (node-id=142).png"
          alt="Logo"
          style={{
            position: 'absolute',
            width: '24px',
            height: '24px',
            left: '23px',
            top: '17px',
            borderRadius: '3px'
          }}
          onError={(e) => {
            console.error('Logo图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 黄小仙来也 Logo文字 */}
        <img 
          src="/images/标题字体图片 (node-id=143).png"
          alt="黄小仙来也"
          style={{
            position: 'absolute',
            width: '69px',
            height: '39px',
            left: '44px',
            top: '10px'
          }}
          onError={(e) => {
            console.error('标题字体图片加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 右上角装饰图片 */}
        <img 
          src="/images/右上角装饰图 (node-id=144).png"
          alt="装饰"
          style={{
            position: 'absolute',
            width: '57px',
            height: '81px',
            left: '494px',
            top: '54px'
          }}
          onError={(e) => {
            console.error('右上角装饰图加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 八字概括标题 */}
        <div style={{
          position: 'absolute',
          width: '266px',
          height: '41px',
          left: '162px',
          top: '63px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '17px',
          textAlign: 'center',
          color: '#583C22',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'pre-wrap'
        }}>
          {processText(data?.bazigaikuo)}
        </div>

        {/* 总结背景框 */}
        <div style={{
          position: 'absolute',
          width: '548px',
          height: '81px',
          left: '23px',
          top: '127px',
          background: '#FFEACD',
          boxShadow: '0px 7px 6.2px 4px rgba(0, 0, 0, 0.08)',
          borderRadius: '8px'
        }} />

        {/* 总结图标 */}
        <img 
          src="/images/总结图标 (node-id=138).png"
          alt="总结"
          style={{
            position: 'absolute',
            width: '11px',
            height: '11px',
            left: '273px',
            top: '138px'
          }}
          onError={(e) => {
            console.error('总结图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【总结】标题 */}
        <div style={{
          position: 'absolute',
          width: '55px',
          height: '14px',
          left: '280px',
          top: '138px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '11px',
          lineHeight: '13px',
          color: '#684A2E'
        }}>
          【总结】
        </div>

        {/* 简要总结内容 */}
        <div style={{
          position: 'absolute',
          width: '517px',
          height: '42px',
          left: '37px',
          top: '157px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          textAlign: 'center',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}>
          {processText(data?.jianyaozongjie)}
        </div>

        {/* 八字排盘背景框 */}
        <div style={{
          position: 'absolute',
          width: '548px',
          height: '128px',
          left: '23px',
          top: '220px',
          background: '#FFEACD',
          borderRadius: '10px'
        }} />

        {/* 八卦图标 */}
        <img 
          src="/images/八卦图标 (node-id=120).png"
          alt="八卦"
          style={{
            position: 'absolute',
            width: '13px',
            height: '13px',
            left: '37px',
            top: '232px'
          }}
          onError={(e) => {
            console.error('八卦图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【八字排盘】标题 */}
        <div style={{
          position: 'absolute',
          width: '69px',
          height: '13px',
          left: '47px',
          top: '232px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '11px',
          lineHeight: '13px',
          color: '#684A2E'
        }}>
          【八字排盘】
        </div>

        {/* 排盘内容 */}
        <div style={{
          position: 'absolute',
          width: '516px',
          height: '79px',
          left: '38px',
          top: '252px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '8px',
          lineHeight: '16px',
          textAlign: 'center',
          color: '#000000',
          overflow: 'hidden'
        }}>
          {renderPaipanTable(data?.paipan)}
        </div>

        {/* 今日运势背景框 */}
        <div style={{
          position: 'absolute',
          width: '308px',
          height: '234px',
          left: '23px',
          top: '360px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 运势指南图标 */}
        <img 
          src="/images/运势指南图标 (node-id=141).png"
          alt="运势指南"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '37px',
            top: '372px'
          }}
          onError={(e) => {
            console.error('运势指南图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【今日运势】标题 */}
        <div style={{
          position: 'absolute',
          width: '60px',
          height: '12px',
          left: '43px',
          top: '371px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【今日运势】
        </div>

        {/* 今日运势内容 */}
        <div style={{
          position: 'absolute',
          width: '267px',
          height: '195px',
          left: '37px',
          top: '392px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.jinriyunshi)}
        </div>

        {/* 相似古人背景框 */}
        <div style={{
          position: 'absolute',
          width: '227px',
          height: '103px',
          left: '344px',
          top: '360px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 人人图标 */}
        <img 
          src="/images/人人图标 (node-id=137).png"
          alt="人人"
          style={{
            position: 'absolute',
            width: '11px',
            height: '11px',
            left: '353px',
            top: '372px'
          }}
          onError={(e) => {
            console.error('人人图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【相似古人】标题 */}
        <div style={{
          position: 'absolute',
          width: '60px',
          height: '12px',
          left: '361px',
          top: '371px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【相似古人】
        </div>

        {/* 古人分析内容 */}
        <div style={{
          position: 'absolute',
          width: '206px',
          height: '68px',
          left: '353px',
          top: '389px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.gurenfenxi)}
        </div>

        {/* 事业分析背景框 */}
        <div style={{
          position: 'absolute',
          width: '227px',
          height: '95px',
          left: '344px',
          top: '476px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 办公图标 */}
        <img 
          src="/images/办公图标 (node-id=136).png"
          alt="办公"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '353px',
            top: '487px',
            transform: 'scaleX(-1)'
          }}
          onError={(e) => {
            console.error('办公图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【事业分析】标题 */}
        <div style={{
          position: 'absolute',
          width: '66px',
          height: '11px',
          left: '360px',
          top: '486px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【事业分析】
        </div>

        {/* 事业分析内容 */}
        <div style={{
          position: 'absolute',
          width: '211px',
          height: '58px',
          left: '353px',
          top: '507px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.shiyefenxi)}
        </div>

        {/* 健康分析背景框 */}
        <div style={{
          position: 'absolute',
          width: '227px',
          height: '110px',
          left: '344px',
          top: '583px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 医疗健康图标 */}
        <img 
          src="/images/医疗健康图标 (node-id=121).png"
          alt="医疗健康"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '353px',
            top: '595px'
          }}
          onError={(e) => {
            console.error('医疗健康图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【健康分析】标题 */}
        <div style={{
          position: 'absolute',
          width: '61px',
          height: '14px',
          left: '360px',
          top: '594px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【健康分析】
        </div>

        {/* 健康分析内容 */}
        <div style={{
          position: 'absolute',
          width: '211px',
          height: '68px',
          left: '353px',
          top: '616px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.jiankangfenxi) || `调试: 健康分析字段为空\n原始数据: ${JSON.stringify(data?.jiankangfenxi)}\n所有字段: ${data ? Object.keys(data).join(', ') : 'data为空'}`}
        </div>

        {/* 感情分析背景框 */}
        <div style={{
          position: 'absolute',
          width: '308px',
          height: '85px',
          left: '23px',
          top: '608px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 爱情运势图标 */}
        <img 
          src="/images/爱情运势图标 (node-id=135).png"
          alt="爱情运势"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '37px',
            top: '617px'
          }}
          onError={(e) => {
            console.error('爱情运势图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【感情分析】标题 */}
        <div style={{
          position: 'absolute',
          width: '66px',
          height: '11px',
          left: '44px',
          top: '616px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【感情分析】
        </div>

        {/* 爱情分析内容 */}
        <div style={{
          position: 'absolute',
          width: '284px',
          height: '49px',
          left: '36px',
          top: '635px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.aiqingfenxi)}
        </div>

        {/* 神煞分析背景框 */}
        <div style={{
          position: 'absolute',
          width: '202px',
          height: '111px',
          left: '23px',
          top: '706px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 锦鲤券图标 */}
        <img 
          src="/images/锦鲤券图标 (node-id=139).png"
          alt="锦鲤券"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '37px',
            top: '717px'
          }}
          onError={(e) => {
            console.error('锦鲤券图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【神煞分析】标题 */}
        <div style={{
          position: 'absolute',
          width: '66px',
          height: '12px',
          left: '44px',
          top: '716px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【神煞分析】
        </div>

        {/* 神煞分析内容 */}
        <div style={{
          position: 'absolute',
          width: '173px',
          height: '72px',
          left: '37px',
          top: '737px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.shenshafenxi)}
        </div>

        {/* 十神分析背景框 */}
        <div style={{
          position: 'absolute',
          width: '338px',
          height: '111px',
          left: '233px',
          top: '706px',
          background: '#FFEACD',
          borderRadius: '8px'
        }} />

        {/* 祭奠蜡烛图标 */}
        <img 
          src="/images/祭奠蜡烛图标 (node-id=140).png"
          alt="祭奠蜡烛"
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            left: '245px',
            top: '716px'
          }}
          onError={(e) => {
            console.error('祭奠蜡烛图标加载失败:', e.target.src)
            e.target.style.display = 'none'
          }}
        />

        {/* 【十神分析】标题 */}
        <div style={{
          position: 'absolute',
          width: '63px',
          height: '12px',
          left: '252px',
          top: '716px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#684A2E'
        }}>
          【十神分析】
        </div>

        {/* 十神分析内容 */}
        <div style={{
          position: 'absolute',
          width: '314px',
          height: '71px',
          left: '246px',
          top: '738px',
          fontFamily: 'Alexandria',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '8px',
          lineHeight: '12px',
          color: '#000000',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}>
          {processText(data?.shishenfenxi)}
        </div>
      </div>
    </div>
  )
}

export default ResultPage