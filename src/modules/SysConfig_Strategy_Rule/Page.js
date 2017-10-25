import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Icon, message as Message } from 'antd';
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents/index'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import { connect } from 'dva';
import classnames from 'classnames';
import EnhanciveTable from '../../domainComponents/EnhanciveTable';
import * as tools from '../../utils/tools';
import * as tableConfig from './components/TableConfig';
import {
  NAMESPACE,
  placeholderTextConfig,
  RULE_PROTOCOLTYPE_DATAINDEX,
  RULE_ID_DATAINDEX,
} from './ConstConfig'
import {
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_KEY_DATAINDEX,
} from '../SysConfig_Strategy_Threatname/ConstConfig'
import QueryForm from '../../components/QueryForm';
import Modal from '../../domainComponents/Modal';
import RuleBasicForm from './components/RuleForm';


const mapStateToProps = state => ({
  [NAMESPACE]: state[NAMESPACE],
  isDark: state.layout.commonLayout.darkTheme,
  putLoading: state.loading.effects[`${NAMESPACE}/put`]
})

const mapDispatchToProps = dispatch => ({
  get: payload => dispatch({
    type: `${NAMESPACE}/query`,
    payload,
  }),
  put: payload => dispatch({
    type: `${NAMESPACE}/put`,
    payload,
  }),
  delete: payload => dispatch({
    type: `${NAMESPACE}/delete`,
    payload,
  }),
  getThreatname: () => dispatch({
    type: `${NAMESPACE}/getThreatname`
  })
})


@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      createVisible: false,
      queryFilters: {
        page: 1,
        limit: 10,
        page: 1,
        [RULE_PROTOCOLTYPE_DATAINDEX]: props[RULE_PROTOCOLTYPE_DATAINDEX],
        value: "",
      },
      queryResults: {
        data: [],
        total: 0,
      },
      threatnames: [],
      activeRule: {}
    }
  }
  componentDidMount = () => {
    this.get();
    this.props.getThreatname().then(result => {
      this.setState({
        threatnames: result.map(i => ({
          text: i[THREAT_NAME_NAME_DATAINDEX],
          value: i[THREAT_NAME_KEY_DATAINDEX]
        }))
      })
    });
  }
  switchModal = () => this.setState({
    createVisible: !this.state.createVisible
  })
  setActiveRule = data => this.setState({
    activeRule: data,
  })
  getModifyOpenHandle = data => () => {
    this.switchModal();
    this.setActiveRule(data);
  }
  get = payload => {
    payload = payload || {};
    let _payload = { ...this.state.queryFilters, ...payload }

    this.setState({
      loading: true,
      queryFilters: _payload
    })

    this.props.get(_payload)
      .then(result => this.setState({
        loading: false,
        queryResults: {
          data: result.data,
          total: result.total
        }
      }))
      .catch(e => {
        this.setState({
          loading: false
        })
      });
  }

  pageOnChange = current => this.get({ page: current })

  onQuery = payload => this.get({ ...payload, page: 1 })

  onConfirmHandle = payload => this.props.put({
    ...this.state.activeRule,
    ...payload,
  })
    .then(this.switchModal)
    .then(this.get)
    .then(tools.curry(Message.success, "修改成功"))

  getDelHandle = id => () => this.props.delete({
    [RULE_ID_DATAINDEX]: id,
  })
    .then(this.get)
    .then(tools.curry(Message.success, "删除成功"))

  render = () => {
    const { loading, queryResults, queryFilters, createVisible, threatnames, activeRule } = this.state;
    const { isDark } = this.props;
    const { data } = queryResults;
    const { getModifyOpenHandle, getDelHandle } = this;
    const tableProps = {
      expandIconAsCell: false,
      size: "small",
      expandIconColumnIndex: -1,
      columns: tableConfig.getColumns({
        getModifyOpenHandle, getDelHandle
      }),
      dataSource: data.map((i, index) => ({
        ...i,
        key: tools.getTableRowKey(index, ""),
      })),

    };

    const paginationProps = {
      total: queryResults.total,
      current: queryFilters.page,
      onChange: this.pageOnChange,
      pageSize: queryFilters.limit,
    };

    return (
      <div >
        <JoSpin spinning={loading}>
          <QueryForm textConfig={{
            placeholder: placeholderTextConfig[queryFilters[RULE_PROTOCOLTYPE_DATAINDEX]]
          }}
            onSubmit={this.onQuery}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "0 8px"
            }} />
          <EnhanciveTable title={null}
            expanded={false}
            tableProps={tableProps}
            paginationProps={paginationProps} />
        </JoSpin>
        <Modal visible={createVisible}
          key={`${createVisible}-modal-visible`}
          onCancel={this.switchModal}
          title={<p><Icon type="edit" />&nbsp;修改特征</p>}
          footer={null}>
          <JoSpin spinning={this.props.putLoading}>
            <RuleBasicForm isDark={isDark}
              isCreate={false}
              loading={this.props.putLoading}
              defaultValue={activeRule}
              threatTypes={threatnames}
              protocolType={this.props[RULE_PROTOCOLTYPE_DATAINDEX]}
              onSubmit={this.onConfirmHandle} />
          </JoSpin>

        </Modal>
      </div>
    )
  }
}

export default Page;
