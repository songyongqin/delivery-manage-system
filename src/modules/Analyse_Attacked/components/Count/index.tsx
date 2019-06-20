

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKED_COUNT } from 'constants/model'
import { Col, Row } from 'antd';

import Pie from './Pie'
import CountItem from 'components/CountItem';
import { AttackAsset, FallAsset } from 'components/IconSvg'
import debounce from 'lodash/debounce'
import AnalysePie from 'components/AnalysePie'

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
      fallAssetCount: 0,
      attackedCountArr:[{}],
      attackedAssetsArr:[{}],
      key:0,
      pieHeight: 200,
    }
  }

  componentDidMount(){
    this.getCount()
    window.onresize = debounce( this.setHeight, 100 )
  }

  setHeight= () => {
    let innerWidth = window.innerWidth ||1336;
    let pieHeight = (innerWidth - 180-50-60)/280/4*200;
    this.setState({ pieHeight })
  }

  componentWillUnmount(){
    window.onresize = null
  }

  getCount = () => {
    // console.log(this.props.timestampRange)
    this.props.fetchCount({timestampRange: this.props.timestampRange})
    .then(res => {
      this.setState({
        attackedAssetsCount: res.attackedAssetsCount,
        attackedCountArr: res.attackedCountArr,
        attackedAssetsArr: res.attackedAssetsArr, 
        fallAssetCount: res.fallAssetCount||0,
        key: +new Date()
      })
    } )
    .catch(err => console.error(err) )
  }



  render(){
    const { loading } = this.props
    const { attackedCountArr, attackedAssetsArr, attackedAssetsCount, fallAssetCount, pieHeight } = this.state
    const countHeight = (pieHeight-20)/2
    return(
      <div>
        <Spin spinning={ loading } >
          <Row>
            <Col span={ 6 } style={{ height: countHeight }} >
              <CountItem title={ '受攻击资产' } count={ attackedAssetsCount } style={{ marginBottom:20 }} >
                <div style={{ color: '#D81E06' }} >
                  <AttackAsset />
                </div>
              </CountItem>
              <CountItem title={ '失陷资产' } count={ fallAssetCount }  >
                <div style={{ color: '#F4EA2A' }} >
                  <FallAsset />
                </div>
              </CountItem>
            </Col>
            <Col span={ 6 }  push={ 3 }  style={{ height: pieHeight }} >
              {/* <Pie data={ attackedCountArr } title={ '受攻击次数排行统计'} /> */}
              <AnalysePie data={ attackedCountArr } text={ '受攻击次数排行统计'} /> 
            </Col>
            <Col span={ 6 }  push={ 6 }  style={{ height: pieHeight }} >
              {/* <Pie data={ attackedAssetsArr } title={ '资产状态统计'}  /> */}
              <AnalysePie data={ attackedAssetsArr } text={ '受攻击资产状态分布'} /> 
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}


export default Count
