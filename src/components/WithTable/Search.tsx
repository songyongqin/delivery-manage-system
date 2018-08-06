


import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { ipReg, portReg } from 'utils/tools'

interface props{
  tableSearch:(any) => any,
  getValue: (any) => any,
  // getSearchObj: (any) => any,
  searchRule?: string,
  type: string
}

class Search extends Component<props, any> {
  constructor(props){
    super(props)
    this.state={
      value:'',
      isWarn: false,
      text: props.searchRule ==='ip' ? '请输入正确的ip':'请输入正确的端口',
      type: props.type,
    }
  }

  getInputValue = e => {
    const value = e.target.value
    let searchRule = this.props.searchRule
    let isWarn = false
    if(searchRule){
      let reg = searchRule==='ip' ? ipReg :  portReg
      isWarn= value&&searchRule ? !reg.test(value) : false
    }
    let obj = {}
    obj[this.state.type] = value
    if(!isWarn){
      this.props.getValue(obj)
    }
    
    this.setState({ value, isWarn })
  }

  enterSearch = () => {
    const { value, type, isWarn } = this.state
    if(!isWarn){
      this.props.tableSearch({ searchValue:value, searchType: type })
    }
    
  }

  render(){
    return (
      <div style={{ backgroundColor:'aliceblue' }} >
        <div style={{ marginBottom:10 }} >请输入要搜索的内容</div>
        <Input onChange={ this.getInputValue } onPressEnter={ this.enterSearch }
                style={{ width:200, display:'block', marginBottom:10 }} />
        <div style={{ display:`${this.state.isWarn? 'block':'none' }`, color:'#f5222d',  marginBottom:10 }} >{ this.state.text }</div>
        <Button type='primary' icon="search" onClick={ this.enterSearch } >
          搜索
        </Button>
      </div>
    )
  }
}


export default Search