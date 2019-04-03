

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKER_COUNT } from 'constants/model'
// import PieCharts from 'domainComponents/PieCharts/async'
import Pie from './Pie'
const css = require('./index.less')
import {Icon, Col, Row } from 'antd'
import CountItem from 'components/CountItem'
import debounce from 'lodash/debounce'
import AnalysePie from 'components/AnalysePie'
import { AttackGroup, Attacker } from 'components/IconSvg'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${ANALYSE_ATTACKER_COUNT}/fetchCount`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchCount: payload => dispatch({
      type: `${ANALYSE_ATTACKER_COUNT}/fetchCount`,
      payload
    })
  }
}


@extraConnect(mapStateToProps, mapDispatchToProps)
class Count extends Component<any, any>{
  constructor(props){
    super(props)
    this.state={
      initState: props.init || {},
      attackerCount: 0,
      attackGroupCount: 0,
      attackerGroupArr:[{}],
      attackerWhereArr:[{}],
      time: 0,
      pieHeight:200
    }
  }

  componentDidMount(){
    this.getCount()
    window.onresize = debounce( this.setHeight, 100 )
  }

  setHeight = () => {
    let innerWidth = window.innerWidth ||1336;
    let pieHeight = (innerWidth - 180-50-60)/280/4*200;
    this.setState({ pieHeight })
  }

  getCount = () => {
    this.props.fetchCount({timestampRange: this.props.timestampRange})
    .then(res => {
      // console.log(this.props.timestampRange)
      this.setState({
        attackerCount: res.attackerCount,
        attackGroupCount: res.attackGroupCount,
        attackerGroupArr: res.attackerGroupArr,
        attackerWhereArr: res.attackerWhereArr,
        time: +new Date(),
      })
    } )
    .catch(err => console.error(err) )
  }

  getWhereSelect = arg => {
    this.props.pieSelect({ searchValue: arg.name })
  }

  getGroupSelect = arg => {
    this.props.pieSelect({ searchValue: arg.name })
  }

  render(){
    const { loading } = this.props
    const { attackerCount, attackGroupCount, attackerGroupArr, attackerWhereArr ,time, pieHeight} = this.state
    const countHeight = (pieHeight-20)/2
    return(
      
      <Spin spinning={ loading } >
        <Row>
            <Col span={ 6 } style={{ height: countHeight }} >
              <CountItem title={ '攻击者数量' } count={ attackerCount } style={{ marginBottom:20 }} >
                <Attacker  />
              </CountItem>
              <CountItem title={ '攻击者组织' } count={ attackGroupCount } >
                <AttackGroup  />
              </CountItem>
            </Col>
            <Col span={ 6 }  push={ 3 }  style={{ height: pieHeight }} >
              <AnalysePie data={ attackerWhereArr } text={ '攻击者所在地统计'} /> 
            </Col>
            <Col span={ 6 }  push={ 6 }  style={{ height: pieHeight }} >
              <AnalysePie data={ attackerGroupArr } text={ '攻击者组织统计'} /> 
            </Col>
          </Row>
      </Spin>
      
    )
  }
}


export default Count
