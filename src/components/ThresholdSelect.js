/**
 * Created by jojo on 2017/9/12.
 */
import React from 'react';
import classnames from 'classnames';
import {InputNumber,Button,Form,Select} from 'antd';
const Option=Select.Option;

const options=[
  {
    value:40,
    text:"40%"
  },
  {
    value:50,
    text:"50%"
  },
  {
    value:60,
    text:"60%"
  },
  {
    value:70,
    text:"70%"
  },
  {
    value:80,
    text:"80%"
  }
]

export default class extends React.Component {
  handleChange=(value)=>{
    const {onSubmit}=this.props;
    onSubmit&&onSubmit({threshold:parseInt(value)})
  }
  render() {
    const {defaultValue,isDark,loading}=this.props;
    const classes=classnames({
      ["lbl-dark"]:isDark
    })
    return (
      <div className={classes}>
        <span>&nbsp;自动清理磁盘阈值设置&nbsp;</span>
        <Select style={{width:"100px"}}
                disabled={loading}
                defaultValue={defaultValue+""}
                onChange={this.handleChange}>
          {
            options.map(i=>{
              return <Option value={i.value+""} key={i}>
                {i.text}
              </Option>
            })
          }
        </Select>
      </div>
    );
  }
}
