/**
 * Created by jojo on 2017/8/21.
 */


import React,{PropTypes} from 'react';
import loadingButton from './loading-button'
import classes from 'classnames'
import styles from './AysncButton.css';
const scripts=`
 <script type="text/template" id="circular-loading">
        <svg width="120px" height="120px">
          <path class="outer-path" stroke="#fff" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"></path>
          <path class="inner-path" stroke="rgba(255, 255, 255, 0.5)" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"></path>
          <path class="success-path" stroke="#fff" d="M 60 10 A 50 50 0 0 1 91 21 L 75 45 L 55 75 L 45 65"></path>
          <path class="error-path" stroke="#fff" d="M 60 10 A 50 50 0 0 1 95 25 L 45 75"></path>
          <path class="error-path2" stroke="#fff" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45"></path>
        </svg>
      </script>
      <script type="text/template" id="circle-loading">
        <svg width="120px" height="120px">
          <circle r="50" cx="60" cy="60" fill="none" stroke="rgba(255, 255, 255, 0.3)"></circle>
          <circle r="30" cx="60" cy="60" fill="none" stroke="rgba(255, 255, 255, 0.3)"></circle>
          <path class="outer-path" stroke="#fff" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"></path>
          <path class="inner-path" stroke="#fff" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"></path>
          <path class="success-path" stroke="#fff" d="M 60 10 A 50 50 0 0 0 16 36  L 45 65 L 55 75 L 75 45"></path>
          <path class="error-path" stroke="#fff" d="M 60 10 A 50 50 0 0 0 25 95 L 75 45"></path>
          <path class="error-path2" stroke="#fff" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45"></path>
        </svg>
      </script>
      <script type="text/template" id="infinity-loading">
        <svg width="120px" height="60px">
          <path class="infinity-path" stroke="#fff" d="M 30 10 a 20 20 0 1 0 0 40 c 20 0 40 -40 60 -40 a 20 20 0 0 1 0 40 c -20 0 -40 -40 -60 -40"></path>
          <path class="success-path" stroke="#fff" d="M 30 10 C 15 10 35 25 45 35 L 55 45 L 75 15"></path>
          <path class="error-path" stroke="#fff" d="M 30 10 a 20 20 0 1 0 0 40 Q 40 50 45 45 L 75 15"></path>
          <path class="error-path2" stroke="#fff" d="M 30 10 Q 40 10 45 15 L 75 45"></path>
        </svg>
      </script>`



function circularLoading(button){
  let options = {
      svg: '#circular-loading',
      paths: [
        {selector: '.outer-path', animation: outerAnimation},
        {selector: '.inner-path', animation: innerAnimation}
      ]
    },
    loading = new loadingButton(button, options);

  function outerAnimation(segment){
    var self = this;
    segment.draw('15%', '25%', 0.2, {callback: function(){
      segment.draw('75%', '150%', 0.3, {circular:true, callback: function(){
        segment.draw('70%', '75%', 0.3, {circular:true, callback: function(){
          segment.draw('100%', '100% + 0.1', 0.4, {circular:true, callback: function(){
            self.completed(true);
          }});
        }});
      }});
    }});
  }

  function innerAnimation(segment){
    segment.draw('20%', '80%', 0.6, {callback: function(){
      segment.draw('100%', '100% + 0.1', 0.6, {circular:true});
    }});
  }


  return loading;
}




function initStatic() {
  if(document.getElementById("svg-btn-static")){
    return;
  }
  let con=document.createElement("div");
  con.id="svg-btn-static";
  con.style.display="none";
  con.innerHTML=scripts;
  document.body.appendChild(con);
}

initStatic();
/*
* 通过 status 通知按钮状态 init/loading/success/fail
*
* */

class AsyncButton extends React.Component{
  static PropTypes={
    status:PropTypes.string,
    autoInit:PropTypes.bool,
    placement:PropTypes.string,
  }
  constructor(props) {
    super(props);
  }
  componentDidMount=()=>{
    this.loading=circularLoading(this.target);
    this.loading.reset();
    this.statusHandle();
  }
  statusHandle=()=>{
    const {status}=this.props;
    const {loading}=this;
    if(status==="init"){
      loading.reset();
    }
    if(status==="loading"){
      loading.startLoading();
    }
    if(status==="success"){
      loading.triggerSuccess();
    }
    if(status==="fail"){
      loading.triggerFail();
    }
  }
  componentDidUpdate=()=>{
    this.statusHandle();
  }
  onClickHandle=()=>{
    if(this.target.disabled){
      return;
    }
    this.props.onClick&&this.props.onClick();
  }
  render=()=>{
    const {className,style={},children,onClick,placement="top"}=this.props;

    const classnames=classes({
      [styles["loading-button"]]:true,
      [styles["circle-loading"]]:true,
      [styles[placement]]:true,
      [styles["jo-btn"]]:true,
      [className]:true,

    })


    return (

    <button className={classnames}
            style={style}
            onClick={this.onClickHandle}
            ref={target=>this.target=target}>
      {children}</button>

    )
  }
}


export default AsyncButton;
