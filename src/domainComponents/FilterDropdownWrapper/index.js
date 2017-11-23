/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import styles from './styles.css';

export default class extends React.Component {
  render() {
    const { style = {} } = this.props;
    return (
      <div className={styles["panel"]} style={style}>
        {this.props.children}
      </div>
    );
  }
}



