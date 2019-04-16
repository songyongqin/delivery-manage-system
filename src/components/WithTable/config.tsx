

import React from 'react'
import { Icon, Input, Button } from 'antd'
import Search from './Search'
import cloneDeep from 'lodash/cloneDeep'


interface props{
  // config: Array<config>,
  config: Array<object>,
  filters: object,
  whichSelect: boolean,
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
  const { config, filters, handle , whichSelect} = props
  console.log('get', whichSelect)
  const  selectSearch = (str, visible) => {
    
    let obj = {}
    obj['whichSelect'] = visible ? str : ''
    // console.log('xxx', obj)
    handle['setTableState'](obj)
    this.select = obj['whichSelect']
  }


  const arr = config.map(item => {
    console.log(item['types'])
    if(findStr(item['types'],'sorter')) {
      item['sorter'] = true
    }
    else if(findStr(item['types'],'filters')){
      item['filters'] = filters ? filters[item['dataIndex']] : []
    }
    else if(findStr(item['types'],'search')){
      console.log('arr', whichSelect=== item['dataIndex'])
      item['filterIcon'] = <Icon type='search' style={{ color: handle['isSearchValue'][item['dataIndex']] ? '#4F5DCA' :'rgba(0, 0, 0, 0.85)' }} />
      item['onFilterDropdownVisibleChange']= (visible) => selectSearch(item['dataIndex'], visible) 
      // item['filterDropdownVisible'] =  handle['getTableState']()['whichSelect']=== item['dataIndex']
      item['filterDropdownVisible'] =  whichSelect=== item['dataIndex']
      // item['filterDropdownVisible'] =  true
      item['filterDropdown']=(<Search tableSearch={handle['preTableSearch']} 
      getValue={ handle['getTableSearchValue'] }  searchRule={ item['searchRule'] } type={ item['dataIndex']  } />)
    }
    
    // console.log(item)
    let obj = Object.assign({}, item)
    delete obj['types']
    return obj
  })
  console.log('arr', arr)
  return arr
}