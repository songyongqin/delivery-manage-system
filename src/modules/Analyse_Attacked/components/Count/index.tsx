

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKED_COUNT } from 'constants/model'

import Pie from './Pie'
// import CountItem from 'components/CountItem'
// import { Icon } from 'antd'
const css = require('./index.less')

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
      key:0
    }
  }

  componentDidMount(){
    this.getCount()
    // this.setState({ key: +new Date() })
  }


  getCount = () => {
    // console.log(this.props.timestampRange)
    this.props.fetchCount({timestampRange: this.props.timestampRange})
    .then(res => {
      this.setState({
        attackedAssetsCount: res.attackedAssetsCount,
        attackedCountArr: res.attackedCountArr,
        attackedAssetsArr: res.attackedAssetsArr, 
        key: +new Date()
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
          <div style={{ fontSize:18, marginTop:10, marginBottom:10, marginLeft:12 }} >
          {/* <div className={ css.count } > */}
          {/* <CountItem title={'受攻击资产'} count={ attackedAssetsCount } >
            <Icon type={'file-excel'} style={{ fontSize:22 }} />
          </CountItem> */}
            受攻击资产总数<span style={{ color:'#1890ff', marginLeft:20, fontSize:22 }} ><CountUp start={0} end={ attackedAssetsCount } /></span>
          </div>
          <Pie data={ attackedCountArr } title={ '受攻击次数排行统计'} />
          <Pie data={ attackedAssetsArr } title={ '资产状态统计'}  />
        </Spin>
      </div>
    )
  }
}


export default Count
