import React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import PieCharts from 'domainComponents/PieCharts/async'
const styles = require('./styles.less')
// import { Col, Row } from 'antd'
// import {  NAMESPACE } from '../../ConstConfig'



const mapStateToProps = state => {
  return{
    state,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    dispatch,
    // getCount: payload => dispatch({
    //   type: `${NAMESPACE}/count`,
    //   payload
    // })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class SourcePie extends React.Component<any,any>{

  state = {
  }

  render(){
    const {data, text} = this.props
    const total = data.reduce((total,i)=>{
      return total += i.value
    },0)
    const link = '#'
    const offset = -5
    console.log(total)
    return (
      <div style={{width:'100%', height: '100%'}}>
        <PieCharts data = {data} titles={{ text, link }}  />
        <div className={styles['total']}>{total}</div>
      </div>
    )
  }
}