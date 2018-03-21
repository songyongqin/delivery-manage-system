import * as React from 'react'
import { connect } from 'dva'
import { LAYOUT_NAMESPACE } from 'constants/model'

const mapStateToProps = state => {
  return {
    initRoutes: state[LAYOUT_NAMESPACE].initRoutes
  }
}

const mapDispatchToProps = dispatch => (
  {
    saveInitRoutes: payload => dispatch({
      type: `${LAYOUT_NAMESPACE}/saveInitRoutes`,
      payload
    })
  }
)

export default (url: string, delay = 500) => WrappedComponent => {

  @connect(mapStateToProps, mapDispatchToProps)
  class ComponentWithRouteInit extends React.Component<any, any> {
    componentDidMount() {
      setTimeout(() => {
        this.props.saveInitRoutes(url)
      }, delay)
    }
    render() {
      return this.props.initRoutes.includes(url)
        ?
        <WrappedComponent {...this.props}></WrappedComponent>
        :
        null
    }
  }

  return ComponentWithRouteInit
}