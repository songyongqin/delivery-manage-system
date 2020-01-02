import * as React from 'react'
const styles = require("./styles.less")
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import {Modal, Form, Input, Button, Select, Icon, DatePicker, message as Message } from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;
import moment from 'moment'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/updateProjectDetail`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateProjectDetail: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/updateProjectDetail`,
      payload
    }),
  }
}
@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class UpdateForm extends React.Component<any, any> {
}
export default Form.create()(UpdateForm)
