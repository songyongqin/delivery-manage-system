import * as React from 'react'
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Popover, Icon, Tooltip, message as Message, Modal } from 'antd'
import Spin from 'domainComponents/Spin'
import { connect } from 'dva'
import classnames from 'classnames'
import CreateForm from './components/CreateForm'
import $ from 'jquery'
import {
  NAMESPACE,
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_LEVEL_DATAINDEX,
} from './ConstConfig'
import * as tableConfig from './components/TableConfig'
import Table from 'domainComponents/Table'
import * as tools from 'utils'

/******************************************/

const mapStateToProps = state => {
  const effectLoading = state.loading.effects;

  return {
    [NAMESPACE]: state[NAMESPACE],
    commonLayout: state.layout.commonLayout,
    loading: effectLoading[`${NAMESPACE}/query`] ||
      effectLoading[`${NAMESPACE}/put`] ||
      effectLoading[`${NAMESPACE}/post`] ||
      effectLoading[`${NAMESPACE}/delete`]
  }

}
/******************************************/

const mapDispatchToProps = dispatch => ({
  get: () => dispatch({
    type: `${NAMESPACE}/query`
  }),
  put: payload => dispatch({
    type: `${NAMESPACE}/put`,
    payload,
  }),
  add: payload => dispatch({
    type: `${NAMESPACE}/post`,
    payload
  }),
  del: payload => dispatch({
    type: `${NAMESPACE}/del`,
    payload
  }),
  modify: payload => dispatch({
    type: `${NAMESPACE}/modify`,
    payload
  }),
  delete: payload => dispatch({
    type: `${NAMESPACE}/delete`,
    payload
  }),
})

/******************************************/

@connect(mapStateToProps, mapDispatchToProps)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      createVisible: false,
    }
  }
  /******************************************/
  onCreateHandle = (values) => {
    this.props.add(values)
    this.switchCreatePopover();
  }
  /******************************************/
  switchCreatePopover = () => this.setState({ createVisible: !this.state.createVisible })
  /******************************************/
  componentDidMount() {
    this.props.get()
    this.addScroll()
    addAutoResizeTableScrollHeight(this.addScroll);
  }
  /******************************************/
  componentWillUnmount() {
    removeAutoResizeTableScrollHeight(this.addScroll);
  }
  /******************************************/
  componentDidUpdate() {
    this.addScroll()
  }
  /******************************************/
  addScroll = () => {
    const $target = $(`.ant-table-body`);
    $target.niceScroll({
      cursorborder: "",
      cursorcolor: "#cccccc",
      boxzoom: false,
      autohidemode: true
    });
    $target[0].style.maxHeight = $("#strategy-expand-page")[0].offsetHeight - 160 + "px";
  }
  /******************************************/
  getDelHandle = (index, key) => () => this.props.delete({ index });
  /******************************************/
  getLevelOnChangeHandle = index => value => this.props.modify({ index, [THREAT_NAME_LEVEL_DATAINDEX]: value })
  /******************************************/
  putThreatnameHandle = () => this.props.put()
    .then(_ => Message.success("保存成功"))
    .then(this.props.get)
  /******************************************/
  render() {
    const { commonLayout } = this.props;
    const { queryResults, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const isDark = commonLayout.darkTheme;
    const { getDelHandle, getLevelOnChangeHandle } = this;
    const tableProps = {

      columns: tableConfig.getColumns({ getDelHandle, getLevelOnChangeHandle }),

      dataSource: data.map((i, index) => ({
        ...i,
        key: `item-${index}-${lastReqTime}`
      })),
      scroll: { y: 600 },
      size: "small"
    };


    return (
      <div>
        <Modal visible={this.state.createVisible}
          onCancel={this.switchCreatePopover}
          footer={null}
          title={<p><Icon type="plus" />&nbsp;添加攻击行为</p>}>
          <CreateForm onSubmit={this.onCreateHandle}
            isDark={isDark}
            key={`${this.state.createVisible}-create-form`}
            threatnameList={data.map(i => i[THREAT_NAME_NAME_DATAINDEX])} />
        </Modal>


        <Spin spinning={this.props.loading}>
          <h4 className={classnames({
            [styles["title"]]: true,
            [styles["title-dark"]]: isDark,
          })}>
            <Icon type="setting" /> 威胁等级配置
          </h4>

          <div style={{ marginBottom: "15px" }}>
            <Button type="primary"
              onClick={this.switchCreatePopover}
              icon="plus">
              添加
            </Button>
            <Button type="primary"
              onClick={this.putThreatnameHandle}
              style={{
                marginLeft: "15px"
              }}
              icon="save">
              保存
            </Button>
            <Button
              onClick={this.props.switchExpandPage}
              style={{ float: "right", marginLeft: "10px" }}
              icon="menu-unfold"
              type="primary">
            </Button>
            <Tooltip title="撤销/重新加载" placement="bottomLeft">
              <Button style={{ float: "right" }}
                type="primary"
                onClick={this.props.get}
                icon="reload" />
            </Tooltip>
          </div>

          <Table tableProps={tableProps}
            inverse={true}
            pagination={false} />

        </Spin>
      </div>
    )
  }
}

export default Page;

/******************************************/

function addAutoResizeTableScrollHeight(callback) {
  window.addEventListener("resize", callback)
}

function removeAutoResizeTableScrollHeight(callback) {
  window.removeEventListener("resize", callback)
}
