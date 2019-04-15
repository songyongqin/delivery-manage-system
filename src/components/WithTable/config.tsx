

import React from 'react'
import { Icon, Input, Button } from 'antd'
import Search from './Search'



interface props{
  // config: Array<config>,
  config: Array<object>,
  filters: object,
  handle: object,
}

interface config{
  title: string,
  dataIndex: string,
  types: Array<string>
}

function findStr(arr:Array<string>, str:string):boolean {
  let isHave = arr&&arr.length ? arr.indexOf(str)!==-1 : false
  return isHave
}



export const getColumns = (props: props) => {
  const { config, filters, handle } = props

  const  selectSearch = (str, visible) => {
    let obj = {}
    obj['whichSelect'] = visible ? str : ''
    handle['setTableState'](obj)
  }


  const arr = config.map(item => {
    if(findStr(item['types'],'sorter')) {
      item['sorter'] = true
    }
    else if(findStr(item['types'],'filters')){
      item['filters'] = filters ? filters[item['dataIndex']] : []
    }
    else if(findStr(item['types'],'search')){
      item['filterIcon'] = <Icon type='search' style={{ color: handle['isSearchValue'][item['dataIndex']] ? '#4F5DCA' :'rgba(0, 0, 0, 0.85)' }} />
      item['onFilterDropdownVisibleChange']= (visible) => selectSearch(item['dataIndex'], visible) ,
      item['filterDropdownVisible'] =  handle['getTableState']()['whichSelect']=== item['dataIndex']
      item['filterDropdown']=(<Search tableSearch={handle['preTableSearch']} 
      getValue={ handle['getTableSearchValue'] }  searchRule={ item['searchRule'] } type={ item['dataIndex']  } />)
    }
    return item
  })
  return arr
}