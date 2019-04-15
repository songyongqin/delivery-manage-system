

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { Button ,Tag, Input } from 'antd'
import { getTodayTime } from 'utils/getInitTime'
import Pages from './compoents/Pages'
// import html2canvas from 'html2canvas'
// import * as html2canvas from './compoents/html2canvs'
// import { download } from 'utils'
import downloadjs from 'downloadjs'
import moment from 'moment'
import jspdf from 'jspdf';
import extraConnect from 'domainUtils/extraConnect'

// import html2pdf from 'html2pdf.js'

// import './compoents/html2canvas.min.js'
const h2c = require('./compoents/html2canvas.min.js')

const mapStateProps = state => {
  return {
      mini: state.layout.navMini
    }
}

@extraConnect(mapStateProps)
class ThreatReport extends Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      timestampRange:getTodayTime()||[],
      countKey:0,
      isLoading: false,
    }
  }

  componentDidMount(){
    console.log(h2c.html2canvas)
  }

  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    this.setState({  countKey: +new Date() , timestampRange })
  }

  export = () => {
    this.setState({ isLoading: true })
    let doms = document.getElementById('threat-reports')
    let mini = this.props.mini || false
    let screenWidth = window.innerWidth
    let deWidth = screenWidth - (mini ? 70 : 180) - 25
    let del = deWidth > 1300 ? (deWidth-1300)/2 : 0;
    const scale = 2,
      margin= [30, 30],
      type= 'jpeg',
      width = doms.clientWidth +2*margin[0]  ,
      height = doms.clientHeight +2*margin[1] ,
      x = (mini? 95: 205) + del - margin[0] ,
      y= 164 - margin[1] 
      // x = -margin[0],
      // y = -margin[1]
      // x = 2*margin[0],
      // y = 2*margin[0]
      console.log(x,y, deWidth, del, screenWidth )
      h2c.html2canvas(doms, {scale,width: width, height: height,  x, y  })
    .then(canvas => {
      let time = this.getTimeStr()
      const name = `威胁报告(${time}).pdf`
      let dataurl = canvas.toDataURL('image/' + 'jpeg')
      // const pageSize = [width, height ]
      // const pageSize = [canvas.width/2, canvas.height/2]
      const pageSize = [canvas.width/2, canvas.height/2]      

      // downloadjs(dataurl,'xxx.jpg' , 'image/jpeg')

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
        let doc = new jspdf({ unit: 'px', format: pageSize, orientation: 'portrait' });
        // this.prop.pdf.addImage(imgData, opt.image.type, opt.margin[1], opt.margin[0],
          // this.prop.pageSize.inner.width, pageHeight)
          //查询jspdf源码获取常数
          
          // let k = 72 / 25.4;
          let k = 72 / 96;
          // let xx = 1/1.6;
          // let width = (pageSize[0])*k - 8*margin[0]
          // let height = (pageSize[1])*k - 8*margin[1]
          let width = (pageSize[0])*k;
          let height = (pageSize[1])*k;
        // doc.addImage(dataurl, 'JPEG', margin[1], margin[0],  width, height )
        console.log(width, height, pageSize)
        doc.addImage(dataurl, type, 0, 0, width, height )
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
      <div style={{ position: "relative",   margin:'0 auto', padding:0, maxWidth:1300 }} >
        <div style={{ float: "right", position:'absolute', right:10 }}>
          <DateRangePicker
            value={timestampRange}
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
          <Button type={ 'primary' } style={{ marginLeft: 20 }} onClick={ this.export } loading={ isLoading } >导出</Button>
          
        </div>
        <div id='threat-report' style={{  fontVariant: 'normal',margin:0, padding:0 ,  }} >
          <Pages timestampRange={ timestampRange }  />
        </div>
      </div>
    )
  }
}


export default ThreatReport