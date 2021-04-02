import * as React from 'react'
import { connect } from 'dva'
import { LAYOUT_NAMESPACE, DOMAIN_USER_NAMESPACE } from 'constants/model'

const ADMIN_ROLE = 1

const mapStateToProps = (state, ownProps) => {
  return {
    state,
    theme: ownProps.theme || state[LAYOUT_NAMESPACE].theme,
    userData: state[DOMAIN_USER_NAMESPACE].userData,
    login: state[DOMAIN_USER_NAMESPACE].isLogin,
    admin: state[DOMAIN_USER_NAMESPACE].userData["role"] === ADMIN_ROLE,
  }
}

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)