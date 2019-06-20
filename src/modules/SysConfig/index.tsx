import React from 'react'
import { Menu, Button, Tabs, Icon, Col, Row } from 'antd'
import {
  RECEIVE_EMAIL_CONFIG_TITLE,
  SEND_CONFIG_TITLE,
  WARN_LCONFIG, 
  NET_CONFIG,
  WHITE_LIST,
  TIME_CONFIG,
} from './ConstConfig';
import WithAnimateRender from 'components/WithAnimateRender'
import classnames from 'classnames'
import EmailReceive from './components/EmailReceive'
import EmailSend from './components/EmailSend'
import NetConfig from './components/NetConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import TimeConfig from './components/TimeConfig'
import WhitList from '../WhiteList'
const styles = require('./index.less')
const TabPane = Tabs.TabPane


const Wrap = props => <div className={ styles.container } >{ props.children }</div>

@WithCommonProps
@WithAnimateRender
class Page extends React.Component<any, any>{
  render() {
    const { admin } = this.props
    return (
      this.props.animateRender([
        <Tabs key="tab"  defaultActiveKey={ WARN_LCONFIG } >
          <TabPane tab={WARN_LCONFIG} key={ WARN_LCONFIG } >
            <Row gutter={ 20 } >
              <Col span={ 12 }  >
                <Wrap>
                  <span><Icon type="mail"></Icon> &nbsp; 接收告警邮箱配置</span>
                  <EmailReceive readonly={!admin} />
                </Wrap>
              </Col>
              <Col span={ 12 }>
                <Wrap>
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
                </Wrap>
              </Col>
            </Row>
          
          </TabPane>
          <TabPane tab={ NET_CONFIG }  key={ NET_CONFIG } >
            <NetConfig  />
          </TabPane>
          <TabPane tab={ WHITE_LIST }  key={ WHITE_LIST } >
            <WhitList  />
          </TabPane>
          <TabPane tab={ TIME_CONFIG }  key={ TIME_CONFIG } >
            <TimeConfig  />
          </TabPane>
        </Tabs>
      ])
    )
  }
}

export default Page

