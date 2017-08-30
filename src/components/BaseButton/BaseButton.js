/**
 * Created by jojo on 2017/8/22.
 */
import React from 'react';
import "./waves.css";
import Waves from './waves.js';
import classnames from 'classnames'
import styles from './BaseButton.css';
Waves.init();


export default (WrappedComponent)=>{
  return class extends React.Component{
    constructor(props) {
      super(props);
    }
    render=()=>{
      const {props}=this;
      const {className,type}=props;

      const classes=classnames({
        [className]:true&&className,
        ["waves-effect"]:true,
        ["waves-button"]:true,
        ["waves-light"]:true,
        [styles["base-btn"]]:true,
        [styles["danger-btn"]]:type==="danger",
      })
      const wappedProps={
        ...props,
        className:classes
      }
      return <WrappedComponent {...wappedProps} className={classes}></WrappedComponent>
    }
  }
}
