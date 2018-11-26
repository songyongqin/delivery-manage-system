
import React from 'react'
import CountItem from 'components/CountItem'
import  { ANALYSE_EVENT_VIEW_COUNT } from 'constants/model'
// import WithAnimateRender from 'components/WithAnimateRender'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import ExtraIcon from 'components/Icon'
import { Icon } from 'antd'
import Pie from '../Pie'

const css = require('./index.less')

const mapStateToProps = state => {
  return{
    state,
    loading: state.loading.effects[`${ANALYSE_EVENT_VIEW_COUNT}/fetch`]
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${ANALYSE_EVENT_VIEW_COUNT}/fetch`,
      payload
    })
  }
}



interface state {
  threatCount: number,
  hightCount: number,
  attackerCount: number, 
  attackedAssetsCount: number
  threatEventStatistics: Array<object>
  threatLevelStatistics: Array<object>
  // timestampRange: Array<number>
}

@extraConnect(mapStateToProps, mapDispatchToProps)
class Count extends React.Component<any,state>{
  constructor(props){
    super(props)
    this.state={
      threatCount: 0,
      hightCount: 0,
      attackerCount: 0,
      attackedAssetsCount: 0,
      threatEventStatistics: [],
      threatLevelStatistics: [],
      // timestampRange:[]
    }
  }

  componentDidMount(){
    this.fetchCount()
  }

  fetchCount = () => {
    this.props.fetch({ timestampRange: this.props.timestampRange })
    .then(res => this.setState(res) )
    .catch(err => console.error(err) )
  }

  typeSelect = arg => {
    this.props.fetchTable({ eventType: arg.name })
  } 

  leveSelect = arg => {
    this.props.fetchTable({ level: arg.name })
  }

  render(){

    const {  threatCount, hightCount, attackerCount, attackedAssetsCount, threatEventStatistics, threatLevelStatistics } = this.state
    const arr = [
      {
        title:'威胁事件',
        count:threatCount, 
        Icon: <Icon type="warning" style={{ fontSize:22 }} />
      },
      {
        title:'高危事件', 
        count:hightCount, 
        Icon: <Icon type="close-circle-o"  style={{ fontSize:22 }}/>
      },
      {
        title:'攻击者', 
        count:attackerCount, 
        Icon: <ExtraIcon type={'eyedropper'} style={{ fontSize:22 }}  />
      },
      {
        title:'失陷资产', 
        count:attackedAssetsCount, 
        Icon: <Icon type="file-excel" style={{ fontSize:22 }} />
      },
    ]
    return (
      <div >
      <Spin spinning={this.props.loading}>
        <div  style={{ width: 300, display:'inline-block' }} >
          {
            arr.map(item => 
              <div className={ css.item } key={ item.title } >
                <CountItem title={ item.title} count={ item.count }  >
                  {
                    item.Icon
                  }
                </CountItem>
              </div>
            )
          }
        </div>
        <Pie data={ threatEventStatistics } title={ '威胁类型统计' } onEvents={ { pieselectchanged: this.typeSelect} } />
        <Pie data={ threatLevelStatistics } title={ '威胁等级统计' } onEvents={ { pieselectchanged: this.leveSelect} }  />
      </Spin>
      </div>
    )
  }
}

export default Count



