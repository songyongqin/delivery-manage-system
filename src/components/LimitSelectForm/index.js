import { Form, Input, Tooltip, Icon, Cascader, Select } from 'antd';
import React from 'react';
import styles from './styles.css';
const Option = Select.Option;


export default class QueryForm extends React.Component {
  constructor(props){
    super(props);
  }
  onChange=(value)=>{
    this.props.onSubmit&&this.props.onSubmit({limit:parseInt(value)});
  }
  render() {
    const {defaultValue={}, loading=false,textConfig={},style={},isDark}=this.props;
    const {limit=""}=defaultValue;

    return (
      <div style={{width:"220px",...style}}>
          <div className={isDark?styles["txt-dark"]:null}>
            {"每页显示 "}
            <Select onChange={this.onChange}
                    defaultValue={limit+""}
                    style={{width:"80px",display:"inline-block"}}>
              <Option value="5">5</Option>
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
              <Option value="25">25</Option>
              <Option value="30">30</Option>

            </Select>
            {" 条数据"}
          </div>

      </div>
    );
  }
}


