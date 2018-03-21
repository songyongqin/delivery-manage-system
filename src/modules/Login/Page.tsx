import * as React from 'react'
import { connect } from 'dva'
import { DatePicker, Button } from 'antd'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import {
  NAMESPACE,
  POST_SIGN_ACTION
} from './ConstConfig'
import Spin from 'domainComponents/Spin'
import Card from 'domainComponents/Card'
import BarCharts from 'domainComponents/BarCharts'
import PieCharts from 'domainComponents/PieCharts'
import EmptyHolder from 'domainComponents/EmptyHolder'
import moment from 'moment'
import { Row, Col, Icon, Alert } from 'antd'
const styles = require("./styles.less")
import LoginForm from './components/LoginForm'
import { DARK_THEME, COMMON_SUCCESS_STATUS } from 'configs/ConstConfig'


const mapStateToProps = state => {
  return {
    postSignLoading: state.loading.effects[`${NAMESPACE}/${POST_SIGN_ACTION}`]
  }
}

const mapDispatchToProps = dispatch => ({
  getVerificationCode: payload => dispatch({
    type: `${NAMESPACE}/getVerificationCode`,
    payload
  }),
  postSign: payload => dispatch({
    type: `${NAMESPACE}/${POST_SIGN_ACTION}`,
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
    if (res.status === COMMON_SUCCESS_STATUS) {
      // window.location.reload()
    } else {
      this.setState({
        error: res.message
      })
      this.requestCode()
    }
    return res

  })
  requestCode = () => this.props.getVerificationCode().then(res => {
    if (res.status === COMMON_SUCCESS_STATUS) {
      this.setState({
        verificationCode: res.payload,
      })
    }
  })
  componentDidMount() {
    this.requestCode()
  }
  shakeModal = () => {

    // this.setState({
    //   shouldShakeModal: true
    // });

    // setTimeout(() => {
    //   this.setState({
    //     shouldShakeModal: false
    //   });
    // }, 500);
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
        <div>
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
