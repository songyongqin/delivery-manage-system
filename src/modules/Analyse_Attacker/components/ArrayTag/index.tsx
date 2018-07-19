


import React from 'react'
import { Tag, Popover } from 'antd'

const getArr = arr => {
  if(!Array.isArray(arr)){
    return [[arr],[]]
  }
  else if( arr.length<=3 ){
    return [arr, [] ]
  }
  else {
    return [
      arr.slice(0,3), arr.slice(3)
    ]
  }
}

const Content = ({ data }) => {
  console.log(data)
  return (
    <div>
      {
        data.map((item, index) => 
          <div key={ index+'tip' } style={ { marginTop:5, marginBottom:5, textAlign:'center' } } ><Tag color={ '#1890ff' } >{ item }</Tag></div>
        )
      }
    </div>
  )
}

const ArrayTag = ({data}) => {
  let arr = getArr(data)
  return (
    <div>
      <Content data={ arr[0] } />
      {
        arr[1].length ? 
        <div>
          <Popover content={ <Content data={ arr[1] } /> }  placement="right" >
            <Tag color={ '#1890ff' } style={ { width:100, textAlign:'center' } } >...</Tag>
          </Popover>
        </div>
        : <div></div>
      }
    </div>
  )
}


export default ArrayTag