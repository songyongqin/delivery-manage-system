import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import WithTable from 'components/WithTable'
import { ANALYSE_ATTACKED_DETAIL } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Pagination ,Tag, Input } from 'antd'
import { ANALYSE_ATTACKED_ASSETS_DETAL_URL } from 'routes/config/path'
import WhichSelect from 'components/WhichSelect'
import EventTable from './components/EventTable'
import CCTable from './components/CCTable'
const style = require('./index.less')
import {
  selectArr,
  limit
} from './constants'
import WithPagination from 'components/WithPagination'
// import { routerRedux } from 'dva/router'


const mapStateToprops = state => {
  return {
    state,
    eventLoading: state.loading.effects[`${ANALYSE_ATTACKED_DETAIL}/fetchEvent`],
    ccLoading: state.loading.effects[`${ANALYSE_ATTACKED_DETAIL}/fetchCc`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${ANALYSE_ATTACKED_DETAIL}/fetchEvent`,
      payload
    }),
    fetchCc: payload => dispatch({
      type: `${ANALYSE_ATTACKED_DETAIL}/fetchCc`,
      payload
    })
  }
}
//初始参数
const initEventArg = {
  page:1,
  limit:limit,
  attatcedAssetIp:''
}

const initCCtArg = {
  page:1,
  limit:limit,
  attatcedAssetIp:'',
  // transportLayerProtocol :'',
  // applicationLayerProtocol : ''
}

const getAttackedIp = str =>{
    str = str.split('=')[1]
    return str
}




@WithAnimateRender
@extraConnect(mapStateToprops, mapDispatchToprops)
class AnalyseDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      // attatcedAssetIp: getAttackedIp(props.location.search),
      attackedInfo: [],
      threatEventInfo:[],
      c2Record:[],
      eventTotal:0,
      CCTotal:0,
      selectShow: selectArr[0] ||'',
      ccCurrent:1,
      eventReq: { ...initEventArg, 
        attatcedAssetIp: getAttackedIp(props.location.search) },
      ccReq:{ ...initCCtArg, 
        attatcedAssetIp: getAttackedIp(props.location.search) },
      isFetchCC: false
    }
  }

  componentDidMount(){
    // console.log('xxx', this.state.attatcedAssetIp)
    if(!this.state.attackedAssetIp){
      
    }
    this.fetchEvent(1)
    // this.fetchCC({})
  }

  fetchEvent = (page=1) => {
    let eventReq = { ...this.state.eventReq, page }
    this.props.fetch(eventReq)
    .then(res => {
      const { attackedInfo, threatEventInfo, total } = res
      this.setState({ attackedInfo, threatEventInfo, eventTotal: total,  eventReq,  })
    })
    .catch(err => console.error(err) )
  }

  fetchCC = obj => {
    let ccReq = { ...this.state.ccReq , ...obj }
    this.props.fetchCc(ccReq)
    .then(res => {
      const { c2Record, total } = res
      this.setState({ c2Record, CCTotal: total, ccReq, isFetchCC:true  })
    })
    .catch(err => console.error(err) )
  }


  getValue = str => {

    if(!this.state.isFetchCC&&str==='C&C服务器会话记录'){
      this.fetchCC({})
    }
    this.setState({ selectShow: str })
  }
 
  paginationEventChange = page => {
    let eventReq = this.state.eventReq
    eventReq = { ...eventReq, page }
    this.setState({ eventReq })
    this.fetchEvent(page)
  }

  paginationCcChange =page => {
    let ccReq = this.state.ccReq
    ccReq = { ...ccReq, page }
    this.setState({ ccReq })
    this.fetchCC(ccReq)
  }

  ccTableChange = obj => {
    console.log(obj)
    this.fetchCC(obj)
  }

  render() {

    const { attackedInfo, threatEventInfo, c2Record, eventTotal, eventReq,  CCTotal,  ccReq } = this.state
    const { eventLoading, ccLoading  } = this.props
    let columns = [
      { title:'受攻击资产IP', 
        dataIndex:'attatcedAssetIp'
        },
      { title:'MAC地址', 
        dataIndex:'macAddress'
      },
      { title:'受攻击次数', 
        dataIndex:'attackedCount'
      },
      { title:'资产状态', 
        dataIndex:'assetStates'
      }
    ]


    return (
      <div>
        {
          this.props.animateRender([
            <div key="attacked-assets-info">
            <h2>受害资产信息</h2>
            <Spin spinning={ eventLoading   } >
              <WithTable  tableData={ attackedInfo } config={ columns }  />
            </Spin>
            </div>,
            <div key='attacked-assets-event' >
              <WhichSelect data={ selectArr } getValue={ this.getValue } />
              {
                this.state.selectShow ===selectArr[0] ? 
                  <Spin  spinning={ eventLoading }>
                    <EventTable data={threatEventInfo  } />
                    <WithPagination total={ eventTotal } 
                                    current={ eventReq.page }
                                    onChange={ this.paginationEventChange }
                                    limit={ limit } />
                  </Spin> :
                  <Spin spinning={ ccLoading } >
                    <CCTable data={c2Record  } tableChange={ this.ccTableChange } />
                    <WithPagination total={ CCTotal } 
                                    current={ ccReq.page }
                                    onChange={ this.paginationCcChange }
                                    limit={ limit } />
                  </Spin>
              }
              
            </div>
          ])
        }
      </div>
    )
  }
}

export default AnalyseDetail