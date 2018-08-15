

import React from 'react'
import WithTable from 'components/WithTable'
import WithPagination from 'components/WithPagination'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { THREAT_REPORT_MODAL_NAMESPACE } from 'constants/model'
import { Icon, Button } from 'antd'
import { 
  threatEventConfig,
  threatGroupConfig,
  threatAttackedAssetsConfig,
  threatFamilyConfig,
  threatIntelligenceConfig,
       } from './constants'
import moment from 'moment'
import { download } from 'utils'


const mapStateToProps = state => {
  return {
    state,
    effects: state.loading.effects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

interface props{
  dispatch?: (any:any) => any
  state?: object
  effects?: object
  timestampRange: Array<any>
  type: string
}

interface state{
  data: Array<object>
  total:number
  init: {
    type: string
    fetch: string
    post: string
    icon: string
    config: Array<object>
  }
  reqArg:{
    page:number
    limit:number
    timestampRange:Array<any>
  }
}

const initArg = {
  page:1,
  limit:10,
  timestampRange:[]
}



const arr = [
  { 
    type:'威胁事件', 
    fetch: `${THREAT_REPORT_MODAL_NAMESPACE}/fetchThreatEvent`, 
    post: `${THREAT_REPORT_MODAL_NAMESPACE}/postThreatEvent`,
    icon:"file-text",
    config: threatEventConfig
  },
  { 
    type:'威胁组织', 
    fetch: `${THREAT_REPORT_MODAL_NAMESPACE}/fetchThreatGroup`, 
    post: `${THREAT_REPORT_MODAL_NAMESPACE}/postThreatGroup`,
    icon:"api",
    config: threatGroupConfig
  },
  { 
    type:'受攻击资产', 
    fetch: `${THREAT_REPORT_MODAL_NAMESPACE}/fetchThreatAssets`, 
    post: `${THREAT_REPORT_MODAL_NAMESPACE}/postThreatAssets`,
    icon:"pay-circle-o",
    config: threatAttackedAssetsConfig
  },
  { 
    type:'威胁家族', 
    fetch: `${THREAT_REPORT_MODAL_NAMESPACE}/fetchThreatFamily`, 
    post: `${THREAT_REPORT_MODAL_NAMESPACE}/postThreatFamily`,
    icon:"team",
    config: threatFamilyConfig
  },
  { 
    type:'威胁情报', 
    fetch: `${THREAT_REPORT_MODAL_NAMESPACE}/fetchThreatIntelligence`, 
    post: `${THREAT_REPORT_MODAL_NAMESPACE}/postThreatIntelligence`,
    icon:"line-chart",
    config: threatIntelligenceConfig
  }
]

const str = `${THREAT_REPORT_MODAL_NAMESPACE}/fetchThreatEvent`

const getConfig = type => {
  if( typeof type !=='string' ){
    console.error('type err')
  }
  let array = arr.filter(item => item.type===type )
  if(array.length){
    return array[0]
  }
  else return arr[0] 
}

@extraConnect( mapStateToProps, mapDispatchToProps )
class ModalContent extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      total:0,
      init: {
        ...getConfig(this.props.type)
      },
      reqArg:{
        ...initArg,
        timestampRange: this.props.timestampRange ||[]
      }
    }
  }

  componentDidMount(){
    console.log('did')
    this.fetch({})
  }

  fetch =obj => {
    let payload = { ...this.state.reqArg, ...obj }
    let type = this.state.init.fetch
    this.props.dispatch({ type, payload  })
    .then(res => {
      let objs = { ...res , reqArg: payload }
      this.setState(objs)
    })
    .catch(err => console.error(err) )
  }

  export = obj => {
    let timestampRange = this.transTime(this.props.timestampRange)
    let type = this.state.init.post
    this.props.dispatch({ type, payload: { timestampRange } })
    .then(res => download(res) )
    .catch(err => console.error(err) )
  }

  transTime = arr => {
    if(!arr.length){
      return [0, moment().endOf('days').unix() ]
    }
    else return [ moment(arr[0]).startOf('days').unix(), moment(arr[1]).endOf('days').unix() ]
  }


  paginationChage = page => {
    this.fetch({ page })
  }
  
  render(){
    const {  effects, type } = this.props
    const { init, data, total, reqArg } = this.state
    return(
      <div>
        <div style={{ marginTop:25 }} >
          <Icon type={ init.icon } style={{ fontSize:21 }} />
          <h2 style={{ display:'inline-block', marginLeft:5 }} >{ type==='威胁事件' ? '攻击事件' : type }</h2>
          <Button type='primary' style={{ float:'right' }} 
              onClick={ this.export } >导出</Button>
        </div>
        <Spin spinning={ effects[this.state.init.fetch] } >
          <WithTable config={ init.config } tableData={ data } /> 
          <WithPagination total={ total } 
                  current={ reqArg.page }
                  limit={ reqArg.limit }
                  onChange={ this.paginationChage } />
        </Spin>
      </div>
    )
  }
}

export default ModalContent