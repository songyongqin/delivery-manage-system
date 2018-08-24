

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { Button ,Tag, Input } from 'antd'
import { getTodayTime } from 'utils/getInitTime'
import Pages from './compoents/Pages'
import html2canvas from 'html2canvas'
// import { download } from 'utils'
import downloadjs from 'downloadjs'
import moment from 'moment'

import html2pdf from 'html2pdf.js'

class ThreatReport extends Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      timestampRange:getTodayTime()||[],
      countKey:0,
      isLoading: false
    }
  }
  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    this.setState({  countKey: +new Date() , timestampRange })
  }

  export = () => {
    // this.setState({ isLoading: true })
    // html2canvas(document.getElementById('threat-report'))
    // .then(canvas => {
    //   let time = this.getTimeStr()
    //   // const name = `威胁报告(${time}).jpg`
    //   let dataurl = canvas.toDataURL('image/jpeg')
    //   // let dataurl = canvas.toBlob()
    //   this.setState({ isLoading: false })
    //   // downloadjs(dataurl, name, 'image/jpeg')

      
    // //   canvas.toBlob(function(blob) {
    // //     downloadjs(blob, 'xx.pdf', 'application/pdf')
    // // })


    // } )
    // .catch(err => console.error(err) )
    let time = this.getTimeStr()
    const name = `威胁报告(${time}).pdf`
    let opt = {
      margin:       20,
      filename:     name,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
    }
    // html2pdf(document.getElementById('threat-report')).set(opt).save()
    let dom = document.getElementById('threat-report')
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
      return '全部'
    }
    else {
      return moment(timestampRange[0]).format('YYYY-MM-DD') + ' 到 ' + moment(timestampRange[0]).format('YYYY-MM-DD')
    }
  }

  render(){
    const { timestampRange,isLoading } = this.state
    return(
      <div style={{ position: "relative" }} >
        <div style={{ float: "right", position:'absolute', right:10 }}>
          <DateRangePicker
            value={timestampRange}
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
          <Button type={ 'primary' } style={{ marginLeft: 20 }} onClick={ this.export } loading={ isLoading } >导出</Button>
        </div>
        <div id='threat-report'  >
          <Pages timestampRange={ timestampRange }  />
        </div>
      </div>
    )
  }
}


export default ThreatReport