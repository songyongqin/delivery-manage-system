
import * as React from 'react'
import { Menu} from 'antd'

const arr = [
  { text:"XML格式", types:'xml' },
  { text:"CSV格式", types:"csv" }
]


const Download = ({beforeDownload}) => {
  return (
    <Menu>
      {
        arr.map(i => <Menu.Item key={ i.types } ><div onClick={_ =>  beforeDownload(i.types) } >{ i.text }</div></Menu.Item> )
      }
    </Menu>
  )
}


export default Download