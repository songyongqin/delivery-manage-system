import * as React from 'react'
import { connect } from 'dva'
import { DatePicker, Button } from 'antd'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import Spin from 'domainComponents/Spin'
import Card from 'domainComponents/Card'
import BarCharts from 'domainComponents/BarCharts'
import PieCharts from 'domainComponents/PieCharts'
import EmptyHolder from 'domainComponents/EmptyHolder'
import moment from 'moment'
import { Row, Col, Icon, Alert } from 'antd'
const styles = require("./styles.less")
import LoginForm from './components/LoginForm'
import { DOMAIN_USER_NAMESPACE } from 'constants/model'
import { DARK_THEME } from 'constants/theme'
import isSuccess from 'domainUtils/isSuccess'
import { getAppConfig } from 'domain/app'


const mapStateToProps = state => {
  return {
    postSignLoading: state.loading.effects[`${DOMAIN_USER_NAMESPACE}/${"postSign"}`]
  }
}

const mapDispatchToProps = dispatch => ({

  getVerificationCode: payload => dispatch({
    type: `${DOMAIN_USER_NAMESPACE}/getVerificationCode`,
    payload
  }),

  postSign: payload => dispatch({
    type: `${DOMAIN_USER_NAMESPACE}/${"postSign"}`,
    payload
  })

})

@connect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      shouldShakeModal: false,
      verificationCode: ""
    }
  }

  postSign = payload => this.props.postSign(payload).then(res => {
    if (!isSuccess(res)) {
      this.setState({
        error: res.message
      })
      this.requestCode()
    }
    return res
  })

  requestCode = () => this.props.getVerificationCode().then(res => {
    if (isSuccess(res)) {
      this.setState({
        verificationCode: res.payload,
      })
    }
  })
  componentDidMount() {
    this.requestCode()
  }
  shakeModal = () => {
  }
  render() {

    const {
      theme,
      postSignLoading
    } = this.props
    const { shouldShakeModal, error } = this.state
    const loginWrapperClasses = classnames({
      [styles["login-wrapper"]]: true,
      [styles[theme]]: true,
      ["animated"]: true,
      ["headShake"]: shouldShakeModal
    })

    return (
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>
          {(getAppConfig() as any).title}
        </h1>
        <div style={{ width: "340px" }}>
          {
            error
              ?
              <Alert message={error}
                key={`${new Date().getTime()}`}
                style={{ marginBottom: "15px" }}
                showIcon
                type="error"
                closable />
              :
              null
          }
        </div>
        <div className={loginWrapperClasses}>
          <LoginForm
            loading={postSignLoading}
            onSubmit={this.postSign}
            verificationCode={this.state.verificationCode}
            requestCode={this.requestCode}
            isDark={theme === DARK_THEME}>
          </LoginForm>
        </div>
      </div>
    )
  }
}


export default Page;
