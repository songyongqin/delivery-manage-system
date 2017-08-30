/**
 * Created by jojo on 2017/8/24.
 */
import React from 'react';
import styles from './JoSpin.css';
import {Icon} from 'antd';
import classnames from 'classnames';
import JoLoadingEffect from '../JoLoadingEffect/JoLoadingEffect';
export default class JoSpin extends React.Component{
  constructor(props) {
    super(props);
    this.shouldFadeIn=false;
    this.state={
      spinning:props.spinning,
    }
  }
  componentWillReceiveProps=(newProps)=>{

    if(newProps.spinning===true){
      this.setState({
        spinning:newProps.spinning
      })
    }else{
      setTimeout(()=>{
        this.setState({
          spinning:newProps.spinning
        })
        // this.shouldFadeIn=(newProps.spinning===false)&&(newProps.spinning!=this.props.spinning);

      },500)

    }

  }
  render=()=>{
    const {children,className="",style={}}=this.props;
    const {spinning}=this.state;
    const classes=classnames({
      [className]:true,
      [styles["spin-wrapper"]]:true,
      [styles["spinning"]]:spinning,
      animated:true,
      ["fadeIn"]:this.shouldFadeIn,
    })

      return (
        <div className={classes} style={style}>
          {
            spinning
              ?
              <div className={styles["spin-dot"]}>
                <JoLoadingEffect/>
              </div>
              :
              null
          }
          {
            spinning
            ?
            <div className={styles["spin-cover"]}/>
            :
            null
          }
          <div className={spinning?styles["blur"]:""}>
            {children}
          </div>
        </div>
      )



  }
}



