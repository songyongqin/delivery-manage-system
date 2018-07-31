

import React, { Component } from 'react'
import Rank from '../Rank'
import Count from '../Count'
import moment from 'moment'
import Charts from '../Charts'
import ModalContent from '../ModalContent'
import { Modal } from 'antd'

const css = require('./index.less')

interface props {
  timestampRange: Array<number>
}

interface state{
  modal: {
    value: string
    visible: boolean,
  }
}

const transform = num => moment(num).format('YYYY-MM-DD')

const getStr = timestampRange => {

  if(!timestampRange.length){
     return '全部'
    }
  else {
    let str = transform(timestampRange[0])
    let str1 = transform(timestampRange[1])
    return `${str} 到 ${str1}`
  }

}

class Pages extends Component<props,state>{
  constructor(props){
    super(props)
    this.state={
      modal:{
        value:'',
        visible:false,
      }
    }
  }


  getClick = value =>{
    this.setState({ modal: { value, visible:true } })
  }

  hideModal = () => {
    this.setState({ modal:{ value:'', visible:false} })
  }
  

  render(){
    
    const { timestampRange } = this.props
    const { modal } = this.state
    let str = getStr(timestampRange)
    return(
      <div  >
        <div style={{ textAlign:'center' }} >
          <h2  >威胁报告</h2>
          <div>统计日期：{str}</div>
          
        </div>
        <div className={ css.container } >
        <Count  timestampRange={ timestampRange } 
                key={ timestampRange[0] + timestampRange[1]+'count' } />
        <Charts timestampRange={ timestampRange } 
                key={ timestampRange[0] + timestampRange[1]+'echarts'}
                getClick={ this.getClick } />
        <Modal  visible={ modal.visible }
                destroyOnClose
                onCancel = { this.hideModal } 
                onOk = { this.hideModal }
                footer = { null }
                width={ 1200 } >
          <ModalContent timestampRange={ timestampRange } type={ modal.value } />
        </Modal>
        <Rank   timestampRange={ timestampRange } 
                key={ timestampRange[0] + timestampRange[1]+'rank'} />
        </div>
      </div>
    )
  }
}

export default Pages