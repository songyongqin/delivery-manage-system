import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import CountItem from 'components/CountItem'
import { ANALYSE_THREAT_INTELLIGENCE, LAYOUT_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import { Button, Row, Col, Icon, Dropdown , Menu, Upload, message, Modal} from 'antd'
import WithPagination from 'components/WithPagination'
import WithTable from 'components/WithTable'
import { MaxDownloadTotal } from './constants'
import AnalysePie from 'components/AnalysePie'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import { uploadFile } from 'utils/fileSplitUpload'
import UploadMenu from './components/UploadMenu'
import DownloadMenu from './components/DownloadMenu'
import ApiConfig from 'services/apiConfig'
import apiConfig from './../../services/apiConfig';
import TimeTag from 'components/TimeTag'
import { download } from 'utils/download'
import transformTimeStamp from 'utils/transformTimeStamp'
const styles = require('./index.less')



const mapStateToprops = state => {
  return {
    state,
    countLoading: state.loading.effects[`${ANALYSE_THREAT_INTELLIGENCE}/fetchCount`],
    tableLoading: state.loading.effects[`${ANALYSE_THREAT_INTELLIGENCE}/fetchTable`],
    uploadLoading :state.loading.effects[`${ANALYSE_THREAT_INTELLIGENCE}/postDownload`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetchCount: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/fetchCount`,
      payload
    }),

    fetchTable: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/fetchTable`,
      payload
    }),

    postDownload: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/postDownload`,
      payload
    })
  }
}
//初始参数

const initFilter = {
  total:0,
  limit:10,
  current:1,
}

@WithAnimateRender
@WithTableConfig(path.layoutConfig.analyseThreatIntelligenceTable)
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| [],
        ...initFilter
      },
      dataSource:[],
      intelligenceType:[],
      threatFamily:[],
      data:[],
      selectedRowKeys:[],
      selectedRows:[],
      modalTip: false,
      downloadTypes: ''
    }
  }

  timestampRangeOnChange = obj => {
    let timestampRange = obj.timestampRange
    let filters = { ...this.state.filters, timestampRange }
    let time = this.getNowTime()
    this.setState({ filters })
    this.getThreatCount({timestampRange})
    this.getTable({filters})
  }

  componentDidMount(){
    // this.fetchTable({})
    let timestampRange = this.state.filters.timestampRange
    this.getThreatCount({timestampRange})
    this.getTable({timestampRange})
  }

  
  getTable = obj => {
    this.props.fetchTable(obj).then(res => {
      const { data=[], total=0 } = res 
      const filters = { ...this.state.filters, total}
      this.setState({data, filters})
      this.clearSelect()
    })
  }

  tableBeforeFetch = arg => {
    let filters = { ...this.state.filters, ...arg }
    this.setState({ filters })
    this.getTable(filters)
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

  paginationChange = current =>{
    const obj = { ...this.state.filters, current }
    this.setState({ filters: obj })
    this.getTable(obj)
  }

  clearSelect = () => {
    this.setState({ selectedRows:[], selectedRowKeys:[] })
  }

  tableSelect = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows, selectedRowKeys })
  }

  uploadFiles = arg => {
    let { file, onSuccess, onError, filename, data } = arg
    let body = new FormData();
    body.append('file', file);
    body.append('type', data.types);
    console.log(arg, body.get('file'), filename, data)
    const headers={  }
    const url = apiConfig.http.ANALYSE_THREAT_INTELLINGENCE_UPLOAD
    uploadFile({ body, url,  headers }).then(res => {
      onSuccess()
      message.success("上传完成")
      console.log(res)
    }).catch(err => {
      onError(err);
      message.error("上传失败，重新上传")
    } )
  }

  downloadFile = (types) => {
    let obj = { ...this.state.filters, types, timestampRange: transformTimeStamp(this.state.filters.timestampRange) }
    this.props.postDownload(obj).then(res => {
      let { url=null } = res 
      download(url)
      this.setState({ downloadTypes:'' })
    }).catch(err => {
      this.setState({ downloadTypes:'' })
    })
  }

  beforeDownload = (types:string):void => {
    const { total } = this.state.filters
    if(total>MaxDownloadTotal){
      this.setState({ modalTip:true, downloadTypes: types })
    }
    else {
      this.downloadFile(types)
    }
  }

  continueDownload = () => {
    this.setState({ modalTip:false})
    let types = this.state.downloadTypes
    this.downloadFile(types)
  }

  cancelDownload = () => {
    this.setState({ modalTip:false, downloadTypes: ''})
  }

  render() {
    const { filters, data, threatFamily, intelligenceType, dataSource, selectedRowKeys, modalTip } = this.state
    const { current, total, limit  } = filters
    let constants = this.props['config']['constants'] || { }
    
    let columns = this.props.config&&this.props.config.columns ||  []

    columns.map(i => {
      if(i.dataIndex==='intelligenceOccurrenceTime'){
        i.render = text => <TimeTag num={ text } />
      }
      return i
    })

    const menu = (
      <UploadMenu uploadFiles={ this.uploadFiles } />)
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <Button type='primary' style={{ marginRight:15 }} icon='plus' >添加威胁情报</Button>
          <Button type='primary' style={{ marginRight:15 }} >删除</Button>
          <Button type='primary' style={{ marginRight:15 }} >编辑</Button>
          <Dropdown overlay={menu}>
              <Button type='primary' style={{ marginRight:15 }}  >导入<Icon type="caret-down" /></Button>
          </Dropdown>
          <Dropdown overlay={<DownloadMenu beforeDownload={ this.beforeDownload } />}>
              <Button type='primary' style={{ marginRight:15 }}  >导出<Icon type="caret-down" /></Button>
          </Dropdown>
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
              <WithTable   tableData={ data }
                    constants={ constants }
                    config={ combineColumnsConfig(columns,this.props['config']['columns']) }
                    otherConfig={  { rowSelection: { selectedRowKeys:selectedRowKeys, onChange: this.tableSelect } } }
                    tableBeforeFetch={ this.tableBeforeFetch } /> 
              <WithPagination current={ current }  total={ total } onChange={ this.paginationChange } limit={ limit } />
            </div>
          ])
        }
        <Modal
          visible={modalTip}
          onOk={this.continueDownload}
          onCancel={this.cancelDownload}
        >
          <p>{`导出数据量超过${MaxDownloadTotal}条，导出时间较长，是否确定导出?`}</p>
        </Modal>
      </div>
    )
  }
}

export default Page

interface MenuItemProps {
  uploadFiles: (any:any )=> void;
  types: string,
  text:string,
}

class MenuItem extends React.Component<MenuItemProps,any>{
  render(){
    const { uploadFiles, types, text } = this.props
    return(
      <Menu.Item>
        <Upload  customRequest={ uploadFiles } fileList={[]} data={{ types }}  >
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.65)' }} >
            { text }
          </div>
        </Upload>
      </Menu.Item>
    )
  }
}
