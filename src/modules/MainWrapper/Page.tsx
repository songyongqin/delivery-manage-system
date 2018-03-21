import * as React from 'react'
import { connect } from 'dva'
import { Button, Icon, Modal, message as Message } from 'antd'
import classnames from 'classnames'
import { Link, withRouter } from 'dva/router'
import { LAYOUT_NAMESPACE, ADMIN_ROLE, ROLE_DATA_INDEX } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import Header from './components/Header'
import Nav from './components/Nav'
import { NAMESPACE } from './ConstConfig'
const styles = require("./styles.less")
import Card from 'domainComponents/Card'
import Spin from 'domainComponents/Spin'
import Breadcrumb from 'domainComponents/Breadcrumb'
import { LOGIN_URL, ROOT_URL } from 'configs/RouteConfig'
import { NAMESPACE as LOGIN_NAMESPACE, DEL_SIGN_ACTION } from 'modules/Login/ConstConfig'
import BuildingHolder from 'domainComponents/BuildingHolder'
import RouteConfig from 'configs/RouteConfig'
import AppConfig from 'configs/AppConfig'
import ModifyPasswordForm from './components/ModifyPassword'
import { MODIFY_PASSWORD_ACTION } from 'modules/Login/ConstConfig'
import { createDispatchWithPromise, createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'

interface Props {

}

interface State {

}


const mapStateToProps = state => {
  return {
    navMini: state[LAYOUT_NAMESPACE].navMini,
    initRoutes: state[NAMESPACE].initRoutes,
    modifyPasswordLoading: state.loading.effects[`${LOGIN_NAMESPACE}/${MODIFY_PASSWORD_ACTION}`]
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
      type: `${LOGIN_NAMESPACE}/${DEL_SIGN_ACTION}`,
      payload
    }),
    modifyPassword: payload => dispatch({
      type: `${LOGIN_NAMESPACE}/${MODIFY_PASSWORD_ACTION}`,
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
      modifyPasswordLoading
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

    if (activeRoute === LOGIN_URL) {
      return (
        <div className={pageClasses}>
          <Spin full={true} spinning={moduleLoading}></Spin>
          {children}
        </div>
      )
    }

    const activeRouteConfig = RouteConfig.find(i => i.link === activeRoute) || { building: true },
      activeRouteBuilding = activeRouteConfig.building,
      isAdmin = userData[ROLE_DATA_INDEX] === ADMIN_ROLE

    return (
      <div className={pageClasses}>
        <Header
          theme={theme}
          mini={navMini}
          title={AppConfig.title}
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
        {/* <Modal
          footer={null}
          onCancel={this.hideModifyPassword}
          visible={this.state.modifyPasswordVisible}
          title={<span><Icon type="user"></Icon>&nbsp;修改密码</span>}>
          <ModifyPasswordForm
            loading={modifyPasswordLoading}
            onSubmit={this.modifyPassword}>
          </ModifyPasswordForm>
        </Modal> */}
      </div>
    )
  }
}




export default IndexPage