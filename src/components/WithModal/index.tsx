import * as React from 'react'


export default (options = {}) => (WrappedComponent): any => class extends React.Component<any, any> {
  state = {
    ...options
  }

  switchModal = (key) => this.setState({
    [key]: !this.state[key]
  })

  createSwitchModal = key => () => this.setState({
    [key]: !this.state[key]
  })

  setModalVisible = (key, value) => this.setState({
    [key]: value
  })

  render() {
    return (
      <WrappedComponent
        switchModal={this.switchModal}
        setModalVisible={this.setModalVisible}
        createSwitchModal={this.createSwitchModal}
        modalVisible={this.state}
        {...this.props} >
      </WrappedComponent>
    )
  }
}


