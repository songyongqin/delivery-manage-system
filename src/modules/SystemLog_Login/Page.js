import React from 'react';
import styles from './styles.css';
import JoSpin from '../../components/JoSpin';
import { connect } from 'dva';
import Tablecomponent from './components/TableConfig/index'


class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {


    return (
      <div >
        {< Tablecomponent {...this.props} />}
      </div>
    )
  }
}

export default Page;
