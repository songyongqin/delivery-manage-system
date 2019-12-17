

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { Button ,Tag, Input } from 'antd'
import { getInitTimeMonent } from 'utils/getInitTime'
import Pages from './compoents/Pages'
// import html2canvas from 'html2canvas'
// import * as html2canvas from './compoents/html2canvs'
// import { download } from 'utils'
import downloadjs from 'downloadjs'
import moment from 'moment'
import jspdf from 'jspdf';
import extraConnect from 'domainUtils/extraConnect'

import html2pdf from 'html2pdf.js'

// import './compoents/html2canvas.min.js'
const h2c = require('./compoents/html2canvas.min.js')

const mapStateProps = state => {
  return {
      mini: state.layout.navMini,
      state
    }
}

@extraConnect(mapStateProps)
class ThreatReport extends Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      timestampRange:getInitTimeMonent(props),
      countKey:0,
      isLoading: false,
    }
  }

  componentDidMount(){
    // console.log(h2c.html2canvas)
  }

  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    this.setState({  countKey: +new Date() , timestampRange })
  }

  getTrans = ()=> {
    let str = document.getElementById('xx')['value']
    try{
      let arr  = str.split('/').map(i => +i )
      if(arr.length!==2){
        return [0,0]
      }
      else return arr
    }
    catch(err){
      return [0, 0]
    }
    
  }

  export = () => {
      let isFirFox = true
      try {
        isFirFox = !!(window['navigator']['userAgent'].toLowerCase().indexOf('firefox')!==-1)
      }
      catch(err){
      }
  
      let time = this.getTimeStr()
      const name = `威胁报告(${time}).pdf`
      let opt = {
        filename:     name,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a2', orientation: 'portrait' }
      }
      if(!isFirFox){
        opt['margin'] = 20
      }
      let dom = document.getElementById('threat-report')
      console.log(dom)
      this.setState({ isLoading: true })
      html2pdf()
      .from(dom)
      .set(opt)
      .save()
      .then(res =>{
        this.setState({ isLoading: false })
      } )
      .catch(err => {
        this.setState({ isLoading: false })
        console.error('err',err)} 
      )
  }
  getTimeStr =() => {
    let  timestampRange = this.state.timestampRange
    if(!timestampRange.length){
      let timestr = moment().format('YYYY-MM-DD')
     return `${timestr} 到 ${timestr}`
    }
    else {
      return moment(timestampRange[0]).format('YYYY-MM-DD')  + `  到  ` + moment(timestampRange[1]).format('YYYY-MM-DD')
    }
  }

  render(){
    const { timestampRange,isLoading } = this.state
    return(
      <div style={{ position: "relative",   margin:'0 auto', padding:0, maxWidth:1300 }} >
        <div style={{ float: "right", position:'absolute', right:10 }}>
          <DateRangePicker
            value={timestampRange}
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
          <Button type={ 'primary' } style={{ marginLeft: 20 }} onClick={ this.export } loading={ isLoading } >导出</Button>
        </div>
        <div id='threat-report' style={{  fontVariant: 'normal',margin:0, padding:0 }} >
          <Pages timestampRange={ timestampRange }  />
        </div>
      </div>
    )
  }
}


export default ThreatReport