import * as  React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  Slider,
  Radio,
} from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item

const formItemLayout = {

}


const Label = ({ dataIndex, className = "", textConfig }) => <span className={className}>{textConfig[dataIndex]}</span>


class WrappedForm extends React.Component<any, any> {
  static defaultProps = {
    defaultValue: {},
    rulesConfig: {},
    dataIndexes: [],
    labelTextConfig: {}
  }
  state = {
    loading: false
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form, dataIndexes } = this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }

      dataIndexes.forEach(i => values[i] = values[i].trim())

      this.setState({
        loading: true
      })

      onSubmit && onSubmit(values).then(_ => { }).then(_ => this.setState({ loading: false }))

    })
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const {
      isDark,
      defaultValue,
      rulesConfig,
      dataIndexes,
      labelTextConfig,
      disabled = false,
      btnDisabledTip
    } = this.props

    const { loading } = this.state

    const lblClasses = classnames({
      // [styles["lbl-dark"]]: isDark
    })

    const commonProps = { ...formItemLayout, colon: false, hasFeedback: false, required: false }


    return (
      <Form layout="inline" >
        {
          dataIndexes.map(dataIndex => {

            return (
              <FormItem
                required={false}
                colon={false}
                key={dataIndex}
                label={<Label
                  textConfig={labelTextConfig}
                  dataIndex={dataIndex} />}>
                {
                  getFieldDecorator(
                    dataIndex,
                    {
                      initialValue: defaultValue[dataIndex],
                      rules: rulesConfig[dataIndex],
                    }
                  )
                    (
                    <Input disabled={loading || disabled} />
                    )
                }
              </FormItem>
            )
          })
        }
        <FormItem>
          {
            disabled
              ?
              <Tooltip title={btnDisabledTip} >
                <Button type="primary"
                  disabled={true}
                  icon="save"
                  onClick={this.handleSubmit}>保存</Button>
              </Tooltip>
              :
              <Button type="primary"
                loading={loading}
                disabled={disabled}
                icon="save"
                onClick={this.handleSubmit}>保存</Button>
          }
        </FormItem>
      </Form>
    );
  }
}

const CommonForm: any = Form.create()(WrappedForm)

export default CommonForm