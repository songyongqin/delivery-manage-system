import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb } from 'antd';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/index'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import {connect} from 'dva';
import classnames from 'classnames';



class Page extends React.Component{
  constructor(props) {
    super(props);

  }

  render=()=>{




    return (
      <div >
        Strategy
      </div>
    )
  }
}

export default Page;
