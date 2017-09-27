/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import {InputNumber,Button,Form} from 'antd';
import styles from './styles.css';
const FormItem = Form.Item;

function validatePrimeNumber(number) {
  if (number>=1) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '必须是大于等于1的正整数',
  };
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      number:{
        value:props.defaultValue||10
      }
    };
  };
  handleNumberChange = (value) => {
    this.setState({
      number: {
        ...validatePrimeNumber(value),
        value,
      },
    });
  };
  submitHandle=()=>{

    if(this.state.number.validateStatus==="error"){
      return;
    }
    this.props.onSubmit&&this.props.onSubmit(this.state.number.value)
  };
  onKeyDown=(e)=>{
    if(e.keyCode===13){
      this.submitHandle();
    }
  };
  render() {
    const number = this.state.number;
    const {textConfig={}}=this.props;
    return (
    <div className={styles["panel"]}>
      <p style={{
        color:"rgba(0, 0, 0, 0.65)",
        textAlign:"justify",
        marginBottom:"3px"
      }}>
        {textConfig["label"]}
      </p>
      <Form>
          <FormItem label=""
                    style={{width:"110px",display:"inline-block"}}
                    validateStatus={number.validateStatus}
                    help={number.errorMsg}>
            <InputNumber
              onKeyDown={this.onKeyDown}
              style={{width:"100%"}}
              precision={0}
              min={1}
              step={10}
              value={number.value}
              placeholder={textConfig["placeholder"]}
              onChange={this.handleNumberChange}/>
          </FormItem>
          <FormItem label=""
                    style={{
                      width:"70px",
                      display:"inline-block",
                      position:"relative",
                      top:"-1px"}}>
            <Button type="primary"
                    onClick={this.submitHandle}
                    style={{width:"100%"}}
                    size="large">确定</Button>
          </FormItem>

      </Form>
    </div>

    );
  }
}



