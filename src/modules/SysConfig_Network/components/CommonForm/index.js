/**
 * Created by jojo on 2017/9/8.
 */

import React from 'react';

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
} from 'antd';

import styles from './styles.css';
import classnames from 'classnames';


const FormItem = Form.Item;

const formItemLayout = {

};


const Label = ({ dataIndex, className, textConfig }) => <span className={className}>{textConfig[dataIndex]}</span>


const WrappedFormItem = ({
  dataIndex,
  itemProps = {},
  lblClassName,
  getFieldDecorator,
  initialValue = "",
  rules = [],
  labelTextConfig,
  disabled,
  loading }) => (

    <FormItem  {...itemProps}
      label={<Label className={lblClassName}
        textConfig={labelTextConfig}
        dataIndex={dataIndex} />}>
      {
        getFieldDecorator(
          dataIndex,
          {
            initialValue,
            rules,
          }
        )
          (
          <Input disabled={loading || disabled} />
          )
      }
    </FormItem>
  )

@Form.create()
class WrappedForm extends React.Component {
  static defaultProps = {
    defaultValue: {},
    rulesConfig: {},
    dataIndexes: [],
    labelTextConfig: {}
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form, dataIndexes } = this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }

      dataIndexes.forEach(i => values[i] = values[i].trim())


      onSubmit && onSubmit(values);

    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      isDark,
      loading,
      defaultValue,
      rulesConfig,
      dataIndexes,
      labelTextConfig,
      disabled = false,
      btnDisabledTip
    } = this.props;

    const lblClasses = classnames({
      [styles["lbl-dark"]]: isDark
    })

    const commonProps = { ...formItemLayout, colon: false, hasFeedback: false, required: false }


    return (
      <Form layout="inline" style={{ minWidth: "900px" }}>
        {
          dataIndexes.map(i => <WrappedFormItem key={i} {...{
            dataIndex: i,
            itemProps: commonProps,
            lblClassName: lblClasses,
            getFieldDecorator,
            initialValue: defaultValue[i] || "",
            loading,
            rules: rulesConfig[i],
            labelTextConfig,
            disabled
          }} />)
        }
        <FormItem>
          {
            disabled
              ?
              <Tooltip title={btnDisabledTip} >
                <Button type="primary"
                  disabled={true}
                  icon="save"
                  size="large"
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

export default WrappedForm