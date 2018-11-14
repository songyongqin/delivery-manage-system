
import React from 'react'

const Situation = () => {
  // console.log(window)
  return(
    <div  >
      <a href='/'  style={{ position:"absolute", width:220, height:80, color:'rgba(0,0,0,0)' }} title='返回' > 返回</a> 
      <iframe src='./static/situation.html' scrolling="yes" height='1000px' width='100%'  >
        您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
      </iframe>
    </div>
  )
}

// class Situation extends React.Component<any,any>{
//   componentDidMount(){
//     // document.getElementById('xx').innerHTML = '<object type="text/html" data="situation.html" width="100%" height="100%"></object>';
//   }
//   render(){
//     console.log(location)
//     return (
//       <div>
//         <a href='/'  style={{ position:"absolute", width:200, height:80, color:'rgba(0,0,0,0)' }} title='返回' > 返回</a>
//         <div id='xx' style={{ height:1080 }}  dangerouslySetInnerHTML={{ 
//              __html: '<object type="text/html" data="situation.html" width="100%" height="100%"></object>' }} >
//         </div>
//       </div>
      
//     )
//   }
// }

export default Situation