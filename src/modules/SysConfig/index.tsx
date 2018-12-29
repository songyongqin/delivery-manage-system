import React from 'react'
import styles from './styles.css'
import { Menu, Button, Tabs, Icon } from 'antd'
import {
  RECEIVE_EMAIL_CONFIG_TITLE,
  SEND_CONFIG_TITLE,
  WARN_LCONFIG, 
  NET_CONFIG,
  WHITE_LIST,
} from './ConstConfig';
import WithAnimateRender from 'components/WithAnimateRender'
import classnames from 'classnames'
import EmailReceive from './components/EmailReceive'
import EmailSend from './components/EmailSend'
import NetConfig from './components/NetConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WhitList from '../WhiteList'

const TabPane = Tabs.TabPane

@WithCommonProps
@WithAnimateRender
class Page extends React.Component<any, any>{
  render() {
    const { admin } = this.props
    return (
      this.props.animateRender([
        <Tabs key="tab"  defaultActiveKey={ WARN_LCONFIG } >
          <TabPane tab={WARN_LCONFIG} key={ WARN_LCONFIG } >
          <span><Icon type="mail"></Icon> &nbsp; 接收告警邮箱配置</span>
            <EmailReceive readonly={!admin} />
            {
            admin
              ?
              <div>
                <span><Icon type="setting"></Icon> &nbsp;发送告警邮箱配置</span>
                <EmailSend />
              </div>
              :
              null
          }
          </TabPane>
          <TabPane tab={ NET_CONFIG }  key={ NET_CONFIG } >
            <NetConfig  />
          </TabPane>
          <TabPane tab={ WHITE_LIST }  key={ WHITE_LIST } >
            <WhitList  />
          </TabPane>
        </Tabs>
      ])
    )
  }
}

export default Page

