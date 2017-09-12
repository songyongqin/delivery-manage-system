import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Tabs } from 'antd';
import {
  RECEIVE_EMAIL_CONFIG_TITLE,
  SEND_CONFIG_TITLE
} from './ConstConfig';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/HOSComponents'
import {connect} from 'dva';
import classnames from 'classnames';
import EmailReceive from '../EarlyWarning_EmailReceive/Page';
import EmailSend from '../EarlyWarning_EmailSend/Page';

const TabPane = Tabs.TabPane;

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    userData:state.user.userData,
  }
}

@WithBreadcrumb
@WithAnimateRender
@connect(mapStateToProps)
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  getBreadcrumb=()=>{
    return (
      <div key="bread-crumb" style={{margin:"15px 0"}}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getTabsPanel=()=>{

    const {isAdmin}=this.props.userData;

    return (
      <div key="tabs-panel">
        <Tabs>
          <TabPane tab={RECEIVE_EMAIL_CONFIG_TITLE} key={"receive-email"} >
            <EmailReceive isAdmin={isAdmin}/>
          </TabPane>
          {
            isAdmin
            ?
            <TabPane tab={SEND_CONFIG_TITLE} key={"send-email"} >
              <EmailSend/>
            </TabPane>
            :
            null
          }
        </Tabs>
      </div>
    )
  }
  render=()=> {

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:this.props.commonLayout.darkTheme
    })

    return (
      <div className={pageClasses}>
        {
          this.props.animateRender([
            this.getBreadcrumb(),
            this.getTabsPanel(),
          ])
        }
      </div>
    )
  }
}

export default Page;

