

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { Button ,Tag, Input } from 'antd'
import { getTodayTime } from 'utils/getInitTime'
import Pages from './compoents/Pages'
import html2canvas from 'html2canvas'
// import { download } from 'utils'
// import downloadjs from 'downloadjs'
import moment from 'moment'
import jspdf from 'jspdf';

// import html2pdf from 'html2pdf.js'

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
    this.setState({ isLoading: true })
    let doms = document.getElementById('threat-report')
    const scale = 2,
      margin= [20, 20],
      type= 'jpeg',
      pageSize = [doms.clientWidth|| 1190.55, doms.clientHeight||1683.78 ]
    html2canvas(doms, { scale })
    .then(canvas => {
      let time = this.getTimeStr()
      const name = `威胁报告(${time}).pdf`
      let dataurl = canvas.toDataURL('image/' + 'jpeg', 0.98)
      console.log(doms.clientWidth)

      img2pdf({ dataurl, type, margin, name, scale, pageSize })
      .then(() => this.setState({ isLoading: false }) )
      .catch(() => this.setState({ isLoading: false }) )

    } )
    .catch(err => console.error(err) )

    //img to pdf
    const img2pdf = ({ dataurl, type, margin=[0,0], name, scale=1, pageSize }) => {
      return new Promise((resolve, reject) => {
        // const a2 = [1190.55, 1683.78];
        const innerPage = [  ]
        let doc = new jspdf({ unit: 'mm', format: pageSize, orientation: 'portrait' });
        // this.prop.pdf.addImage(imgData, opt.image.type, opt.margin[1], opt.margin[0],
          // this.prop.pageSize.inner.width, pageHeight)
          //查询jspdf源码获取常数
          
          let k = 72 / 25.4;
          let width = (pageSize[0] )/k - margin[0]*scale
          let height = (pageSize[1])/k - margin[1]*scale
        // doc.addImage(dataurl, type, margin[1], margin[0], (1190.55-113)/k, 1683.78/k )
        doc.addImage(dataurl, type, margin[1], margin[0], width, height )
        doc.save(name)
        resolve()
      })

    } 

  }

  getTimeStr =() => {
    let  timestampRange = this.state.timestampRange
    if(!timestampRange.length){
      return '全部'
    }
    else {
      return moment(timestampRange[0]).format('YYYY-MM-DD')  + `  到  ` + moment(timestampRange[1]).format('YYYY-MM-DD')
    }
  }

  render(){
    const { timestampRange,isLoading } = this.state
    return(
      <div style={{ position: "relative", }} >
        <div style={{ float: "right", position:'absolute', right:10 }}>
          <DateRangePicker
            value={timestampRange}
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
          <Button type={ 'primary' } style={{ marginLeft: 20 }} onClick={ this.export } loading={ isLoading } >导出</Button>
        </div>
        <div id='threat-report' style={{  fontVariant: 'small-caps' }} >
          <Pages timestampRange={ timestampRange }  />
        </div>
      </div>
    )
  }
}


export default ThreatReport