import React from 'react'
import styles from './styles.css'
import { Menu, Button, Tabs } from 'antd'
import {
  RECEIVE_EMAIL_CONFIG_TITLE,
  SEND_CONFIG_TITLE
} from './ConstConfig';
import WithAnimateRender from 'components/WithAnimateRender'
import classnames from 'classnames'
import EmailReceive from './components/EmailReceive'
import EmailSend from './components/EmailSend'
import WithCommonProps from 'domainComponents/WithCommonProps'

const TabPane = Tabs.TabPane

@WithCommonProps
@WithAnimateRender
class Page extends React.Component<any, any>{
  render() {
    const { admin } = this.props
    return (
      this.props.animateRender([
        <Tabs key="tab">
          <TabPane tab={RECEIVE_EMAIL_CONFIG_TITLE} key={"receive-email"} >
            <EmailReceive readonly={!admin} />
          </TabPane>
          {
            admin
              ?
              <TabPane tab={SEND_CONFIG_TITLE} key={"send-email"} >
                <EmailSend />
              </TabPane>
              :
              null
          }
        </Tabs>
      ])
    )
  }
}

export default Page

