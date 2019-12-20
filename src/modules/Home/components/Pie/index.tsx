import * as React from 'react'
import PieCharts from 'domainComponents/PieCharts/async'

class Page extends React.Component<any, any> {

  render() {
    const {data} = this.props
    const text = '项目概览'
    const link = "#"
    const addNum = true
    return (
      <PieCharts data={ data } titles={{text:'项目概览', link: '#', textAlign: 'left', x:'left'}}   addNum={ addNum } />
    )
  }
}
export default Page;
