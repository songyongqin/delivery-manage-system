import * as React from 'react'
import { Icon } from 'antd'

export default (WrappedComponent): any => {
  return class extends React.Component<any, any> {
    state = {
      error: null
    }
    componentDidCatch(error, info) {
      this.setState({
        error: error
      })
    }
    render() {
      const { error } = this.state

      if (error) {
        return <div style={{ fontSize: "20px" }}>
          <Icon type="frown-o"></Icon> 噢！出现了错误！
          <br />
          <span>错误信息：</span>
          <p>
            {error.message}
          </p>
        </div>
      }

      return <WrappedComponent {...this.props}></WrappedComponent>
    }
  }
}