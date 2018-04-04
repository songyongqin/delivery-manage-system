import * as React from 'react'
import styles from './styles.css'
import classnames from 'classnames'
import { Modal, Menu, Button, Icon, Row, Col, message as Message, Switch, Tooltip, notification as Notification } from 'antd'
import Spin from 'domainComponents/Spin'
import Table from 'domainComponents/Table'
import * as tableConfig from './components/TableConfig'
import {
  IS_OPEN,
  IS_NOT_OPEN,
  OPEN_DATAINDEX
} from './ConstConfig';
import * as tools from 'utils/tools'
import Card from 'domainComponents/Card'
import AddIpLimitForm from './components/AddIpLimitForm';
import { ADMIN_ROLE } from 'constants/user'
import { USER_MANAGER_IP_LIMIT_NAMESPACE } from 'constants/model'

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  const effectLoading = state.loading.effects;
  return {
    commonLayout,
    loading: effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/delete`] ||
      effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/put`] ||
      effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/post`]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    delete: payload => dispatch({
      type: `${USER_MANAGER_IP_LIMIT_NAMESPACE}/delete`,
      payload,
    }),
    put: payload => dispatch({
      type: `${USER_MANAGER_IP_LIMIT_NAMESPACE}/put`,
      payload,
    }),
    post: payload => dispatch({
      type: `${USER_MANAGER_IP_LIMIT_NAMESPACE}/post`,
      payload
    })
  }
}


class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeType: null,
    }
  }
  componentDidMount() {
    this.onQuery();
  }

  switchModal = () => this.setState({
    visible: !this.state.visible,
  })

  onQuery = (payload = {}) => {
    this.props.query({
      ...this.props[USER_MANAGER_IP_LIMIT_NAMESPACE].queryFilters || [],
      ...payload,
    });
  }

  getDelHandle = (ip, type) => () => this.props.delete({ ip, type })
    // .then(tools.curry(Message.success, "删除成功"))
    .then(this.onQuery)


  onOpenChange = value => {
    if (value) {
      Notification["warning"]({
        message: '警告',
        description: '该系统仅可在限制的IP范围内登录',
        duration: 5
      })
    }

    this.props.put({
      [OPEN_DATAINDEX]: value ? IS_OPEN : IS_NOT_OPEN
    })
    // .then(tools.curry(Message.success, "修改成功"))

  }


  onPostHandle = payload => this.props.post({ ...payload, type: this.state.activeType })
    // .then(tools.curry(Message.success, "添加成功"))
    .then(this.switchModal)
    .then(this.onQuery)

  setActiveType = role => this.setState({
    activeType: role,
  })

  getOnAddClickHandle = role => () => {
    this.switchModal();
    this.setActiveType(role);
  }
  render() {

    const pageClasses = classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });

    const { commonLayout, loading } = this.props;
    const isDark = commonLayout.darkTheme;
    const { queryResults, lastReqTime } = this.props[USER_MANAGER_IP_LIMIT_NAMESPACE];
    const { data } = queryResults;
    const {
      getOnAddClickHandle,
      getDelHandle,
    } = this;

    const isOpen = queryResults[OPEN_DATAINDEX] === IS_OPEN
    const tableProps = {
      // onChange: this.tableOnChange,
      columns: tableConfig.getColumns({ getDelHandle, getOnAddClickHandle, isOpen: true }),
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `item-${index}-${lastReqTime}`
        }
      })
    };

    const adminData = data.find(i => i.role === "admin")

    const adminIpRange = adminData ? adminData.ipRange : []

    const disabled = adminIpRange.length === 0

    const title = (
      <div><Icon type="filter" />
        &nbsp;限制IP登录范围
        <span style={{ paddingLeft: "15px" }}>
          <Tooltip title={disabled ? "管理员无IP范围设置，无法开启该功能" : null}>
            <Switch checkedChildren={"开"}
              unCheckedChildren={"关"}
              disabled={disabled}
              onChange={this.onOpenChange}
              defaultChecked={isOpen} />
          </Tooltip>
        </span>
      </div>
    )


    return (
      <div className={pageClasses}>
        <Spin spinning={this.props.loading}>
          <Card title={title} key={`${lastReqTime}-card`}>
            <Table tableProps={tableProps}
              inverse={true}
              pagination={false} />
          </Card>
        </Spin>
        <Modal visible={this.state.visible}
          footer={null}
          key={`${this.state.visible}-modal`}
          onCancel={this.switchModal}
          title={<p><Icon type="plus" />&nbsp;添加IP</p>}>
          <AddIpLimitForm isDark={isDark}
            onSubmit={this.onPostHandle}
            loading={loading}
            ipList={(data.find(i => i.role === this.state.activeType) || {}).ipRange} />
        </Modal>
      </div>
    )
  }
}

export default Page
