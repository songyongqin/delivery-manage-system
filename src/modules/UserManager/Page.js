import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Icon,Row,Col,Card,message as Message,Modal} from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import * as tableConfig from './components/TableConfig';
import {tableTextConfig,configPanelTextConfig} from './ConstConfig';
import {NAMESPACE} from './ConstConfig';
import MaxAuthTimesInput from './components/MaxAuthTimesInput';
import LimitPanel from './components/LimitPanel';

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    putUserConfigLoading:state.loading["userManager/putUserConfig"],
    putUserLoading:state.loading["userManager/putUser"],
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
    putUserConfig:(payload)=>{
      return dispatch({
        type:"userManager/putUserConfig",
        payload:{
          ...payload
        }
      })
    },
    putUser:(payload)=>{
      return dispatch({
        type:"userManager/putUser",
        payload:{
          ...payload
        }
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
    this.state={
      activeUser:null,
      visible:false,
    }
  }
  componentDidMount=()=>{
    this.props.queryInit();
    this.props.getUserConfig();
  }
  switchModal=()=>{
    this.setState({
      visible:!this.state.visible
    })
  }
  getButtonLimitHandle=(activeUser)=>{
    return ()=>{
      this.setState({
        activeUser,
      })
      this.switchModal();
    }
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
      maxAuthTimes:value
    }).then(this.putUserConfigSuccessCallback)

  }
  putUserConfigSuccessCallback=()=>{
    Message.success(configPanelTextConfig.notification)
    this.props.getUserConfig();
  }
  getPutUserHandle=(payload)=>{
    return ()=>{

      this.props.putUser({
        ...payload,
      }).then(this.putUserSuccessCallback)

    }
  }
  putUserHandle=(payload)=>{
    return this.props.putUser({
        ...payload,
      })
      .then(this.putUserSuccessCallback)
      .then(this.switchModal)
  }
  putUserSuccessCallback=()=>{

    Message.success(configPanelTextConfig.notification)

    this.props.query({
      ...this.props[NAMESPACE].queryFilters,
      current:1
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

    const handle={
      freeze:this.getPutUserHandle,
      limit:this.getButtonLimitHandle,
    }

    const tableProps={
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns({handle}),
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

    const {queryLoading,putUserLoading,putUserConfigLoading,commonLayout}=this.props;

    const isDark=commonLayout.darkTheme;

    const modalClasses=classnames({
      ["modal"]:true,
      ["modal-dark"]:isDark
    });

    return (
      <div className={pageClasses}>
        <JoSpin spinning={queryLoading||putUserLoading||putUserConfigLoading}>
          {this.props.animateRender([
            this.getConfigPanel(),
            this.getResultsPanel(),
          ])}
        </JoSpin>

        <Modal title={configPanelTextConfig.title}
               visible={this.state.visible}
               key={`user-limit-${this.state.visible}`}
               className={modalClasses}
               width={340}
               footer={null}
               onCancel={this.switchModal}>
          <LimitPanel data={this.state.activeUser}
                      onSubmit={this.putUserHandle}
                      loading={putUserLoading}
                      isDark={isDark}/>
        </Modal>
      </div>
    )
  }
}

export default Page;
