

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKER_COUNT } from 'constants/model'
// import PieCharts from 'domainComponents/PieCharts/async'
import Pie from './Pie'
const css = require('./index.less')
import {Icon} from 'antd'
import CountItem from 'components/CountItem'

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
      time: 0
    }
  }

  componentDidMount(){
    this.getCount()
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

  render(){
    const { loading } = this.props
    const { attackerCount, attackGroupCount, attackerGroupArr, attackerWhereArr ,time} = this.state
    
    return(
      
      <Spin spinning={ loading } >
        <div className={ css.count } >
          <CountItem title={'攻击者数量'} count={ attackerCount } >
              <Icon type={'user'} style={{ fontSize:22 }} />
          </CountItem>
          <CountItem title={'攻击者组织'} count={ attackGroupCount } >
              <Icon type={'team'} style={{ fontSize:22 }} />
          </CountItem>
        </div>
        <Pie data={ attackerWhereArr } title={ '攻击者所在地统计'}  />
        <Pie data={ attackerGroupArr } title={ '攻击者组织统计'}  />
      </Spin>
      
    )
  }
}


export default Count
