

import React from 'react'
import { Tag, Tooltip  } from 'antd'

const ArrTag = ({ text }) => 
          <Tooltip title={ text } >
            <Tag color='#1890ff'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 ,maxWidth:300, display:'inline-block', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'  }} >{ text }
            </Tag>
          </Tooltip>


// const Detail = props =>{
//   const { record } = props
//   return (
//     <div>
//       <h3 style={{ fontWeight:'bold' }} >详细信息</h3>
//       {
//         record.details&&record.details.length&& record.details.map((item, index) =>
//         <div key={ index } >
//           <span style={{ display:'inline-block', width:150, textAlign:'right', fontWeight:'bold', whiteSpace:'pre' }} >
//             { item? item.name+':   ' : '' }
//           </span>
//           <span>{ 
//             Array.isArray(item.value) ? 
//             item.value.map((items,index) =>
//               <span key={ index }>
//                 { items ? <Tag color='#1890ff'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 }} >{ items }
//                 </Tag> : items}
//               </span>) : item.value
//            }</span>
//         </div>
//       )
//       }
//     </div>
//   )
// }

const Detail = props =>{
  const { record } = props
  return (
    <div>
      <h3 style={{ fontWeight:'bold' }} >详细信息</h3>
      {
        record.details&&record.details.length&& record.details.map((item, index) =>
        <div key={ index } >
          <span style={{ display:'inline-block', width:150, textAlign:'right', fontWeight:'bold', whiteSpace:'pre' }} >
            { item? item.name+':   ' : '' }
          </span>
          <span>{ 
            Array.isArray(item.value) ? 
            item.value.map((items,index) =>
              <span key={ index }>
                { items ? <ArrTag text={ items } /> : items}
              </span>) : item.value
           }</span>
        </div>
      )
      }
    </div>
  )
}

export default Detail