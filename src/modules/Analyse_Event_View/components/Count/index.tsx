
import React from 'react'
import CountItem from 'components/CountItem'
import  { ANALYSE_EVENT_VIEW_COUNT } from 'constants/model'
// import WithAnimateRender from 'components/WithAnimateRender'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import ExtraIcon from 'components/Icon'
import { Icon, Col, Row } from 'antd'
import Pie from '../Pie'
import { ThreatEvent, Attacker, HightEvent , LostAsset } from 'components/IconSvg'

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
    this.props.fetchTable({ searchValue: arg.name })
  } 

  leveSelect = arg => {
    this.props.fetchTable({ searchValue: arg.name })
  }

  render(){
    const { pieHeight } = this.props
    const {  threatCount, hightCount, attackerCount, attackedAssetsCount, threatEventStatistics, threatLevelStatistics } = this.state
    const arr = [
      {
        title:'威胁事件',
        count:threatCount, 
        // Icon: <Icon type="warning" style={{ fontSize:22 }} />
        Icon: <ThreatEvent />
      },
      {
        title:'攻击者', 
        count:attackerCount, 
        // Icon: <ExtraIcon type={'eyedropper'} style={{ fontSize:22 }}  />
        Icon: <Attacker />
      },
      {
        title:'高危事件', 
        count:hightCount, 
        // Icon: <Icon type="close-circle-o"  style={{ fontSize:22 }}/>
        Icon: <HightEvent />
      },
      {
        title:'失陷资产', 
        count:attackedAssetsCount, 
        // Icon: <Icon type="file-excel" style={{ fontSize:22 }} />
        Icon: <LostAsset />
      },
    ]
    let itemHeight = (pieHeight-20)/2
    return (
      <div >
      <Spin spinning={this.props.loading}>
        <Row gutter={ 20 } >
          <Col span={ 12 } >
            {/* <Row gutter={ 20 } style={{ height: itemHeight }}  >
              <Col className={ css.item }  span={ 12 } >
                <CountItem title={ '威胁事件'} count={ threatCount }  >
                  <ThreatEvent />
                </CountItem>
              </Col>
              <Col className={ css.item }  span={ 12 } >
                <CountItem title={ '攻击者'} count={ attackerCount }  >
                  <Attacker />
                </CountItem>
              </Col>
            </Row>
            <Row gutter={ 20 }  style={{ paddingTop: 20 , height: itemHeight}} >
              <Col className={ css.item }  span={ 12 } >
                <CountItem title={ '高危事件'} count={ hightCount }  >
                  <HightEvent />
                </CountItem>
              </Col>
              <Col className={ css.item }  span={ 12 } >
                <CountItem title={ '失陷资产'} count={ attackedAssetsCount }  >
                  <LostAsset />
                </CountItem>
              </Col>
            </Row> */}
            <Row gutter={ 20 }  >
              {
                arr.map((item, index )=> 
                  <Col className={ css.item } key={ item.title } span={ 12 } style={{ marginTop: index>1? 20:0, height: itemHeight }}  >
                    <CountItem title={ item.title} count={ item.count }  >
                      {
                        item.Icon
                      }
                    </CountItem>
                  </Col>
                )
              }
            </Row>
          </Col>
          <Col span={ 6 } style={{ height: pieHeight }} >
            <Pie data={ threatEventStatistics } title={ '威胁类型统计' } onEvents={ { pieselectchanged: this.typeSelect} } />
          </Col>
          <Col span={ 6 }  style={{ height: pieHeight }}>
            <Pie data={ threatLevelStatistics } title={ '威胁等级统计' } onEvents={ { pieselectchanged: this.leveSelect} }  />
          </Col>
        </Row>
      </Spin>
      </div>
    )
  }
}



export default Count


// const ItemIcon = () => {
//   return(
//     <div></div>
//   )
// }
