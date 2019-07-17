import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import CountItem from 'components/CountItem'
import { ANALYSE_THREAT_INTELLIGENCE, LAYOUT_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Icon ,Tabs, Input, Row, Col } from 'antd'
import WithPagination from 'components/WithPagination'
import WithTable from 'components/WithTable'
import tranformParmToObj from 'utils/tranformParmToObj' 
import AnalysePie from 'components/AnalysePie'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'


const styles = require('./index.less')



const mapStateToprops = state => {
  return {
    state,
    countLoading: state.loading.effects[`${ANALYSE_THREAT_INTELLIGENCE}/fetchCount`],
    familyLoading: state.loading.effects[`${ANALYSE_THREAT_INTELLIGENCE}/fetchFamily`],
    loopholeLoading :state.loading.effects[`${ANALYSE_THREAT_INTELLIGENCE}/fetchLoophole`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetchCount: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/fetchCount`,
      payload
    }),

    fetchFamily: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/fetchFamily`,
      payload
    }),

    fetchLoophole: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/fetchLoophole`,
      payload
    })
  }
}
//初始参数

@WithAnimateRender
@WithTableConfig(path.layoutConfig.analyseThreatIntelligenceTable)
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| []
      },

      dataSource:[],
      intelligenceType:[],
      threatFamily:[],
      type: props.location
    }
  }

  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    let time = this.getNowTime()
    this.setState({ filters })
    this.getThreatCount({timestampRange})
    this.getTable({timestampRange})
  }

  componentDidMount(){
    // this.fetchTable({})
    let timestampRange = this.state.filters.timestampRange
    this.getThreatCount({timestampRange})
    this.getTable({timestampRange})
  }

  
  getTable = obj => {

  }

  tableBeforeFetch = obj => {
    this.getTable(obj)
  }

  getThreatCount = obj => {
    let timestampRange = obj.timestampRange ? obj.timestampRange : []
    this.props.fetchCount({ timestampRange })
    .then(res => {
      let {  threatFamily, intelligenceType, dataSource } = res
      this.setState({  threatFamily, intelligenceType, dataSource })
    } )
    .catch(err => console.error(err) )
  }

  getNowTime = () => new Date().getTime()





  render() {
    const { filters,   threatFamily, intelligenceType, dataSource } = this.state
    let constants = this.props['config']['constants'] || { }
    
    let columns = this.props.config&&this.props.config.columns ||  []
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
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
              <Col span={ 6 }  style={{ height:205 }} >
                <AnalysePie data={ threatFamily } text={ '威胁家族统计' }  />
              </Col>
              <Col span={ 6 } push={ 3 }  style={{ height:205 }} >
              <AnalysePie data={ intelligenceType } text={ '情报类型统计' }  />
              </Col>
              <Col span={ 6 } push={6}  style={{ height:205 }} >
              <AnalysePie data={ dataSource } text={ '数据来源统计' }  />
              </Col>
            </Row>,
            <div key="analyse-threat-table" className={ styles.tabs } >
              <WithTable   tableData={ [] }
                    constants={ constants }
                    config={ combineColumnsConfig(columns,this.props['config']['columns']) }
                    tableBeforeFetch={ this.tableBeforeFetch } /> 
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page