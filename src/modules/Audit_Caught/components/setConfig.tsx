import * as React from 'react'
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class SetInput extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 1,
      units: value.units || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }

  handleUnitsChange = (units) => {

    if (!('value' in this.props)) {
      this.setState({ units });
    }
    this.triggerChange({ units });

  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {

    const state = this.state;
    const { setValue } = this.props;

    return (
      <span>
        <Input
          type="text"
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '50%' }}
        />
        <span>&nbsp;单位</span>

        {setValue == "time"
          ?
          <Select
            value={state.units}
            style={{ width: '20%' }}
            onChange={this.handleUnitsChange}
          >
            <Option value="ss">秒</Option>
            <Option value="mm">分</Option>
          </Select>
          :
          <Select
            value={state.units}
            style={{ width: '20%' }}
            onChange={this.handleUnitsChange}
          >
            <Option value="M">M</Option>
            <Option value="G">G</Option>
          </Select>
        }
      </span>
    );
  }
}
export default SetInput;
