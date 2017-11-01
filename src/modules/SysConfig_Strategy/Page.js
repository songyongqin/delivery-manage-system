import React from 'react';
import styles from './styles.css';
import {
  Menu,
  Button,
  Breadcrumb,
  Icon,
  message as Message,
  Popover,
  Tabs
} from 'antd';
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents/index'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import { connect } from 'dva';
import classnames from 'classnames';
import StrategyModule from '../SysConfig_Strategy_Strategy/Page';
import WhiteListModule from '../SysConfig_Strategy_WhiteList/Page';
import {
  NAMESPACE,
} from './ConstConfig'


import * as tools from '../../utils/tools';
import RuleForm from '../SysConfig_Strategy_Rule/components/RuleForm';
import Modal from '../../domainComponents/Modal';

const { curry } = tools;



const mapStateToProps = state => {
  const effectLoading = state.loading.effects;

  return {
    [NAMESPACE]: state[NAMESPACE],
    commonLayout: state.layout.commonLayout,
  }

}

const mapDispatchToProps = dispatch => ({

})



@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  getBreadcrumb = () => {
    return (
      <div key="breadcrumb-panel" style={{ margin: "15px 0" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }

  getContentPanel = () => {
    return (
      <div key="content-panel" style={{ padding: "15px 0" }}>
        <Tabs>
          <Tabs.TabPane key="strategy" tab="策略配置">
            <StrategyModule></StrategyModule>
          </Tabs.TabPane>
          <Tabs.TabPane key="white-list" tab="白名单策略配置">
            <WhiteListModule></WhiteListModule>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
  render() {

    const { commonLayout, postRuleLoading } = this.props;

    const pageClasses = classnames({
      [styles["page-dark"]]: commonLayout.darkTheme
    })

    return (
      <div className={pageClasses}>
        {
          this.props.animateRender([
            this.getBreadcrumb(),
            this.getContentPanel()
          ])
        }
      </div>
    )
  }
}

export default Page;
