import React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { Col, Row } from 'antd'
import {  NAMESPACE } from '../../ConstConfig'

const styles = require('./styles.less')
import CountUp from 'react-countup'
import SourcePie from '../SourcePie/index'


const mapStateToProps = state => {
  return{
    state,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    dispatch,
    getCount: payload => dispatch({
      type: `${NAMESPACE}/count`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class Count extends React.Component<any,any>{

  state = {
    fileTotal: 0,
    threatenTotal: 0,
    fileSources: [],
    fileStatistics: []
  }

  componentDidMount() {
    let time = new Date().getTime()
    this.props.getCount({time})
    .then(res => {
      this.setState({...this.state, ...res})
    })
  }

  render(){
    const {fileTotal, threatenTotal, fileSources} = this.state
    return (
      <Row gutter={ 20 } style={{display:'flex'}}>
        <Col span = {4} >
          <div className={styles['colItem']}>
            <div className={styles['fileItem']}>
              <div className={styles['fileicon']}></div>
              <span style={{paddingLeft:10}}>文件总数</span>
            </div>
            <div className = {styles['itemValue']}>
            <CountUp start={0} end={ fileTotal } />
            </div>
          </div>
          <div className={styles['colItem']} style={{marginTop: 20}}>
            <div className={styles['fileItem']}>
              <div className={styles['threatenicon']}></div>
              <span style={{paddingLeft:10}}>威胁文件数</span>
            </div>
            <div className = {styles['itemValue']}>
              <CountUp start={0} end={ threatenTotal } />
            </div>
          </div>
        </Col>
        <Col span = {10} className={styles['chartItem']}>
          <SourcePie data={fileSources} text={ '文件来源统计'} />
        </Col>
        <Col span = {10}>

        </Col>
      </Row>
    )
  }
}