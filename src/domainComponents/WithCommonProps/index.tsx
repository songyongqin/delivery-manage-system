import * as React from 'react'
import { connect } from 'dva'
import { LAYOUT_NAMESPACE, DOMAIN_USER_NAMESPACE } from 'constants/model'

const mapStateToProps = (state, ownProps) => (
  {
    theme: ownProps.theme || state[LAYOUT_NAMESPACE].theme,
    userData: state[DOMAIN_USER_NAMESPACE].userData,
    login: state[DOMAIN_USER_NAMESPACE].isLogin
  }
)

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)