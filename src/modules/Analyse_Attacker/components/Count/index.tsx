

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKED_COUNT } from 'constants/model'
// import PieCharts from 'domainComponents/PieCharts/async'
import Pie from './Pie'
import CountIcon from './CountIcon'
import {Icon} from 'antd'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${ANALYSE_ATTACKED_COUNT}/fetchCount`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchCount: payload => dispatch({
      type: `${ANALYSE_ATTACKED_COUNT}/fetchCount`,
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
    }
  }

  componentDidMount(){
    this.getCount()
  }

  getCount = () => {
    this.props.fetchCount()
    .then(res => {
      this.setState({
        attackerCount: res.attackerCount,
        attackGroupCount: res.attackGroupCount,
        attackerGroupArr: res.attackerGroupArr,
        attackerWhereArr: res.attackerWhereArr
      })
    } )
    .catch(err => console.error(err) )
  }

  render(){
    const { loading } = this.props
    const { attackerCount, attackGroupCount, attackerGroupArr, attackerWhereArr } = this.state
    return(
      <div>
        <Spin spinning={ loading } >
          <CountIcon title={ '攻击者数量' } count={ attackerCount } style={ { backgroundColor:'#3072E0', color:'white' } } >
            <Icon type="user" />
          </CountIcon>
          <CountIcon title={ '攻击者组织' } count={ attackerCount } style={ { backgroundColor:'#30E03F', color:'white' } } >
            <Icon type="team" />
          </CountIcon>
          <Pie data={ attackerWhereArr } title={ '攻击者所在地统计'} />
          <Pie data={ attackerGroupArr } title={ '攻击者组织统计'} />
        </Spin>
      </div>
    )
  }
}


export default Count
