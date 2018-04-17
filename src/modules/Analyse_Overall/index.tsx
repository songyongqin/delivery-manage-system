import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_OVERALL_SYSTEM_NAMESPACE } from 'constants/model'
import System from './components/System'

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


@extraConnect(mapStateToProps, mapDispatchToProps)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Tabs>
          <Tabs.TabPane tab="系统行为" key="system">
            <System></System>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Page; 
