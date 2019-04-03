

import React, { Component }  from 'react'
import CountUp from 'react-countup'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import { ANALYSE_ATTACKED_COUNT } from 'constants/model'
import { Col, Row } from 'antd';

import Pie from './Pie'
import CountIcon from 'components/CountItem';
import { AttackAsset, FallAsset } from 'components/IconSvg'

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
        fallAssetCount: res.fallAssetCount||0,
        key: +new Date()
      })
    } )
    .catch(err => console.error(err) )
  }



  render(){
    const { loading } = this.props
    const { attackedCountArr, attackedAssetsArr, attackedAssetsCount, fallAssetCount } = this.state
    return(
      <div>
        <Spin spinning={ loading } >
          <Row>
            <Col span={ 6 } >
              <CountIcon title={ '受攻击资产' } count={ attackedAssetsCount } >
                <AttackAsset />
              </CountIcon>
              <CountIcon title={ '失陷资产' } count={ fallAssetCount } >
                <FallAsset />
              </CountIcon>
            </Col>
            <Col span={ 6 }  push={ 3 } >
              <Pie data={ attackedCountArr } title={ '受攻击次数排行统计'} />
            </Col>
            <Col span={ 6 }  push={ 6 } >
              <Pie data={ attackedAssetsArr } title={ '资产状态统计'}  />
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}


export default Count
