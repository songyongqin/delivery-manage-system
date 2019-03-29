
import * as React from 'react';
import { Tabs } from 'antd'
import SysLogLogin from '../SystemLog_Login'
import WithAnimateRender from 'components/WithAnimateRender'
import path from 'constants/path'
import WithConfig from 'domainComponents/WithConfig'

const itemArr = [
  { key: '登录日志', Components: SysLogLogin }
]


// @WithAnimateRender
export default class SysLog extends React.Component<any, any>{
  render(){
    return(
      <div>
        <Tabs>
          {
            itemArr.map(I => <Tabs.TabPane key={ I.key } tab={ I.key } ><I.Components {...this.props} /> </Tabs.TabPane> )
          }
          {/* <Tabs.TabPane tab='' ><SysLogLogin /></Tabs.TabPane> */}
        </Tabs>
      </div>
    )
  }
}