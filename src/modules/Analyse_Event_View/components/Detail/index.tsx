

// import React from 'react'
// import { Tag, Tooltip  } from 'antd'

// const ArrTag = ({ text }) => 
//           <Tooltip title={ text } >
//             {/* <Tag color='#4F5DCA'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 ,maxWidth:300, display:'inline-block', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'  }} >{ text }
//             </Tag> */}
//             <div   style={{ borderRadius:5, paddingLeft:10, paddingRight:10 ,maxWidth:300, display:'inline-block', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', border: 'solid 1px #4F5DCA' , marginRight: 10, color: '#4F5DCA'  }} >{ text }
//             </div>
//           </Tooltip>


// // const Detail = props =>{
// //   const { record } = props
// //   return (
// //     <div>
// //       <h3 style={{ fontWeight:'bold' }} >详细信息</h3>
// //       {
// //         record.details&&record.details.length&& record.details.map((item, index) =>
// //         <div key={ index } >
// //           <span style={{ display:'inline-block', width:150, textAlign:'right', fontWeight:'bold', whiteSpace:'pre' }} >
// //             { item? item.name+':   ' : '' }
// //           </span>
// //           <span>{ 
// //             Array.isArray(item.value) ? 
// //             item.value.map((items,index) =>
// //               <span key={ index }>
// //                 { items ? <Tag color='#4F5DCA'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 }} >{ items }
// //                 </Tag> : items}
// //               </span>) : item.value
// //            }</span>
// //         </div>
// //       )
// //       }
// //     </div>
// //   )
// // }

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
//                 { items ? <ArrTag text={ items } /> : items}
//               </span>) : item.value
//            }</span>
//         </div>
//       )
//       }
//     </div>
//   )
// }

// export default Detail





import React from 'react'
import { Tag, Tooltip, Col, Row  } from 'antd'

const ArrTag = ({ text }) => 
          <Tooltip title={ text } >
            <Tag color='#1890ff'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 ,maxWidth:300, display:'inline-block', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'  }} >{ text }
            </Tag>
          </Tooltip>


const Detail = props =>{
  const { record } = props
  return (
    <div>
      <h3 style={{ fontWeight:'bold' }} >详细信息</h3>
      <div style={{ display:'flex', flexWrap: 'wrap' }} >
        {
          record.details&&record.details.length&& record.details.map((item, index) =>
          <Item data={ item } key={ index }  />
        )
        }
      </div>
    </div>
  )
}

const Item = ({ data }) => {
  return (
    <Row style={{ width:'50%' }} >
          <Col  span={6} style={{  textAlign:'right', fontWeight:'bold', whiteSpace:'pre' }} >
            { data? data.name+':   ' : '' }
          </Col >
          <Col span={18}  >{ 
            Array.isArray(data.value) ? 
            data.value.map((items,index) =>
              <span  key={ index }  >
                { items ? <ArrTag text={ items } /> : items}
              </span >) : data.value
           }</Col >
        </Row>
  )
}

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
//           <span  >{ 
//             Array.isArray(item.value) ? 
//             item.value.map((items,index) =>
//               <span key={ index }  >
//                 { items ? <ArrTag text={ items } /> : items}
//               </span>) : item.value
//            }</span>
//         </div>
//       )
//       }
//     </div>
//   )
// }

export default Detail