import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button, Icon, Row, Col, message as Message, Modal } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import * as tableConfig from './components/TableConfig/index';
import { tableTextConfig, configPanelTextConfig, createUserPanelTextConfig, limitPanelTextConfig } from './ConstConfig';
import { NAMESPACE } from './ConstConfig';
import MaxAuthTimesInput from './components/MaxAuthTimeInput/index';
import LimitPanel from './components/LimitForm/index';
import UserForm from './components/UserForm/index';
import { WithBreadcrumb } from '../../components/HOSComponents/index'
import IpLimit from '../UserManager_IPLimit/Page';
import * as tools from '../../utils/tools';
import Card from '../../domainComponents/Card';
import QueryForm from './components/QueryForm'

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    putUserConfigLoading: state.loading.effects["userManager/putUserConfig"],
    putUserLoading: state.loading.effects["userManager/putUser"],
    postUserLoading: state.loading.effects["userManager/postUser"]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserConfig: () => {
      return dispatch({
        type: `${NAMESPACE}/getUserConfig`
      })
    },
    putUserConfig: (payload) => {
      return dispatch({
        type: `${NAMESPACE}/putUserConfig`,
        payload: {
          ...payload
        }
      })
    },
    putUser: (payload) => {
      return dispatch({
        type: `${NAMESPACE}/putUser`,
        payload: {
          ...payload
        }
      })
    },
    postUser: (payload) => {
      return dispatch({
        type: `${NAMESPACE}/postUser`,
        payload: {
          ...payload,
        }
      })
    },
    deleteUser: payload => dispatch({
      type: `${NAMESPACE}/deleteUser`,
      payload: {
        ...payload,
      }
    }),
    patchUser: payload => dispatch({
      type: `${NAMESPACE}/patchUser`,
      payload: {
        ...payload,
      }
    })
  }
}


@WithBreadcrumb
@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
})
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      visible: false,
      createUserVisible: false,
    }
  }
  componentDidMount = () => {
    this.props.queryInit();
    this.props.getUserConfig();
  }
  switchModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  switchCreateUsreModal = () => {
    this.setState({
      createUserVisible: !this.state.createUserVisible
    })
  }
  getButtonLimitHandle = (activeUser) => {
    return () => {
      this.setState({
        activeUser,
      })
      this.switchModal();
    }
  }
  onQuery = (payload) => {
    this.props.query({
      ...this.props[NAMESPACE].queryFilters || [],
      ...payload || {},
    });
  };
  pageOnChange = (current) => {
    this.onQuery({ page: current })
  };
  putUserConfig = (value) => {
    this.props.putUserConfig({
      maxAuthTimes: value
    }).then(this.putUserConfigSuccessCallback)

  }
  putUserConfigSuccessCallback = () => {
    Message.success(configPanelTextConfig.notification)
    this.props.getUserConfig();
  }
  getPutUserHandle = (payload) => {
    return () => {
      this.props.putUser({
        ...payload,
      }).then(this.putUserSuccessCallback)

    }
  }
  putUserHandle = (payload) => {
    return this.props.putUser({
      ...payload,
    })
      .then(this.switchModal)
      .then(this.putUserSuccessCallback)
  }
  putUserSuccessCallback = () => {
    Message.success(configPanelTextConfig.notification)
    this.initQuery()
  }
  postUserHandle = (payload) => {
    return this.props.postUser({
      ...payload,
    })
      .then(this.switchCreateUsreModal)
      .then(this.postUserSuccessCallback)
  }
  postUserSuccessCallback = () => {
    Message.success(createUserPanelTextConfig.notification)
    this.initQuery()
  }

  getPatchUserHandle = userAccount => () => this.props.patchUser({
    userAccountList: [userAccount]
  })
    .then(tools.curry(Message.success, "重置成功"))
    .then(this.initQuery)


  getDelUserHandle = userAccount => () => this.props.deleteUser({
    userAccount
  })
    .then(tools.curry(Message.success, "删除成功"))
    .then(this.initQuery)

  initQuery = () => {
    this.onQuery({ page: 1 })
  }
  queryOnSubmit = payload => {
    this.onQuery({ ...payload, page: 1 })
  }
  getResultsPanel = () => {
    const { commonLayout } = this.props;
    const isDark = commonLayout.darkTheme
    const classes = classnames({
      ["expanded-row-dark"]: isDark
    });
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE];
    const titleContent = (
      <div style={{ width: "100%", position: "relative" }}>
        {tableTextConfig.title}
        <Button icon="plus"
          type="primary"
          onClick={this.switchCreateUsreModal}
          className={styles["btn-create"]}>
          添加新用户
        </Button>
      </div>
    );

    return (
      <div key="results-panel">
        <Card className={classes}
          title={titleContent}>
          <QueryForm
            onSubmit={this.queryOnSubmit}
            defaultValue={queryFilters}
            isDark={isDark}>
          </QueryForm>
          {this.getDataResultPanel()}
        </Card>
      </div>
    )
  };
  getConfigPanel = () => {
    const { commonLayout } = this.props;
    const { queryResults, lastReqTime } = this.props[NAMESPACE];

    const classes = classnames({
      ["expanded-row-dark"]: commonLayout.darkTheme
    });

    return (
      <div key={`config-panel`}>
        <Card
          title={configPanelTextConfig.title}
          className={classes}
          style={{ marginBottom: "15px" }}>
          <MaxAuthTimesInput textConfig={{ label: configPanelTextConfig.description }}
            loading={this.props.putUserConfigLoading}
            onSubmit={this.putUserConfig}
            defaultValue={queryResults.maxAuthTimes}
            isDark={commonLayout.darkTheme} />
        </Card>
      </div>
    )
  }
  getDataResultPanel = () => {

    const { commonLayout } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const { getPatchUserHandle, getDelUserHandle } = this;
    const handle = {
      freeze: this.getPutUserHandle,
      limit: this.getButtonLimitHandle,
      getPatchUserHandle,
      getDelUserHandle
    }

    const tableProps = {
      onChange: this.tableOnChange,
      columns: tableConfig.getColumns({ handle }),
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `item-${index}-${lastReqTime}`
        }
      })
    };

    const paginationProps = {
      total: queryResults.total,
      current: queryFilters.page,
      onChange: this.pageOnChange,
      pageSize: queryFilters.limit,
    };

    return (
      <div key={"results-panel"}>
        <EnhanciveTable tableProps={tableProps}
          inverse={true}
          isDark={commonLayout.darkTheme}
          paginationProps={paginationProps} />
      </div>
    )
  };
  getBreadcrumb = () => {
    return (
      <div key="bread-crumb" style={{ margin: "15px 0" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getLimitPanel = () => {
    return (
      <div key="ip-limit" style={{ marginBottom: "15px" }}>
        <IpLimit />
      </div>
    )
  }
  render = () => {

    const pageClasses = classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });

    const { queryLoading, putUserLoading, putUserConfigLoading, commonLayout, postUserLoading } = this.props;

    const isDark = commonLayout.darkTheme;

    const modalClasses = classnames({
      ["modal"]: true,
      ["modal-dark"]: isDark
    });

    return (
      <div className={pageClasses}>
        <JoSpin spinning={queryLoading || putUserLoading || putUserConfigLoading}>
          {this.props.animateRender([
            this.getBreadcrumb(),
            this.getConfigPanel(),
            this.getLimitPanel(),
            this.getResultsPanel(),
          ])}
        </JoSpin>

        <Modal title={limitPanelTextConfig.title}
          visible={this.state.visible}
          key={`user-limit-${this.state.visible}`}
          className={modalClasses}
          footer={null}
          onCancel={this.switchModal}>
          <UserForm isDark={isDark}
            defaultValue={this.state.activeUser}
            isCreate={false}
            loading={putUserLoading}
            onSubmit={this.putUserHandle} />
        </Modal>


        <Modal title={createUserPanelTextConfig.title}
          visible={this.state.createUserVisible}
          key={`create-user-${this.state.createUserVisible}`}
          className={modalClasses}
          footer={null}
          onCancel={this.switchCreateUsreModal}>
          <UserForm isDark={isDark}
            loading={postUserLoading}
            onSubmit={this.postUserHandle} />
        </Modal>

      </div>
    )
  }
}

export default Page;
