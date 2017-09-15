import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Icon,Row,Col,Card,message as Message,Modal} from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import * as tableConfig from './components/TableConfig';
import {tableTextConfig,configPanelTextConfig,createUserPanelTextConfig} from './ConstConfig';
import {NAMESPACE} from './ConstConfig';
import MaxAuthTimesInput from './components/MaxAuthTimesInput';
import LimitPanel from './components/LimitPanel';
import CreateUserPanel from './components/CreateUserPanel';


function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    putUserConfigLoading:state.loading.effects["userManager/putUserConfig"],
    putUserLoading:state.loading.effects["userManager/putUser"],
    postUserLoading:state.loading.effects["userManager/postUser"]
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
    },
    postUser:(payload)=>{
      return dispatch({
        type:"userManager/postUser",
        payload:{
          ...payload,
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
      createUserVisible:false,
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
  switchCreateUsreModal=()=>{
    this.setState({
      createUserVisible:!this.state.createUserVisible
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
      .then(this.switchModal)
      .then(this.putUserSuccessCallback)
  }
  putUserSuccessCallback=()=>{

    Message.success(configPanelTextConfig.notification)

    this.props.query({
      ...this.props[NAMESPACE].queryFilters,
      current:1
    })
  }
  postUserHandle=(payload)=>{
    return this.props.postUser({
      ...payload,
    })
      .then(this.switchCreateUsreModal)
      .then(this.postUserSuccessCallback)
  }
  postUserSuccessCallback=()=>{

    Message.success(createUserPanelTextConfig.notification)

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

    const titleContent=(
      <div style={{width:"100%",position:"relative"}}>
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
      <Card key="results-panel"
            className={classes}
            title={titleContent}>
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
      <div key={"results-panel"}>
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

    const {queryLoading,putUserLoading,putUserConfigLoading,commonLayout,postUserLoading}=this.props;

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
               style={{top:"180px"}}
               footer={null}
               onCancel={this.switchModal}>
          <LimitPanel data={this.state.activeUser}
                      onSubmit={this.putUserHandle}
                      loading={putUserLoading}
                      isDark={isDark}/>
        </Modal>


        <Modal title={createUserPanelTextConfig.title}
               visible={this.state.createUserVisible}
               key={`create-user-${this.state.createUserVisible}`}
               style={{top:"180px"}}
               className={modalClasses}
               footer={null}
               onCancel={this.switchCreateUsreModal}>
          <CreateUserPanel isDark={isDark}
                           loading={postUserLoading}
                           onSubmit={this.postUserHandle}/>
        </Modal>

      </div>
    )
  }
}

export default Page;
