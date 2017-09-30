import React from 'react';
import styles from './styles.css'
import {
  Menu,
  Button,
  Card,
  Row,
  Col,
  Badge,
  message as Message,
} from 'antd';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/index'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import {
  NAMESPACE,
  DNS_CONFIG_TITLE,
  DNS_NETWORK_TITLE,
  ADAPTER_LIST_DATAINDEX,
  ADAPTER_NAME_DATAINDEX,
  ADAPTER_STATUS_DATAINDEX,
  ADAPTER_MAC_DATAINDEX,
  adapterStatusTextConfig,
  STATUS_UN_CONNECT,
  STATUS_CONNECT,
} from './ConstConfig'
import {connect} from 'dva';
import NetworkForm from './components/NetworkForm';
import JoSpin from '../../components/JoSpin';
import classnames from 'classnames';

const mapStateToProps=state=>({
  [NAMESPACE]:state[NAMESPACE],
  putLoading:state.loading.effects[`${NAMESPACE}/put`],
  getLoading:state.loading.effects[`${NAMESPACE}/query`],
  commonLayout:state.layout.commonLayout
})

const mapDispatchToProps=dispatch=>({
  get:()=>dispatch({
    type:`${NAMESPACE}/query`
  }),
  put:payload=>dispatch({
    type:`${NAMESPACE}/put`,
    payload,
  })
})


@connect(mapStateToProps,createMapDispatchWithPromise(mapDispatchToProps))
@WithBreadcrumb
@WithAnimateRender
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount=()=>{
    this.props.get();
  }
  getBreadcrumb=()=>{
    return <div key="breadcrumb-panel">
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }

  getPutHandle=mac=>payload=>this.props.put({
    [ADAPTER_MAC_DATAINDEX]:mac,
    ...(payload||{})
  })
    .then(Message.success.call(null,"保存成功"))
    .then(this.props.get.call(this))

  getContentPanel=()=>{

    const {queryResults}=this.props[NAMESPACE],
          {putLoading,getLoading,commonLayout}=this.props,
          isDark=commonLayout.darkTheme;

    const classes=classnames({
      ["card-dark"]:commonLayout.darkTheme
    });

    let titleStyle={fontSize:"16px",marginBottom:"10px"};

    titleStyle=isDark?{...titleStyle,color:"white"}:titleStyle;

    return (
      <div key="content-panel" style={{paddingBottom:"150px"}}>
        <JoSpin spinning={putLoading||getLoading}>
          <Card title={DNS_CONFIG_TITLE} style={{margin:"15px 0"}} className={classes}>


          </Card>
          <Card title={DNS_NETWORK_TITLE} className={classes}>
            {queryResults[ADAPTER_LIST_DATAINDEX].map((i,index)=>(
              <div key={`${index}-adapter`}
                   style={{marginBottom:"20px"}}>
                <h3 style={titleStyle}>
                  {i[ADAPTER_STATUS_DATAINDEX]===STATUS_CONNECT
                    ?
                    <Badge status="success"/>
                    :
                    <Badge status="error"/>}
                  {i[ADAPTER_NAME_DATAINDEX]}
                  {"("}
                  {adapterStatusTextConfig[i[ADAPTER_STATUS_DATAINDEX]]}
                  {")"}
                </h3>
                <NetworkForm isDark={isDark}
                             loading={putLoading}
                             defaultValue={i}
                             onSubmit={this.getPutHandle(i[ADAPTER_MAC_DATAINDEX])}/>
              </div>
            ))}
          </Card>
        </JoSpin>
      </div>
    )
  }
  render=()=>{


    return (
      <div >
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
