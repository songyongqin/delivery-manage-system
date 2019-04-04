

import React, { Component } from 'react'
import WithTable from 'components/WithTable'
import request from 'utils/request'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { NODE_MONITOR_NAMESPACE } from 'constants/model'
import WithPagination from 'components/WithPagination'
import { limit } from '../../constants'
import tranformTime from 'utils/tranformTime'

const getCloumns = url => {
  return new Promise((reslove, reject) => {
    request(url + `?${new Date().getTime()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then(res => {
        // console.log('test', res)
        res&&reslove(res['columns'])
      })
      .catch(err => reject(err))
  })

}

const mapStateToProps = state => {
  return {
    state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

interface props{
  path: string 
  type: string
  dispatch?: (any:any) => any  
}

@extraConnect(mapStateToProps, mapDispatchToProps)
class Table extends Component<props,any>{
  constructor(props){
    super(props)
    this.state = {
      columns:[],
      data:[],
      total:0,
      current:1,
      loading:false,
    }
  }

  componentDidMount(){
    let path = this.props.path || ''
    let current = this.state.current || 1
    this.setState({ loading:true })
    getCloumns(path)
    .then(columns => {
      this.setState({ columns })
      this.fetch(current)
    } )
    .catch(err => {
      this.setState({ loading:false })
      console.error(err)
    }  )
  }

  fetch = page => {
    // console.log('xxx', this.props, this.props.dispatch({type:"xxx"}))
    let obj = { page, limit }
    // console.log(obj)
    this.setState({ loading:true })
    this.props.dispatch({ type:`${NODE_MONITOR_NAMESPACE}/${this.props.type}`, payload: obj })
    .then(res => {
      this.setState({ data: res.data, total: res.total, loading:false, current: page })
    } )
    .catch(err => {
      this.setState({ loading:false })
      console.error(err)
    } )
  }

  render(){
    const { columns, data, total, current, loading } = this.state
    return (
      <Spin spinning={ loading } >
        <WithTable config={ columnsAddRender(columns) } tableData={ data }   />
        <WithPagination total={ total }
                              limit={ limit }
                              current={ current }
                              onChange={ this.fetch } />
      </Spin>
    )
  }
}

export default Table


const columnsAddRender = arr => {
  let array = arr.map(i => {
    if(i.dataIndex==='time'){
      i['render'] = text =>  <div>{tranformTime(text)}</div>
    }
    else if(i.dataIndex==='status'){
      i['render'] = text =>  <div style={{ color: `${text===1 ? '#52c41a' : "red"}` }} >{ `${ text===1 ? "连接成功" : '连接失败' }` }</div>
    }
    else if(i.dataIndex==='nodeIp'){
      i['render'] = (text, record) => <a target='blank' href={ record['url'] ? record['url'] : `http://${text}` } style={{ textDecoration:"none" }} >{text}</a>
    }
    return i
  })
  return array
}

