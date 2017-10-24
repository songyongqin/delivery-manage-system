import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import classnames from 'classnames';
import {
    MONITOR_PERIOD_DATA_INDEX,
    MODULE_LIST_DATA_INDEX,
    monitorFormTextConfig
} from '../../ConstConfig'

const FormItem = Form.Item;



const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 4
    },
};

@Form.create()
class WrappedForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit, form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return
            }
            onSubmit && onSubmit(values);

        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isDark, loading, defaultValue = {}, style } = this.props;
        return (
            <Form style={{
                width: "560px",
                background: "white",
                padding: "15px 15px 0",
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)",
                ...style
            }}>
                <FormItem {...formItemLayout}>
                    {/* {getFieldDecorator(DISK_PER_DATAINDEX, {
                        initialValue: defaultValue[DISK_PER_DATAINDEX] || 0
                    })(
                        <Slider style={{ width: "100%" }}
                            max={90}
                            marks={marks}
                            disabled={loading} />
                        )} */}
                </FormItem>
                <FormItem
                    style={{
                        width: "60px",
                        display: "inline-block",
                        marginLeft: "40px",
                    }}>
                    <Button type="primary"
                        loading={loading}
                        onClick={this.handleSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

export default WrappedForm;
