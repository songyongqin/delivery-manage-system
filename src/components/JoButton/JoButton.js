/**
 * Created by jojo on 2017/8/22.
 */
import React from 'react';
import BaseButton from '../BaseButton/BaseButton';

@BaseButton
class JoButton extends React.Component{
  constructor(props) {
    super(props);

  }
  render=()=>{
    return (
      <button {...this.props} />
    )
  }

}


export default JoButton;
