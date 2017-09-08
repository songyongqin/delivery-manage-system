/**
 * Created by jojo on 2017/9/8.
 */
import React from 'react';
import {Switch,Row,Col,Icon,Button} from 'antd';
import JoTag from '../../../components/JoTag';
import classnames from 'classnames';
import styles from './LimitPanel.css';
import JoSpin from '../../../components/JoSpin/JoSpin';


import {
  limitPanelTextConfig,
  limitRowDataIndexes,
  IS_OPEN_VALUE,
  IS_NOT_OPEN_VALUE
} from '../ConstConfig';

export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      ...props.data.limit
    }
  }
  getSwitchOnChange=(type)=>{
    return (value)=>{
      this.setState({
        [type]:value?IS_OPEN_VALUE:IS_NOT_OPEN_VALUE
      })
    }
  }
  submitHandle=()=>{
    const {onSubmit,data}=this.props;

    return onSubmit&&onSubmit({
      userAccount:data.userAccount,
      limit:{
        ...this.state.limit
      }
    })

  }
  render=()=>{
    const {isDark,data={},loading}=this.props;
    const titleClasses=classnames({
      ["secondary-title"]:true,
      ["secondary-title-dark"]:isDark,
      [styles["title"]]:true,
    })

    const panelClasses=classnames({
      [styles["panel"]]:true,
      [styles["panel-dark"]]:isDark
    })

    return (
      <div className={panelClasses}>
          <Row>
            <Col>
              <h2 className={titleClasses}>
                {limitPanelTextConfig.basic.title}
              </h2>
              <table className={styles["table"]}>
                <tbody>
                <tr>
                  <td>
                    {limitPanelTextConfig.basic.rows.userAccount}
                  </td>
                  <td>
                    <JoTag color="#108ee9">{data.userAccount}</JoTag>
                  </td>
                </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className={titleClasses}>
                {limitPanelTextConfig.threat.title}
              </h2>
              <table className={styles["table"]}>
                <tbody>
                {
                  limitRowDataIndexes.map(k=>{
                    return (
                      <tr key={k}>
                        <td>
                          {limitPanelTextConfig.threat.rows[k]}
                        </td>
                        <td>
                          <Switch onChange={this.getSwitchOnChange(k)}
                                  disabled={loading}
                                  checked={this.state[k]===IS_OPEN_VALUE}
                                  checkedChildren={<Icon type="check" />}
                                  unCheckedChildren={<Icon type="cross" />} />
                        </td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </Col>
          </Row>
          <Row style={{marginTop:"30px"}}>
            <Col>
              <Button loading={loading}
                      onClick={this.submitHandle}
                      type="primary"
                      size="large"
                      style={{width:"100%"}}>
                保存修改
              </Button>
            </Col>
          </Row>
      </div>
    )
  }
}
