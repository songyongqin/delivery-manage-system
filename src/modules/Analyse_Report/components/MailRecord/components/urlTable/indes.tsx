import * as React from 'react'
import { connect } from 'dva'
import Tag from 'components/Tag'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
import EnhancedTable from 'domainComponents/EnhancedTable'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import { NAMESPACE_MAIL, } from '../../../../ConstConfig'
import { NAMESPACE, FETCH_DETECTION_OPTION_ACTION, DATA_INDEX, DEFAULT_OPTION_DATA_INDEX, URL_DATA_INDEX, INIT_DETECTION_TASK, POST_URL_DETECTION_ACTION } from '../../../../../Detection/ConstConfig'
import * as detectionModel from '../../../../../Detection/Model'
import * as TableConfig from './TableConfig'
import { Icon, Modal } from 'antd'
import DetectionSettingForm from 'modules/Detection/components/DetectionSettingForm'
@WithCommonProps
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      limit: 10,
      page: 1,

      visible: false,
      detectionSetting: null,

      optionConfig: [],
      index_url: 0,
    }
  }
  pageChangeHandler = (page) => {
    this.setState({
      page
    })
  }
  getDefaultValues = (optionConfig) => {

    return optionConfig.reduce((finalDefaultValues, item) => {
      finalDefaultValues[item[DATA_INDEX]] = item[DEFAULT_OPTION_DATA_INDEX]
      return finalDefaultValues
    }, {})
  }
  componentWillMount() {
    const { urlList } = this.props.mailMould;
    const { index } = this.props;
    const total = urlList[index].length, data = urlList[index];
    this.setState({
      data,
      total,
    })
    this.props.fetchDetectionOption().then(optionConfig => this.setState({ optionConfig, detectionSetting: this.getDefaultValues(optionConfig) }))

  }
  sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
      var start = x * size;
      var end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  }

  showModal = (index) => {
    this.setState({
      visible: !this.state.visible,
      index_url: index
    })
  }
  onDetectionSubmit = (values) => {
    const { detectionSetting, index_url } = this.state;
    const { index } = this.props;
    const { urlList } = this.props.mailMould;
    const { url } = urlList[index][index_url];
    const finalDetectionSetting = values || this.getDefaultValues(this.state.detectionSetting)
    this.props.postUrlDetection({
      ...finalDetectionSetting,
      [URL_DATA_INDEX]: url
    })
  }
  handleOk = values => {
    this.onDetectionSubmit(values),
      this.showModal(this.state.index_url)
  }

  render() {
    const { urlList } = this.props.mailMould;
    const { index, detectionOptionLoading } = this.props;
    const { total, data, limit, page, visible,
      optionConfig,
      detectionSetting } = this.state;
    const { handleOk, showModal } = this;
    const urlData = this.sliceArray(data, limit);
    const tableProps = {
      columns: TableConfig.getColumns({
        page,
        limit,
        showModal
      }),
      dataSource: urlData[page - 1].map((i, index) => {
        return {
          ...i,
          key: `${index}`
        }
      }),
    }
    const paginationProps = {
      total: total,
      current: page,
      onChange: this.pageChangeHandler,
      pageSize: limit,
    };

    return (
      <div style={{ minHeight: "600px", color: "#A3B2C1" }}>
        <EnhancedTable
          tableProps={tableProps}
          paginationProps={paginationProps}>
        </EnhancedTable>
        <Modal
          title={
            <p style={{ margin: "0" }}>
              <Icon type="setting"></Icon>&nbsp;参数配置
              </p>}
          visible={visible}
          key={index}
          onCancel={showModal}
          footer=""
        >
          {detectionOptionLoading
            ?
            <p style={{ textAlign: "center" }}><Icon type="loading"></Icon></p>
            :
            <DetectionSettingForm
              onSubmit={handleOk}
              optionConfig={optionConfig}
              defaultValue={detectionSetting}
              key={`${detectionOptionLoading}-${visible}-detection-setting-form`}>
            </DetectionSettingForm>
          }

        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    mailMould: state[NAMESPACE_MAIL],
    detectionOptionLoading: state.loading.effects[`${NAMESPACE}/${FETCH_DETECTION_OPTION_ACTION}`],
  }
}
const mapDispatchToProps = dispatch => {
  return {

    fetchDetectionOption: payload => dispatch({
      type: `${NAMESPACE}/${FETCH_DETECTION_OPTION_ACTION}`,
      payload
    }),
    initDetectionTask: payload => dispatch({
      type: `${NAMESPACE}/${INIT_DETECTION_TASK}`,
      payload
    }),
    postUrlDetection: payload => dispatch({
      type: `${NAMESPACE}/${POST_URL_DETECTION_ACTION}`,
      payload
    })
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);