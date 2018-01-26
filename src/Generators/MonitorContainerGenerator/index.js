import React from 'react';
// import styles from './styles.css'
import { Menu, Button, Breadcrumb, Icon } from 'antd';
import MonitorSettingForm from '../../modules//SysConfig_Monitor/components/MonitorSettingForm'
import { connect } from 'dva';
import {
  MODULE_MONITOR_DATA_INDEX,
  MODULE_LIST_DATA_INDEX,
  REGULAR_VALUE,
  ERROR_VALUE,
} from '../../modules/SysConfig_Monitor/ConstConfig.js'

import {
  NAMESPACE as MAIN_NAMESPACE
} from '../../modules/Main/ConstConfig'

import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import JoSpin from '../../components/JoSpin';
import EnhanciveTable from '../../domainComponents/EnhanciveTable'
import Card from '../../domainComponents/Card'
import styles from './style.css';
import { IDS, NODE } from 'configs/ConstConfig'


export default ({ namespace, title, getColumns }) => {
  function mapStateToProps(state) {
    const { commonLayout } = state.layout;
    const effectLoading = state.loading.effects;
    return {
      commonLayout,
      productType: state.user.productType.type,
      productInfo: state.user.productType,
      moduleMonitorTextConfig: state[MAIN_NAMESPACE].queryResults[MODULE_MONITOR_DATA_INDEX],
      loading: effectLoading[`${namespace}/query`] ||
        effectLoading[`${namespace}/getSetting`] ||
        effectLoading[`${namespace}/putSetting`]
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      getSetting: payload => dispatch({
        type: `${namespace}/getSetting`,
        payload
      }),
      putSetting: payload => dispatch({
        type: `${namespace}/putSetting`,
        payload
      }),
    }
  }

  @queryContainerGenerator({
    namespace,
    mapStateToProps,
    mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
  })
  @WithOnQuery(namespace)
  @WithPageOnChange(namespace)
  @connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
  class Page extends React.Component {
    constructor(props) {
      super(props);

    }
    componentDidMount = () => {
      this.props.getSetting();
      this.props.onQuery();
    }
    onSubmit = values => this.props.putSetting(values).then(() => {
      this.props.getSetting();
      this.props.onQuery();
    });
    render = () => {
      const { commonLayout, moduleMonitorTextConfig, loading, productType } = this.props;
      const { queryResults, lastReqTime, queryFilters } = this.props[namespace];
      const { config, total, data } = queryResults;
      const modules = Object.keys(config[MODULE_LIST_DATA_INDEX])
      const moduleList = modules.filter(i => config[MODULE_LIST_DATA_INDEX][i] === REGULAR_VALUE)
      const checkedAll = moduleList.length === modules.length;
      const defaultValue = {
        ...config,
        [MODULE_LIST_DATA_INDEX]: moduleList,
        checkedAll
      }
      const isDark = commonLayout.darkTheme;

      const tableProps = {
        columns: getColumns({ moduleMonitorTextConfig }),
        dataSource: data.map((i, index) => ({
          ...i,
          key: `${lastReqTime}-${index}-item`
        })),
      }

      const paginationProps = {
        total,
        current: queryFilters.page,
        onChange: this.props.pageOnChange
      }

      return (
        <JoSpin spinning={loading}>
          <div className={styles["flex-wrap"]}>
            <Card style={{ width: "300px" }}
              title={<p> <Icon type="setting"></Icon> 自检周期与模块检测设置</p>}>
              <MonitorSettingForm isDark={isDark}
                key={`${lastReqTime}-form`}
                items={modules}
                loading={productType === NODE || productType === IDS}
                defaultValue={defaultValue}
                onSubmit={this.onSubmit}
                itemTextConfig={moduleMonitorTextConfig} />
            </Card>
            <Card title={<p> <Icon type="file-text"></Icon> 监控记录</p>}
              style={{ marginLeft: "15px", width: "calc(100% - 315px)" }}>
              <EnhanciveTable tableProps={tableProps}
                inverse
                paginationProps={paginationProps} />
            </Card>
          </div>
        </JoSpin>
      )
    }
  }

  return Page;
};


