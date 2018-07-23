

import React from 'react'
import { Tag } from 'antd'


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
                { items ? <Tag color='#1890ff'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 }} >{ items }
                </Tag> : items}
              </span>) : item.value
           }</span>
        </div>
      )
      }
    </div>
  )
}

export default Detail