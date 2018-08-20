import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import WithTable from 'components/WithTable'
import { ANALYSE_ATTACKER_DETAIL } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Tabs } from 'antd'
import { ANALYSE_ATTACKED_ASSETS_DETAL_URL } from 'routes/config/path'
import Whois from './components/Whois'
import LevelTag from 'components/LevelTag'
import TimeTag from 'components/TimeTag'
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
    ipLoading: state.loading.effects[`${ANALYSE_ATTACKER_DETAIL}/fetchIp`],
    threatLoading: state.loading.effects[`${ANALYSE_ATTACKER_DETAIL}/fetchThreat`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetchIp: payload => dispatch({
      type: `${ANALYSE_ATTACKER_DETAIL}/fetchIp`,
      payload
    }),
    fetchThreat: payload => dispatch({
      type: `${ANALYSE_ATTACKER_DETAIL}/fetchThreat`,
      payload
    })
  }
}
//初始参数


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
      attackerIP: getAttackedIp(props.location.search),
      isHave:0, //是否有详细信息0，没有，1有
      IPInfo:[],
      whoisInfo:[], 
      relationUrl:[], 
      relationFile:[], 
      relationIP:[], 
      relationDomain:[],
      selectShow: selectArr[0] ||'',

      isFetchThreat: false,
      threatInfo:[],
      threatTotal:0,
      threatReq:{
        limit:limit,
        page:1,
        attackerIP: getAttackedIp(props.location.search)
      }

      // attackedInfo: [],
      // threatEventInfo:[],
      // c2Record:[],
      // eventTotal:0,
      // CCTotal:0,
      // selectShow: selectArr[0] ||'',
      // ccCurrent:1,
    }
  }

  componentDidMount(){
    if(!this.state.attackerIP){
      
    }
    this.fetchIp()
    // this.fetchThreat({})
  }

  fetchIp = () => {
    let attackerIP = this.state.attackerIP
    this.props.fetchIp({ attackerIP })
    .then(res => {
      const { IPInfo, whoisInfo, relationUrl, relationFile, relationIP, relationDomain, isHave  } = res
      this.setState({ IPInfo,
                      whoisInfo, 
                      relationUrl, 
                      isHave,
                      relationFile, 
                      relationIP,
                      relationDomain })
    })
    .catch(err => console.error(err) )
  }

  fetchThreat = objs => {
    let threatReq = { ...this.state.threatReq, ...objs }
    this.props.fetchThreat(threatReq)
    .then(res => {
      const { threatInfo, total } = res
      this.setState({ threatInfo, threatTotal: total, isFetchThreat: true, threatReq  })
    })
    .catch(err => console.error(err) )
  }


  getValue = str => {
    
    if(!this.state.isFetchThreat&&str==='威胁事件信息'){
      this.fetchThreat({page:1})
    }
    this.setState({ selectShow: str })
  }
 


  paginationCcChange =page => {
    let { attackerIP } = this.state
    this.setState({ page })
    this.fetchThreat({ page, attackerIP })
  }



  render() {
    
    const { IPInfo, isHave,  threatInfo, whoisInfo, relationUrl, relationFile, relationIP, relationDomain, threatTotal, threatReq } = this.state
    const { ipLoading, threatLoading  } = this.props
    let IPInfoColumns = [
      { title:'攻击者IP', 
        dataIndex:'attackerIp'
        },
      { title:'IP所属组织', 
        dataIndex:'attackIPGroup'
      },
      { title:'国家代码', 
        dataIndex:'countryCode'
      },
      { title:'时区', 
        dataIndex:'timeZone'
      }
    ]

    let relationUrlColumns = [
      { title:'扫描日期', 
        dataIndex:'time'
        },
      { title:'URL', 
        dataIndex:'url'
      }
    ]

    let relationFileColumns = [
      { title:'扫描日期', 
        dataIndex:'time'
        },
      { title:'文件类型', 
        dataIndex:'fileType'
      },
      { title:'名称', 
        dataIndex:'name'
      }
    ]
    let relationIPColumns = [
      { title:'扫描日期', 
        dataIndex:'time'
        },
      { title:'IP', 
        dataIndex:'ip'
      }
    ]
    let relationDomainColumns = [
      { title:'扫描日期', 
        dataIndex:'time'
        },
      { title:'域名', 
        dataIndex:'domain'
      }
    ]



    let CCRecordColumns = [
      { title:'序号', 
        dataIndex:'index',
        render: (text, record, index) => <div>{ index+1 }</div>
      },
      { title:'首次发生时间', 
        dataIndex:'firstTime',
        render: text =>  <TimeTag num={ text } />
      },
      { title:'最近发生时间', 
        dataIndex:'latelyTime',
        render: text =>  <TimeTag num={ text } />
      },
      { title:'威胁行为', 
        dataIndex:'threatenBehavior'
      },
      { title:'详细描述', 
        dataIndex:'detailDescription'
      },
      { title:'威胁类型', 
        dataIndex:'eventType'
      },
      { title:'受攻击资产IP', 
        dataIndex:'attackedAssetsIP',
        render: text => <a href={ `#${ANALYSE_ATTACKED_ASSETS_DETAL_URL}?attackedAssetsIP=${text}` }
              style={{ textDecoration:'none' }} >{text}</a>
      },
      { title:'事件归并次数', 
        dataIndex:'eventMergeCount'
      },
      { title:'资产状态', 
        dataIndex:'assetStates'
      },
      { title:'攻击阶段', 
        dataIndex:'attackStage'
      },
      { title:'威胁等级', 
        dataIndex:'level',
        render: text => <LevelTag text={ text } />
      }
    ]
    

    return (
      <div>
        {
          this.props.animateRender([
            <div key="attacked-assets-info">
            <h2>攻击者信息</h2>
            <Spin spinning={ ipLoading   } >
              <WithTable  tableData={ IPInfo } config={ IPInfoColumns }  />
            </Spin>
            </div>,
            <div key='attacked-assets-event'  >
              <Tabs onChange={ this.getValue } >
                <Tabs.TabPane tab={ selectArr[0] } key={selectArr[0]  }  >
                  <Spin  spinning={ ipLoading }>
                    { isHave ? <WHOIS whoisInfo={ whoisInfo }  relationUrl= {relationUrl}  
                            relationUrlColumns={ relationUrlColumns } relationFile={ relationFile } 
                            relationFileColumns={ relationFileColumns } relationIP={ relationIP }
                            relationIPColumns={ relationIPColumns } relationDomain={ relationDomain }
                            relationDomainColumns={ relationDomainColumns }/> :
                            <div>
                              若想查看更多攻击者的信息，请在配置管理>>系统配置>>网卡配置中打开
                              <a href={'/#/config/sys-config/network'} style={{ textDecoration:'none' }} >“云检测功能”</a>
                            </div>
                             }
                  </Spin>
                </Tabs.TabPane> 
                <Tabs.TabPane tab={ selectArr[1] } key={selectArr[1]  }  >
                  <Spin spinning={ threatLoading } >
                    <WithTable  tableData={ threatInfo } config={ CCRecordColumns }  />
                    <WithPagination total={ threatTotal } 
                                    current={ threatReq.page }
                                    onChange={ this.paginationCcChange }
                                    limit={ limit } />
                  </Spin>
                </Tabs.TabPane>
              </Tabs>
              
            </div>
          ])
        }
      </div>
    )
  }
}

const WHOIS = ({whoisInfo, relationUrl,  relationUrlColumns, relationFile, relationFileColumns, relationIP,
                relationIPColumns, relationDomain, relationDomainColumns  }) => 
  <div>
    <div style={{ marginTop:20, width:500  }} >
    <h4>攻击者域名whois信息</h4>
    <Whois data={ whoisInfo } />
    </div>

    <div style={{ marginTop:20, width:500  }} >
    <h4>关联URL信息</h4>
    <WithTable  tableData={ relationUrl } config={ relationUrlColumns }  />
    </div>

    <div style={{ marginTop:20, width:500  }} >
    <h4>关联文件信息</h4>
    <WithTable  tableData={ relationFile} config={ relationFileColumns }  />
    </div>

    <div style={{ marginTop:20, width:500  }} >
    <h4>关联IP信息</h4>
    <WithTable  tableData={ relationIP} config={ relationIPColumns }  />
    </div>

    <div style={{ marginTop:20, width:500 }} >
    <h4>关联域名信息</h4>
    <WithTable  tableData={ relationDomain } config={ relationDomainColumns }  />
    </div>
  </div>


export default AnalyseDetail