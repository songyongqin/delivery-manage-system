/**
 * Created by jojo on 2017/8/24.
 */
import React from 'react';
import styles from './styles.css';
import {Icon} from 'antd';
import classnames from 'classnames';
import JoLoadingEffect from '../JoLoadingEffect/index';
export default class JoSpin extends React.Component{
  constructor(props) {
    super(props);
    this.shouldFadeIn=false;
    this.state={
      spinning:props.spinning,
      style:{}
    }
  }
  componentWillReceiveProps=(newProps)=>{
    if(newProps.spinning===true){

      this.setState({
        spinning:newProps.spinning
      })

    }else{
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        this.setState({
          spinning:newProps.spinning
        })
      },500)

    }


    if(this.target.offsetHeight>=500){
      this.setState({
        style:{top:"220px"}
      })
    }



  }
  componentWillUnmount=()=>{
    clearTimeout(this.timer);
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
            <div  style={this.state.style}
                  className={styles["spin-dot"]}>
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
        <div className={spinning?styles["blur"]:""}
             ref={target=>this.target=target}>
          {children}
        </div>
      </div>
    )



  }
}



