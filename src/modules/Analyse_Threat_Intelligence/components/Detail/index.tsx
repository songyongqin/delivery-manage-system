

import React from 'react'
import { Tag, Tooltip, Col, Row  } from 'antd'

const ArrTag = ({ text }) => 
          <Tooltip title={ text } >
            <Tag color='#1890ff'  style={{ borderRadius:15, paddingLeft:10, paddingRight:10 ,maxWidth:300, display:'inline-block', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'  }} >{ subStrValue( text) }
            </Tag>
          </Tooltip>



const Detail = props =>{
  const { record } = props
  
  let detail = record.detail
  console.log('detail', detail)
  return (
    <div>
      <h3 style={{ fontWeight:'bold' }} >详细信息</h3>
      {
        detail&&detail.length ? 
          <Row>
            {
              detail.map((arr, index )=> 
                <Col span={24/detail.length} key={ index }>
                  {
                    arr&&arr.length? arr.map((i, indexs) => <Item data={ i } key={ indexs } />  ) : null
                  }
                </Col>)
            }
          </Row> : null
      }
    </div>
  )
}

const Item = ({ data }) => {
  return (
    <Row  >
          <Col  span={6} style={{  textAlign:'right', fontWeight:'bold', whiteSpace:'pre' }} >
            { data? data.name+':   ' : '' }
          </Col >
          <Col span={18}  style={{ overflow:'hidden', whiteSpace:'normal' }} >{ 
            Array.isArray(data.value) ? 
            data.value.map((items,index) =>
              <span  key={ index }  >
                { items ? <ArrTag text={ items } /> : items}
              </span >) : <Tooltip title={ data.value } placement="topLeft" >{subStrValue(data.value)}</Tooltip>
           }</Col >
    </Row>
  )
}
const subStrValue = (value) => {
  let str = String(value)
  return str&&str.substr&&str.substr(0,170) || ''
}

export default Detail