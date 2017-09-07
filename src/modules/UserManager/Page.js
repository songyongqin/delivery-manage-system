import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge,message as Message} from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import * as tableConfig from './components/TableConfig';
import {tableTextConfig,configPanelTextConfig} from './ConstConfig';
import {NAMESPACE} from './ConstConfig';
import MaxAuthTimesInput from './components/MaxAuthTimesInput';

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    putUserConfigLoading:state.loading["userManager/putUserConfig"]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserConfig:()=>{
      return dispatch({
        type:"userManager/getUserConfig"
      })
    },
    putUserConfig:()=>{
      return dispatch({
        type:"userManager/putUserConfig"
      })
    }
  }
}

@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
  mapDispatchToProps:createMapDispatchWithPromise(mapDispatchToProps)
})
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount=()=>{
    this.props.queryInit();
    this.props.getUserConfig();
  }
  onQuery=(payload)=>{
    this.props.query({
      ...this.props[NAMESPACE].queryFilters||[],
      ...payload||{},
    });
  };
  pageOnChange=(current)=>{
    this.onQuery({page:current})
  };
  putUserConfig=(value)=>{
    this.props.putUserConfig({
      maxAuthTimes:value,
    }).then(result=>{
      this.props.getUserConfig();
      Message.success(configPanelTextConfig.notification)
    })
  }
  getResultsPanel=()=>{
    const {commonLayout}=this.props;

    const classes=classnames({
      ["expanded-row-dark"]:commonLayout.darkTheme
    });

    return (
      <Card key="results-panel"
            className={classes}
            title={tableTextConfig.title}>
        {this.getDataResultPanel()}
      </Card>
    )
  };
  getConfigPanel=()=>{
    const {commonLayout}=this.props;
    const {queryResults,lastReqTime}=this.props[NAMESPACE];

    const classes=classnames({
      ["expanded-row-dark"]:commonLayout.darkTheme
    });

    return (
        <Card key={`config-panel`}
              title={configPanelTextConfig.title}
              className={classes}
              style={{marginBottom:"15px"}}>
          <MaxAuthTimesInput textConfig={{label:configPanelTextConfig.description}}
                             loading={this.props.putUserConfigLoading}
                             onSubmit={this.putUserConfig}
                             deafultValue={queryResults.maxAuthTimes}
                             isDark={commonLayout.darkTheme}/>
        </Card>
    )
  }
  getDataResultPanel=()=>{

    const {commonLayout}=this.props;
    const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;

    const tableProps={
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns(),
      dataSource:data.map((i,index)=>{
        return {
          ...i,
          key:`item-${index}-${lastReqTime}`
        }
      })
    };

    const paginationProps={
      total:queryResults.total,
      current:queryFilters.page,
      onChange:this.pageOnChange,
      pageSize:queryFilters.limit,
    };

    return (
      <div key={"results-panel"+lastReqTime}>
        <EnhanciveTable tableProps={tableProps}
                        inverse={true}
                        isDark={commonLayout.darkTheme}
                        paginationProps={paginationProps}/>
      </div>
    )
  };
  render=()=> {

    const pageClasses=classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });

    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getConfigPanel(),
            this.getResultsPanel(),
          ])}
        </JoSpin>

      </div>
    )
  }
}

export default Page;
