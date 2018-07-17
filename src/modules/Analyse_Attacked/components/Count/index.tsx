

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKED_COUNT } from 'constants/model'
// import PieCharts from 'domainComponents/PieCharts/async'
import Pie from './Pie'
import CountIcon from './CountIcon'

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

const Wrap = props => {
  return(
    <div style={{ width:400 }} >{ props.children }</div>
  )
}

@extraConnect(mapStateToProps, mapDispatchToProps)
class Count extends Component<any, any>{
  constructor(props){
    super(props)
    this.state={
      initState: props.init || {},
      attackedAssetsCount: 0,
      attackedCountArr:[{}],
      attackedAssetsArr:[{}],
    }
  }

  componentDidMount(){
    this.getCount()
  }

  getCount = () => {
    this.props.fetchCount()
    .then(res => {
      this.setState({
        attackedAssetsCount: res.attackedAssetsCount,
        attackedCountArr: res.attackedCountArr,
        attackedAssetsArr: res.attackedAssetsArr
      })
    } )
    .catch(err => console.error(err) )
  }

  render(){
    const { loading } = this.props
    const { attackedCountArr, attackedAssetsArr, attackedAssetsCount } = this.state
    return(
      <div>
        <Spin spinning={ loading } >
          <CountIcon title={ '受攻击资产' } count={ attackedAssetsCount } />
          <Pie data={ attackedCountArr } title={ '受攻击次数排行统计'} />
          <Pie data={ attackedAssetsArr } title={ '资产状态统计'} />
        </Spin>
      </div>
    )
  }
}


export default Count
