
import React from 'react'

const Situation = () => {
  // console.log(window)
  return(
    <div  >
      <a href='/'  style={{ position:"absolute", width:200, height:80, color:'rgba(0,0,0,0)' }} title='返回' > 返回</a> 
      <iframe src='./static/situation.html' scrolling="yes" height='1000px' width='100%'  >
        您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
      </iframe>
    </div>
  )
}

export default Situation