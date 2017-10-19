/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import {Input,Button,Form} from 'antd';
import styles from './styles.css';
import * as tools from '../../../../utils/tools';

const FormItem = Form.Item;


const getChecker=ipList=>(ip)=>{
  if(!tools.ipReg.test(ip)){
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的IP',
    }
  }

  if (ipList.includes(ip)) {
    return {
      validateStatus: 'error',
      errorMsg: `${ip}已存在`
    };
  }

  return {
    validateStatus: 'success',
    errorMsg: null
  };
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      ip:{
        value:props.defaultValue||""
      }
    };
  };

  onChange = (e) => {
    let value=e.target.value;
    this.setState({
      ip: {
        ...getChecker(this.props.ipList||[])(value),
        value,
      },
    });
  };

  submitHandle=()=>{

    if(this.state.ip.validateStatus==="error"){
      return;
    }
    if(this.props.loading){
      return;
    }
    this.props.onSubmit&&this.props.onSubmit({ip:this.state.ip.value})
  };
  onKeyDown=(e)=>{
    if(e.keyCode===13){
      this.submitHandle();
    }
  };
  render() {
    const ip = this.state.ip;
    const {textConfig={},loading,isDark}=this.props;

    return (
    <div className={styles["panel"]}>
      <Form>
          <span className={isDark?styles["lbl-dark"]:null}
                style={{height:"30px",lineHeight:"30px"}}>
            IP:&nbsp;
          </span>
          <FormItem style={{width:"350px",display:"inline-block"}}
                    validateStatus={ip.validateStatus}
                    help={ip.errorMsg}>
            <Input
              onKeyDown={this.onKeyDown}
              style={{width:"100%"}}
              disabled={loading}
              value={ip.value}
              placeholder={textConfig["placeholder"]}
              onChange={this.onChange}/>
          </FormItem>
          <FormItem style={{width:"calc(100% - 400px)",display:"inline-block"}}>
            <Button type="primary"
                    loading={loading}
                    onClick={this.submitHandle}
                    size="large">确定</Button>
          </FormItem>

      </Form>
    </div>

    );
  }
}



