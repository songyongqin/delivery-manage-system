import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import CountItem from 'components/CountItem'
import { ANALYSE_THREAT_VIEW } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Icon ,Tag, Input } from 'antd'
import WithPagination from 'components/WithPagination'
import WhichSelect from 'components/WhichSelect'
import ExtraIcon from 'components/Icon'
import FamilyTable from './components/FamilyTable'
import LoopholeTable from './components/LoopholeTable'
import { SelectArr } from './constants'
import tranformParmToObj from 'utils/tranformParmToObj' 




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
  limit:15,
  page:1,
  // timestampRange:[],
  loophole:'',
  loopholeTypes:'',
  // searchValue:''
}

const initReqFamily = {
  limit:15,
  page:1,
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
        timestampRange: []
      },
      // tableData:[],
      // // reqArg: {...initArg},
      // tableKey: '0attacked',
      // countKey: 'oattackercount',
      // total:0,

      familyCount:0,
      loopholeCount:0,
      connectC2Count:0,
      reqFamily:{ ...initReqFamily, searchValue:'' },
      familyTableKey:0,
      reqloophole:{ ...initReqloophole, searchValue:'' },
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
    this.getThreatCount({})
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
      this.setState({ reqFamily:{ ...this.state.reqFamily, ...initReqFamily },familyTableKey: time })
    }
    else {
      this.setState({ reqloophole:{ ...this.state.reqloophole,...initReqloophole },loopholeTableKey: time })
    }
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
          <Input.Search placeholder="输入待搜索的值"
                        enterButton
                        onSearch = { this.searchEnter }
                        value = { selected===SelectArr[0] ? this.state.reqFamily.searchValue: this.state.reqloophole.searchValue }
                        onChange = { this.getSearchValue } 
                        style={{ width:240, marginRight:20 }}  />
          <DateRangePicker
            value={filters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key='analyse-threat-count' >
            {/* 统计数据 */} 
              <div style={{ display:'inline-block', margin:30 }} >
                <CountItem title={'威胁家族'} count={ familyCount } >
                  <ExtraIcon type={'eyedropper'} style={{ fontSize:30 }} />
                </CountItem>
              </div>
              <div style={{ display:'inline-block', margin:30 }} >
                <CountItem title={'攻击利用漏洞'} count={ loopholeCount } style={{ backgroundColor:'#4F7ED8' }} >
                  <ExtraIcon type={'bug'} style={{ fontSize:30 }} />
                </CountItem>
              </div>
              <div style={{ display:'inline-block', margin:30 }} >
                <CountItem title={'关联C&C数'} count={ connectC2Count } style={{ backgroundColor:'#92AB4C' }} >
                  <Icon type="file-unknown"  style={{ fontSize:30 }} />
                </CountItem>
              </div>
            </div>,
            <div key="analyse-threat-table">
            <WhichSelect data={ SelectArr } getValue={ this.getSelectValue } init={selected} />
            <button onClick={ this.reset } >重置筛选</button>
            {
              selected===SelectArr[0] ? 
              <Spin spinning={ this.props.familyLoading  } >
                  <FamilyTable  tableData={ familyData }
                                key={ this.state.familyTableKey } 
                                tableBeforeFetch={ this.fetchFamilyTable } />
                  <WithPagination total={familyTotal}
                                  onChange={ this.familyPaginationOnchange }
                                  current={this.state.reqFamily.page}  />
              </Spin> :
              <Spin spinning={ this.props.loopholeLoading  } >
                <LoopholeTable  tableData={ loopholeData } 
                              tableBeforeFetch={ this.fetchLoopholeTable }
                              key={ this.state.loopholeTableKey } />
                <WithPagination total={loopholeTotal}
                                onChange={ this.loopholePaginationOnchange }
                                current={this.state.reqloophole.page}  />
              </Spin>
            }
            
            
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page