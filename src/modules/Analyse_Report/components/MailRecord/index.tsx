import * as React from 'react'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { connect } from 'dva'
import { Select } from 'antd'
import EnhancedTable from 'domainComponents/EnhancedTable'
import * as tableConfig from './TableConfig';
import { NAMESPACE, NAMESPACE_MAIL, MAIL_FILE_COUNT_DATAINDEX, MAIL_URL_COUNT_INDEX, PAGE_SIZE_RANGE } from '../../ConstConfig'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import WithAnimateRender from 'components/WithAnimateRender'
import Spin from 'domainComponents/Spin'
const Option = Select.Option;
@WithCommonProps
@WithAnimateRender
class Page extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownTheme: false,
      filterDropdownMD5: false,
      filterDropdownReceiver: false,
      filterDropdownSender: false,
      clickValue: "",
      expandedRowIndexes: [],
      expandedRowIndexes_url: []
    }
  }
  changeFileTheme = (e) => {
    this.props.toSave({ emailTheme: e.target.value })
  }
  searchTheme = () => {
    const {
      page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    this.setState({ filterDropdownTheme: false });
    this.props.toFetch({
      page: 1,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    })
  }
  downTheme = (visible) => {
    this.setState({
      filterDropdownTheme: visible,
    });
  }
  onInputChangeMD5 = (e) => {
    this.props.toSave({ fileMd5: e.target.value })
  }
  onSearchMD5 = () => {
    const {

      page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    this.setState({ filterDropdownMD5: false });

    this.props.toFetch({
      page: 1,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    });
  }
  downMD5 = (visible) => {
    this.setState({
      filterDropdownMD5: visible,
    });
  }
  onInputChangeReceiver = (e) => {
    const { receiverAccount } = this.props
    this.props.toSave({ receiverAccount: e.target.value })
  }
  onInputChangeSender = (e) => {
    const { senderAccount } = this.props
    this.props.toSave({ senderAccount: e.target.value })
  }
  onSearchReceiver = () => {
    const {

      page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    this.setState({ filterDropdownReceiver: false })

    this.props.toFetch({
      page: 1,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    });


  }
  onSearchSender = () => {
    const {

      page,
      limit,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    this.setState({ filterDropdownSender: false });

    this.props.toFetch({
      page: 1,
      limit,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    });

  }
  downReceiver = (visible) => {
    this.setState({
      filterDropdownReceiver: visible,
    });
  }
  downSender = (visible) => {
    this.setState({
      filterDropdownSender: visible,
    });
  }

  getExpandRowOnChange = (index, clickValue) => () => {
    if (clickValue == MAIL_URL_COUNT_INDEX) {
      this.setState({ clickValue })
      this.state.expandedRowIndexes_url.includes(index)
        ?
        this.removeExpandedRow_url(index)
        :
        this.addExpandedRow_url(index), this.removeExpandedRow(index)

    }
    else {
      this.setState({ clickValue })
      this.state.expandedRowIndexes.includes(index)
        ?
        this.removeExpandedRow(index)
        :
        this.addExpandedRow(index), this.removeExpandedRow_url(index)
    }
  }
  /***************************************/
  addExpandedRow = index => {
    return this.setState({
      expandedRowIndexes: [...this.state.expandedRowIndexes, index]
    })
  }
  /***************************************/
  removeExpandedRow = index => this.setState({
    expandedRowIndexes: this.state.expandedRowIndexes.filter(i => i !== index)
  })



  /***************************************/
  addExpandedRow_url = index => {
    return this.setState({
      expandedRowIndexes_url: [...this.state.expandedRowIndexes_url, index]
    })
  }
  /***************************************/
  removeExpandedRow_url = index => this.setState({
    expandedRowIndexes_url: this.state.expandedRowIndexes_url.filter(i => i !== index)
  })
  pageChangeHandler = (page) => {
    const {
      limit,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    this.props.toFetch({
      limit,
      page: page,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    })
  }
  handleChange = (value) => {
    this.props.toSave({ limit: value });
    const {
      limit,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    this.props.toFetch({
      limit: value,
      page: 1,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    })

  }
  render() {
    const { expandedRowIndexes, expandedRowIndexes_url, clickValue } = this.state;
    const { filterDropdownTheme, filterDropdownMD5, filterDropdownReceiver, filterDropdownSender } = this.state;
    const { getExpandRowOnChange } = this;
    const {
      changeFileTheme, onInputChangeMD5, onSearchReceiver,
      onSearchSender, searchTheme, onSearchMD5, downTheme, downMD5, downReceiver, downSender, onInputChangeReceiver, onInputChangeSender
    } = this;
    const { threatType, judge, emailTheme, fileMd5, initData, data, page } = this.props;

    const {
      limit,
      total,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
      timestampRange
    } = this.props;
    const tableProps = {
      onChange: (pagination, filters) => {
        const payload = {
          threatType: filters.threatType ? filters.threatType : [],
          judge: filters.judge ? filters.judge : []
        }

        this.props.toSave(payload);
        this.props.toFetch({
          page: 1,
          limit,
          emailTheme,
          fileMd5,
          threatType: filters.threatType ? filters.threatType : [],
          judge: filters.judge ? filters.judge : [],
          senderAccount,
          // senderIp,
          receiverAccount,
          // receiverIp,
          timestampRange
        })
      },
      expandIconAsCell: false,
      expandIconColumnIndex: -1,
      expandedRowKeys: clickValue == MAIL_FILE_COUNT_DATAINDEX ? expandedRowIndexes.map(index => index) : expandedRowIndexes_url.map(index => index),
      columns: tableConfig.getColumns({
        page,
        limit,
        filterDropdownReceiver,
        filterDropdownSender,
        filterDropdownTheme,
        filterDropdownMD5,
        changeFileTheme,
        onInputChangeMD5,
        searchTheme,
        onSearchMD5,
        onSearchReceiver,
        onSearchSender,
        downTheme,
        downMD5,
        downReceiver,
        downSender,
        clickValue,
        threatType,
        judge,
        emailTheme,
        fileMd5,
        getExpandRowOnChange,
        expandedRowIndexes,
        expandedRowIndexes_url,
        onInputChangeReceiver,
        onInputChangeSender,
        senderAccount,
        receiverAccount,
      }),
      dataSource: data.map((i, index) => {
        return ({
          ...i,
          key: index
        })
      }),
      expandedRowRender: clickValue == MAIL_FILE_COUNT_DATAINDEX
        ?
        tableConfig.getExpandedRowRenderer({ expandedRowIndexes, getProtocol: this.props.get })
        :
        tableConfig.getExpandedRowRenderer_url({ expandedRowIndexes_url, getProtocol: this.props.get })
    };
    const paginationProps = {
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };
    return (

      <div style={{ minHeight: "600px", color: "#A3B2C1" }}>

        <span>每页条数：</span>
        <Select defaultValue="30" style={{ width: "100px", margin: "15px" }} onChange={this.handleChange}>
          {
            PAGE_SIZE_RANGE.map((i, index) =>
              <Option value={i} key={i}>{i}</Option>)
          }
        </Select>
        <EnhancedTable
          tableProps={tableProps}
          paginationProps={paginationProps}>
        </EnhancedTable>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { data, limit, emailTheme, fileMd5, threatType, judge, senderAccount, receiverAccount, page, total
  } = state[NAMESPACE_MAIL];
  const { timestampRange } = state[NAMESPACE]
  return {
    data, limit, emailTheme, fileMd5, threatType, judge, senderAccount, receiverAccount, page, total,
    loading: state.loading.effects[`${NAMESPACE_MAIL}/fetch`],
    timestampRange,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toFetch: payload => dispatch({
      type: `${NAMESPACE_MAIL}/fetch`,
      payload,
    }),
    toSave: payload => dispatch({
      type: `${NAMESPACE_MAIL}/save`,
      payload,
    }),
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);
