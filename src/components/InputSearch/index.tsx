
import React from 'react'
import { Input } from 'antd';
import { SearchIcon } from '../IconSvg'

const InputSearch = ({ searchEnter, onChange, value, placeholder='输入待搜索的值' }) => {
  return(
    <Input placeholder={ placeholder }
                        onPressEnter = { searchEnter }
                        suffix = { <SearchIcon onClick={ searchEnter }  /> }
                        value = { value }
                        onChange = { onChange } 
                        style={{ width:240, marginRight:20 }}  />
  )
}

export default InputSearch;