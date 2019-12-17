import * as React from 'react'
import ScrollWrapper from '../../../../../components/ScrollWrapper/index'


// export default (data = []) => {
//   if (data.length === 0) {
//     return <div></div>
//   }
//   return (
//     <div>
//       <p style={{ color: primaryColor }}>共{data.length}条</p>
//       <ScrollWrapper>
//         {
//           data.map((i, index) => {
//             return <p style={{ margin: "0" }} key={`${index}`}>{i}</p>
//           })
//         }
//       </ScrollWrapper>
//     </div>
//   )
// }

const Wrap = ({ title, str }) => {
  return (
    <div>
      <div style={{ marginTop:10, marginBottom:10 }} >{ title }</div>
      <ScrollWrapper>
        <div style={{ whiteSpace: "pre-wrap" }} >{ str }</div>
      </ScrollWrapper>
    </div>
  )
  
}


export default (obj = {}) => {
  return (
    <div>
      <Wrap title={ '文件结构' } str={ obj['readelf']||'' } />
      <Wrap title={ '提取字符串' } str={ obj['strings']||'' } />
    </div>
  )
}