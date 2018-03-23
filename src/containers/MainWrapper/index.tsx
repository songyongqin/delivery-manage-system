import * as React from 'react'

import classnames from 'classnames'
import { createDispatchWithPromise, createMapDispatchWithPromise } from 'domainUtils/dvaExtraDispatch'

import { connect } from 'dva'
import { Button, Icon, Modal, message as Message } from 'antd'
import { Link, withRouter } from 'dva/router'
import WithCommonProps from 'domainComponents/WithCommonProps'
import Header from './components/Header'
import Nav from './components/Nav'
import ModifyPasswordForm from './components/ModifyPassword'
import Card from 'domainComponents/Card'
import Spin from 'domainComponents/Spin'
import Breadcrumb from 'domainComponents/Breadcrumb'
import BuildingHolder from 'domainComponents/BuildingHolder'
import SecretParse from 'domainComponents/SecretParse'
import Setup from 'modules/Setup'

import { LOGIN_URL, ROOT_URL } from 'routes/config/path'
import { DOMAIN_USER_NAMESPACE, LAYOUT_NAMESPACE } from 'constants/model'
import { ADMIN_ROLE, ROLE_DATA_INDEX } from 'constants/user'
import { SET_UP_NAMESPACE } from 'constants/model'

const styles = require("./styles.less")

interface Props {

}

interface State {

}

const mapStateToProps = state => {
  return {
    navMini: state[LAYOUT_NAMESPACE].navMini,
    initRoutes: state[LAYOUT_NAMESPACE].initRoutes,
    modifyPasswordLoading: state.loading.effects[`${DOMAIN_USER_NAMESPACE}/${"modifyPassword"}`],
    initial: state[SET_UP_NAMESPACE].initial,
    initialError: state[SET_UP_NAMESPACE].initialError
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeNavStatus: payload => dispatch({
      type: `${LAYOUT_NAMESPACE}/changeNavStatus`,
      payload
    }),
    changeTheme: payload => dispatch({
      type: `${LAYOUT_NAMESPACE}/changeTheme`,
      payload,
    }),
    delSign: payload => dispatch({
      type: `${DOMAIN_USER_NAMESPACE}/${"delSign"}`,
      payload
    }),
    modifyPassword: payload => dispatch({
      type: `${DOMAIN_USER_NAMESPACE}/${"modifyPassword"}`,
      payload
    })
  }
}


@withRouter
@WithCommonProps
@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
class IndexPage extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      modifyPasswordVisible: false
    }
  }
  showModifyPassword = () => {
    this.setState({
      modifyPasswordVisible: true
    })
  }
  hideModifyPassword = () => {
    this.setState({
      modifyPasswordVisible: false
    })
  }
  modifyPassword = payload => this.props.modifyPassword(payload)
    .then(() => {
      Message.success("修改成功")
      this.hideModifyPassword()
    })
  render() {

    const {
      dispatch,
      children,
      theme,
      location,
      navMini,
      changeNavStatus,
      initRoutes,
      changeTheme,
      userData,
      login,
      modifyPasswordLoading,
      initial,
      initialError
    } = this.props

    const activeRoute = location.pathname

    const moduleLoading = !initRoutes.includes(activeRoute)

    const pageClasses = classnames({
      [styles["page"]]: true,
      [styles[theme]]: true
    })

    const contentWrapperClasses = classnames({
      [styles["content-wrapper"]]: true,
      [styles["expandable"]]: true,
      [styles["mini"]]: navMini,
      [styles["animate"]]: true,
      [styles["loading"]]: moduleLoading
    })

    if (!initial) {
      return (
        <div className={pageClasses}>
          <Spin full={true} spinning={true}></Spin>
        </div>
      )
    }

    if (initialError) {
      return (
        <div className={pageClasses}>
          <Setup></Setup>
        </div>
      )
    }

    if (activeRoute === LOGIN_URL) {
      return (
        <div className={pageClasses}>
          <Spin full={true} spinning={moduleLoading}></Spin>
          {children}
          <SecretParse></SecretParse>
        </div>
      )
    }

    const activeRouteConfig = { building: false },
      activeRouteBuilding = activeRouteConfig.building,
      isAdmin = userData[ROLE_DATA_INDEX] === ADMIN_ROLE

    return (
      <div className={pageClasses}>
        <Header
          theme={theme}
          mini={navMini}
          title={"title"}
          handle={{ signOut: this.props.delSign, showModifyPassword: this.showModifyPassword }}
          themeOnChange={changeTheme}
          login={login}
          userData={userData}
          onChange={changeNavStatus}>
        </Header>
        <Nav
          active={activeRoute}
          isAdmin={isAdmin}
          theme={theme}
          mini={navMini}>
        </Nav>
        <div
          className={contentWrapperClasses}>
          <Spin spinning={moduleLoading && !activeRouteBuilding}>
          </Spin>
          <Breadcrumb route={activeRoute}></Breadcrumb>
          {
            activeRouteBuilding && activeRoute !== ROOT_URL
              ?
              <BuildingHolder></BuildingHolder>
              :
              children
          }
        </div>
        <Modal
          footer={null}
          onCancel={this.hideModifyPassword}
          visible={this.state.modifyPasswordVisible}
          title={<span><Icon type="user"></Icon>&nbsp;修改密码</span>}>
          <ModifyPasswordForm
            loading={modifyPasswordLoading}
            onSubmit={this.modifyPassword}>
          </ModifyPasswordForm>
        </Modal>
        <SecretParse></SecretParse>
      </div>
    )
  }
}




export default IndexPage