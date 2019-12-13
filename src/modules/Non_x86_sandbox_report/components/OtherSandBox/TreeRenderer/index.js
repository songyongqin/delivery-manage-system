import * as React from 'react'
import ScrollWrapper from '../../../../../components/ScrollWrapper/index'



const Wrap = ({ title, str }) => {
  return (
    <div>
      <div>{ title }</div>
      <ScrollWrapper>
        <div style={{ whiteSpace: "pre-wrap" }} >{ str }</div>
      </ScrollWrapper>
    </div>
  )
  
}


export default (obj = {}) => {
  // return (
  //   <div>
  //     <Wrap title={ '文件结构' } str={ obj['readelf']||'' } />
  //     <Wrap title={ '提取字符串' } str={ obj['strings']||'' } />
  //   </div>
  // )
  return (
    <ScrollWrapper>
        <div style={{ whiteSpace: "pre-wrap" }} >{ obj['result'] }</div>
      </ScrollWrapper>
  )
}