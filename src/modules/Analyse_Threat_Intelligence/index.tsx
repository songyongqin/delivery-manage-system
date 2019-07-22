import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import CountItem from 'components/CountItem'
import { ANALYSE_THREAT_INTELLIGENCE, LAYOUT_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import { Button, Row, Col, Icon, Dropdown , Menu, Upload, message, Modal, Popconfirm} from 'antd'
import WithPagination from 'components/WithPagination'
import WithTable from 'components/WithTable'
import { MaxDownloadTotal, maxTableExpanded } from './constants'
import AnalysePie from 'components/AnalysePie'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import { uploadFile } from 'utils/fileSplitUpload'
import UploadMenu from './components/UploadMenu'
import DownloadMenu from './components/DownloadMenu'
import ApiConfig from 'services/apiConfig'
import apiConfig from './../../services/apiConfig';
import ThreatIntelligenceForm from './components/ThreatIntelligencForm'
import TimeTag from 'components/TimeTag'
import { download } from 'utils/download'
import transformTimeStamp from 'utils/transformTimeStamp'
import Detail from './components/Detail'
const styles = require('./index.less')
const arrowPng = require('./arrow.png')


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
    }),
    addThreatIntelligence: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/addThreatIntelligence`,
      payload
    }), 
    editThreatIntelligence: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/editThreatIntelligence`,
      payload
    }),
    delThreatIntelligence: payload => dispatch({
      type: `${ANALYSE_THREAT_INTELLIGENCE}/delThreatIntelligence`,
      payload
    })  
  }
}
//初始参数

const initFilter = {
  total:0,
  limit:10,
  page:1,
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
      modalInfo: false,
      downloadTypes: '',
      isNew: true, //是否新增
      submitLoading: false,
      defaultValue: {},
      clicked:[]
    }
  }

  timestampRangeOnChange = obj => {
    let timestampRange = obj.timestampRange
    let filters = { ...this.state.filters, timestampRange }
    let time = this.getNowTime()
    this.setState({ filters })
    this.getThreatCount({timestampRange})
    this.getTable(filters)
  }

  componentDidMount(){
    // this.fetchTable({})
    let timestampRange = this.state.filters.timestampRange
    this.getThreatCount({timestampRange})
    let filters = { ...this.state.filters, timestampRange }
    this.getTable(filters)
  }

  
  getTable = obj => {
    let arg = { ...this.state.filters, ...obj }
    this.props.fetchTable(obj).then(res => {
      const { data=[], total=0 } = res 
      const filters = { ...this.state.filters, total}
      this.setState({data, filters, clicked:[]})
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

  paginationChange = page =>{
    const obj = { ...this.state.filters, page }
    this.setState({ filters: obj })
    this.getTable(obj)
  }

  clearSelect = () => {
    this.setState({ selectedRows:[], selectedRowKeys:[], defaultValue:{} })
  }

  tableSelect = (selectedRowKeys, selectedRows) => {
    let defaultValue = selectedRows&&selectedRows[0]||{}
    this.setState({ selectedRows, selectedRowKeys, defaultValue })
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
      if(res['status']===1){
        message.success("上传完成")
      }
      else{
        message.error(res['message']||"上传失败，重新上传")
      }
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

  hiddenInfoModal = () => {
    this.setState({ modalInfo:false })
  }

  showInfoModal = () => {
    this.setState({ modalInfo:true, isNew: true })
  }

  editInfoModal = () => {
    this.setState({ modalInfo:true, isNew: false })
  }

  onSubmit = arg => {
    let { isNew, selectedRows } = this.state
    this.setState({ submitLoading: true })
    // this.addInfo(arg)
    let fnc = isNew ?  this.props.addThreatIntelligence : this.props.editThreatIntelligence
    let obj = isNew ? arg : { ...arg, id: selectedRows[0].id }

    fnc(obj).then(res => {
      message.success(`${ isNew ?'新增': '修改' }成功`)
      this.getTable({})
      this.setState({ submitLoading: false })
    }).catch(err => {
      message.error(`${ isNew ?'新增': '修改' }失败`)
      this.getTable({})
      this.setState({ submitLoading: false })
    })
  }

  // addInfo = arg => {
  //   this.props.addThreatIntelligence(arg).then(res => {
  //     message.success(`新增成功`)
  //     this.setState({ submitLoading: false })
  //   }).catch(err => {
  //     message.error(`新增失败`)
  //     this.setState({ submitLoading: false })
  //   })
  // }

  delThreatInfo = () => {
    let id = this.state.selectedRows.map(i => i.id).filter(i => i)
    let filters = this.state.filters
    this.props.delThreatIntelligence({id}).then(res => {
    this.getTable(filters)
      message.success('删除成功')
    })
    .catch(err => {
      this.getTable(filters)
      message.error('删除失败')
    })
  }

  getCilck = index => {
    let str = index +''
    let arr = this.state.clicked
    if(arr.indexOf(str)>-1){
      let array = arr.filter(item => item!==str )
      this.setState({ clicked: array })
    }

    else {
      let array = [ ...arr, str ]
      if(array.length> maxTableExpanded ){
        let len = array.length
        array = array.slice(len-maxTableExpanded,len)
      }
      this.setState({ clicked: array })
    }
  }

  render() {
    const { filters, data, threatFamily, intelligenceType, dataSource, selectedRowKeys, modalTip, modalInfo, isNew, selectedRows, submitLoading, defaultValue } = this.state
    const { page, total, limit  } = filters
    // let constants = this.props['config']['constants'] || { }
    const constants = {
      ...this.props['config']['constants'] ,
      selectDetail: this.state.clicked
    }
    
    let columns = this.props.config&&this.props.config.columns ||  []
    columns.map(i => {
      if(i.dataIndex==='intelligenceOccurrenceTime'){
        i.render = text => <TimeTag num={ text } />
      }
      if(i.dataIndex==='detail'){
        i.width=30
        i.render = (text, record, index) => 
        <div style={{  cursor:'pointer' }} onClick={() =>this.getCilck(index)  } >
          <img src={ arrowPng } alt='arrow' style={{ transform: `rotate(${this.state.clicked.indexOf(index+'')>-1 ? '90': '0' }deg)`, width:14, height:14 }} />
        </div>
      }
      return i
    })

    const menu = (
      <UploadMenu uploadFiles={ this.uploadFiles } />)
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <Button type='primary' style={{ marginRight:15 }} icon='plus' onClick={ this.showInfoModal } >添加威胁情报</Button>
          <Popconfirm
            title="是否删除所选威胁情报"
            onConfirm={this.delThreatInfo}
            okText="是"
            cancelText="否"
          >
            <Button type='primary' style={{ marginRight:15 }} disabled={ selectedRows.length===0 } >删除</Button>
          </Popconfirm>
          <Button type='primary' style={{ marginRight:15 }} onClick={ this.editInfoModal } disabled={ selectedRows.length!==1 } >编辑</Button>
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
                    Detail={ Detail  }
                    tableBeforeFetch={ this.tableBeforeFetch } /> 
              <WithPagination current={ page }  total={ total } onChange={ this.paginationChange } limit={ limit } />
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
        <Modal 
          visible={modalInfo} 
          footer={ null }
          title={ isNew ? <div><Icon type="plus" style={{ marginRight:5 }} />添加威胁情报</div> : '编辑威胁情报' }
          destroyOnClose
          onCancel={this.hiddenInfoModal} >
          <ThreatIntelligenceForm defaultValue={defaultValue} onSubmit={ this.onSubmit } submitLoading={ submitLoading } isNew={ isNew } />
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
