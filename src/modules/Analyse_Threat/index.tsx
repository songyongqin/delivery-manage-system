import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import CountItem from 'components/CountItem'
import { ANALYSE_THREAT_VIEW, LAYOUT_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Icon ,Tabs, Input, Row, Col } from 'antd'
import WithPagination from 'components/WithPagination'
import ExtraIcon from 'components/Icon'
import FamilyTable from './components/FamilyTable'
import LoopholeTable from './components/LoopholeTable'
import { SelectArr } from './constants'
import tranformParmToObj from 'utils/tranformParmToObj' 
import { limit } from './constants'
import InputSearch from 'components/InputSearch'
import { ThreatFamliy, Bug, Cc  } from 'components/IconSvg'
const styles = require('./index.less')

const bugpng = require('./bug.png')
const ccpng = require('./cc.png')
const familypng = require('./family.png')


const mapStateToprops = state => {
  return {
    state,
    countLoading: state.loading.effects[`${ANALYSE_THREAT_VIEW}/fetchCount`],
    familyLoading: state.loading.effects[`${ANALYSE_THREAT_VIEW}/fetchFamily`],
    loopholeLoading :state.loading.effects[`${ANALYSE_THREAT_VIEW}/fetchLoophole`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetchCount: payload => dispatch({
      type: `${ANALYSE_THREAT_VIEW}/fetchCount`,
      payload
    }),

    fetchFamily: payload => dispatch({
      type: `${ANALYSE_THREAT_VIEW}/fetchFamily`,
      payload
    }),

    fetchLoophole: payload => dispatch({
      type: `${ANALYSE_THREAT_VIEW}/fetchLoophole`,
      payload
    })
  }
}
//初始参数
const initReqloophole = {
  limit:limit,
  // page:1,
  // timestampRange:[],
  loophole:'',
  loopholeTypes:'',
  // searchValue:''
}

const initReqFamily = {
  limit:limit,
  // page:1,
  // timestampRange:[],
  threatFamily:'',
  sampleMD5:'',
  // searchValue:''
}

const getInitSelect =str => {
  if(!str) return SelectArr[0]
  else {
    let obj = tranformParmToObj(str)
    if(obj&&obj['type']==='loophole'){
      return SelectArr[1]
    }
    else return SelectArr[0]
  }
}

@WithAnimateRender
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| []
      },
      // tableData:[],
      // // reqArg: {...initArg},
      // tableKey: '0attacked',
      // countKey: 'oattackercount',
      // total:0,

      familyCount:0,
      loopholeCount:0,
      connectC2Count:0,
      reqFamily:{ ...initReqFamily, searchValue:'',page:1, timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| [] },
      familyTableKey:0,
      reqloophole:{ ...initReqloophole, searchValue:'', page:1, timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| [] },
      loopholeTableKey:0,
      familyTotal:0,
      familyData:[],
      loopholeTotal:0,
      loopholeData:[],
      selected: getInitSelect(props.location.search),
      isFetchLoophole: false ,
      isFetchFamily: false,
      type: props.location
    }
  }

  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    let time = this.getNowTime()
    this.setState({ filters })
    this.getThreatCount({timestampRange})
    if(this.state.selected===SelectArr[0]){
      this.fetchFamilyTable({timestampRange})
      // this.setState({ reqloophole: { ...this.state.reqloophole, timestampRange }, filters })
    }
    else {
      this.fetchLoopholeTable({ timestampRange })
      // this.setState({ reqFamily: { ...this.state.reqFamily, timestampRange }, filters })
    }
  }

  componentDidMount(){
    // this.fetchTable({})
    let timestampRange = this.state.filters.timestampRange
    this.getThreatCount({timestampRange})
    if(this.state.selected===SelectArr[0]){
      this.fetchFamilyTable({})
    }
    else{
      this.fetchLoopholeTable({})
    }
  }

  
  getThreatCount = obj => {
    let timestampRange = obj.timestampRange ? obj.timestampRange : []
    this.props.fetchCount({ timestampRange })
    .then(res => {
      let { familyCount, loopholeCount, connectC2Count } = res
      this.setState({ familyCount, loopholeCount, connectC2Count })
    } )
    .catch(err => console.error(err) )
  }

  getNowTime = () => new Date().getTime()


  fetchFamilyTable = obj => {
    let timestampRange = this.state.filters.timestampRange
    let reqFamily = { ...this.state.reqFamily, timestampRange, ...obj }
    this.props.fetchFamily(reqFamily)
    .then( res => {
      let { total, data } = res
      this.setState({ familyTotal: total, familyData: data, reqFamily, isFetchFamily: true })
    })
    .catch( err => console.error(err)  )
  }

  familyPaginationOnchange = (page) => {
    this.fetchFamilyTable({ page })
  }

  fetchLoopholeTable = obj => {
    let timestampRange = this.state.filters.timestampRange
    let reqloophole = { ...this.state.reqloophole, timestampRange, ...obj }
    
    this.props.fetchLoophole(reqloophole)
    .then( res => {
      let { total, data } = res
      this.setState({ loopholeTotal: total, loopholeData: data, reqloophole , isFetchLoophole:true })
    })
    .catch( err => console.error(err)  )
  }

  loopholePaginationOnchange = (page) => {
    this.fetchLoopholeTable({ page })
  }

  getSelectValue = value => {
    this.setState({ selected: value  })
    if(!this.state.isFetchLoophole){
      this.fetchLoopholeTable({})
    }
    if(!this.state.isFetchFamily){
      this.fetchFamilyTable({})
    }
  }


  getSearchValue =e => {
    let searchValue = e.target.value
    if(this.state.selected===SelectArr[0]){
      let reqFamily = { ...this.state.reqFamily, searchValue  }
      this.setState({ reqFamily })
    }
    else {
      let reqloophole = { ...this.state.reqloophole, searchValue  }
      this.setState({ reqloophole })
    }
  }


  reset = () => {
    let time = this.getNowTime()
    let selected = this.state.selected
    if(selected===SelectArr[0]){
      
      let reqFamily = { ...this.state.reqFamily, ...initReqFamily, page:1  }
      this.setState({ reqFamily,familyTableKey: time })
      this.fetchFamilyTable(reqFamily)
    }
    else {
      
      let reqloophole = { ...this.state.reqloophole,...initReqloophole, page:1  }
      this.setState({ reqloophole,loopholeTableKey: time })
      this.fetchLoopholeTable(reqloophole)
    }
    // if(selected===SelectArr[0]){
    //   this.setState({ familyTableKey: time })
    // }
    // else {
    //   this.setState({ loopholeTableKey: time })
    // }
  }



  searchEnter = () => {
    if(this.state.selected===SelectArr[0]){
      this.fetchFamilyTable({page:1})
    }
    else {
      this.fetchLoopholeTable({page:1})
    }
  }

  render() {

    const { filters, familyData , familyTotal,  familyCount, loopholeCount, connectC2Count, selected, loopholeData, loopholeTotal } = this.state
    
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <InputSearch searchEnter={ this.searchEnter } onChange={ this.getSearchValue } value={ selected===SelectArr[0] ? this.state.reqFamily.searchValue: this.state.reqloophole.searchValue }   />
          <DateRangePicker
            value={filters.timestampRange}
            key={ +new Date() }
            global
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <Row key='analyse-threat-count' >
            {/* 统计数据 */} 
              <Col span={ 6 }  style={{ height:125 }} >
                <CountItem title={'威胁家族'} count={ familyCount } >
                  {/* <ThreatFamliy /> */}
                  <img src={ familypng } alt='png' width={ 16 } height={ 16 } />
                </CountItem>
              </Col>
              <Col span={ 6 } push={ 3 }  style={{ height:125 }} >
                <CountItem title={'攻击利用漏洞'} count={ loopholeCount } style={{ }} >
                  {/* <Bug /> */}
                  <img src={ bugpng } alt='png' width={ 18 } height={ 18 } />
                </CountItem>
              </Col>
              <Col span={ 6 } push={6}  style={{ height:125 }} >
                <CountItem title={'关联C&C数'} count={ connectC2Count } style={{}} >
                  {/* <Cc /> */}
                  <img src={ ccpng } alt='png' width={ 14 } height={ 14 } />
                </CountItem>
              </Col>
            </Row>,
            <div key="analyse-threat-table" className={ styles.tabs } >
            <Tabs onChange={ this.getSelectValue } >
                <Tabs.TabPane tab={ SelectArr[0] } key={SelectArr[0]  }  >
                  <Spin spinning={ this.props.familyLoading  }  >
                    <div className={ styles.table } >
                      <FamilyTable  tableData={ familyData }
                                    reset={ this.reset }
                                    timestampRange={ filters.timestampRange }
                                    key={ this.state.familyTableKey } 
                                    tableBeforeFetch={ this.fetchFamilyTable } />
                      <WithPagination total={familyTotal}
                                      limit={ limit }
                                      onChange={ this.familyPaginationOnchange }
                                      current={this.state.reqFamily.page}  />
                    </div>
                  </Spin> 
                </Tabs.TabPane> 
                <Tabs.TabPane tab={ SelectArr[1] } key={SelectArr[1]  }  >
                  <Spin spinning={ this.props.loopholeLoading  } >
                    <div className={ styles.table } >
                      <LoopholeTable  tableData={ loopholeData } 
                                    tableBeforeFetch={ this.fetchLoopholeTable }
                                    timestampRange={ filters.timestampRange }
                                    reset={ this.reset }
                                    key={ this.state.loopholeTableKey } />
                      <WithPagination total={loopholeTotal}
                                      onChange={ this.loopholePaginationOnchange }
                                      limit={ limit }
                                      current={this.state.reqloophole.page}  />
                    </div>
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

export default Page