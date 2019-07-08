

import React from 'react'
import Spin from 'domainComponents/Spin'
import { THREAT_REPORT_NEW_CHART_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Pie from '../Pie'
import PieTwo from '../PieTwo'
import Bar from '../Bar'
import { idArr } from '../../constants'
import { Icon } from 'antd';
const styles = require('./index.less')


const mapStateToProps = state => {
  return {
    state,
    detailLoading : state.loading.effects[`${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetchDetail`],
    loading: state.loading.effects[`${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetch`,
      payload
    }),
    fetchDetail: payload => dispatch({
      type: `${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetchDetail`,
      payload
    }) 
  }
}

interface props{
  loading?:boolean
  fetchDetail?: (any:any)=>any
  getClick: (any:any)=>any
  timestampRange: Array<any>

  fetch?: (any:any)=>any
  detailLoading?:boolean
}

interface state{
  data:{
    level:Array<object>
    threatEvent:Array<object>
    group:Array<object>
    attackedAssets:Array<object>
    family:Array<object>
    threatIntelligence:Array<object>
    attackedAssetsTotal:number
    familyTotal:number
    groupTotal:number
    threatEventTotal:number
    threatIntelligenceTotal:number
  }
  rank:{
    threatSourceCountry: rankRes
    threatSourceProvince: rankRes
    attackerIp: rankRes
    threatEvent: rankRes
    attackedAssets: rankRes
  }
}


interface rankRes{
  // title: string
  data: Array<arrItem>
}

interface arrItem{
  name: string
  value: number
}

const Wrap =( { spinning,children, keys=0, style={  } }) => 
  <div style={style} className={ styles.wrap }  >
    {/* <span className={ keys%2===0 ?'not-break': 'html2pdf__page-break' } ></span> */}
    <Spin spinning={ spinning } >{ children }</Spin>
  </div>


@extraConnect(mapStateToProps, mapDispatchToProps)
class NewChart extends React.Component<props,state>{
  constructor(props){
    super(props)
    this.state={
      data:{
        level:[],
        threatEvent:[],
        group:[],
        attackedAssets:[],
        family:[],
        threatIntelligence:[],
        attackedAssetsTotal:0,
        familyTotal:0,
        groupTotal:0,
        threatEventTotal:0,
        threatIntelligenceTotal:0,
      },
      rank:{
        threatSourceCountry: {
          data:[{ name:'',value:0 }]
        },
        threatSourceProvince: {
          data:[{ name:'',value:0 }]
        },
        attackerIp: {
          data:[{ name:'',value:0 }]
        },
        threatEvent: {
          data:[{ name:'',value:0 }]
        },
        attackedAssets: {
          data:[{ name:'',value:0 }]
        },
      }
    }
  }

  componentDidMount(){
    this.fetchDetail()
    this.fetch()
  }

  fetch = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetch({ timestampRange })
    .then(res => this.setState({ rank: res }) )
    .catch(err => console.error(err) )
  }


  fetchDetail = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetchDetail({ timestampRange })
    .then(res => this.setState({ data: res }) )
    .catch(err => console.error(err) )
  }


  clickTitle = title => {
    console.log(title)
    this.props.getClick(title)
  }


  render(){
    const { loading, detailLoading } = this.props
    const { data, rank } = this.state
    const arrPie = [
      { 
        data: data.group, 
        // title: '威胁组织',
        title: idArr[2].text, 
        total: data.groupTotal, 
        unit: '个' 
      },
      // { 
      //   data: data.attackedAssets, 
      //   // title: '受攻击资产', 
      //   title: idArr[5].text, 
      //   total: data.attackedAssetsTotal, 
      //   unit: '台' 
      // },
      { 
        data: data.family, 
        // title: '威胁家族', 
        title: idArr[3].text, 
        total: data.familyTotal, 
        unit: '个' 
      },
      { 
        data: data.threatIntelligence, 
        // title: '威胁情报', 
        title: idArr[6].text, 
        total: data.threatIntelligenceTotal, 
        unit: '条' 
      }
    ]

    const arrRank = [
      { 
        data: rank.threatSourceCountry.data, 
        title: '威胁来源国家排行TOP10' 
      },
      { 
        data: rank.attackerIp.data, 
        title: '攻击者资产排行TOP10' 
      },
      { 
        data: rank.threatEvent.data, 
        title: '威胁事件类型排行TOP10' 
      },
      { 
        data: rank.threatSourceProvince.data, 
        title: '威胁来源国内省份排行TOP10' 
      },
      
      
      // { 
      //   data: rank.attackedAssets.data, 
      //   title: '受攻击资产IP排行TOP10' 
      // },
    ]

    const titleStyle = {
      fontSize:16,
      fontWeight: 700,
      fontFamily: 'Arial',
      marginTop:20
    }

    return(
      <div>
        <h4 style={{ textAlign: 'left' , ...titleStyle }} >威胁统计</h4>
        <div className={ styles.threatcount } >
        <Wrap spinning={ detailLoading } keys={ 2 } style={{ width:500 }}  >
          <PieTwo  data={ data.level } onClick={ this.clickTitle } 
                title={ '威胁事件' }
                data2={ data.threatEvent }
                total={ data.threatEventTotal }
                unit={ '起' } 
                className={ styles.threatitem }
                id={ idArr[0].value }
                 />
        </Wrap>
          {
            arrPie.map((item, index) => 
            <Wrap spinning={ detailLoading } key={ index } keys={ index+1 } style={{ width:500, marginLeft:15 }}   >
              <Pie  data={ item.data } onClick={ this.clickTitle } 
                  title={ item.title }
                  total={ item.total }
                  unit={ item.unit }
                  className={ styles.threatitem }
                  id={ idArr.filter(i => i.text===item.title )[0].value }
                   />
            </Wrap>
          )
          }
        </div>
        <div className={ styles.rankcontainer } >
          {/* {
            arrRank.map((item, index) => 
            <Wrap spinning={ loading } key={ index } keys={ index+1 } >
              <Bar data={ item.data } title={ item.title } key={ index } className={ styles.rankitem }  /> 
            </Wrap>
          )
          } */}
          <div className={ styles.commonrank } >
          <Wrap spinning={ loading } keys={ 1 } style={{ width: '100%' }}  >
            <Bar data={ rank.threatEvent.data } title={ '威胁事件类型排行TOP10'   }  className={ styles.rankitem }  /> 
          </Wrap>
          </div>
          <div className={ styles.commonrank } >
          <Wrap spinning={ loading } keys={ 2 } style={{ width: '100%' }}  >
              <Bar data={ rank.attackerIp.data } title={ '攻击者资产排行TOP10'  }  className={ styles.rankitem }  /> 
          </Wrap>
          </div>
        </div>
        <div className={ styles.rankcontainer } >
          <div className={ styles.commonrank } >
            <Wrap spinning={ loading } keys={ 1 } style={{ width: '100%' }}  >
              <Bar data={ rank.threatSourceCountry.data } title={ '威胁来源国家排行TOP10'  }  className={ styles.rankitem }  /> 
            </Wrap>
          </div>
          <div className={ styles.commonrank } >
            <Wrap spinning={ loading } keys={ 2 } style={{ width: '100%' }}  >
                <Bar data={ rank.threatSourceProvince.data } title={ '威胁来源国内省份排行TOP10'  }  className={ styles.rankitem }  /> 
            </Wrap>
          </div>
        </div>
        <h4 style={{ textAlign: 'left' , ...titleStyle }} >资产统计</h4>
        <AssetCount data={ data } rank={ rank } loading={ loading } detailLoading={ detailLoading } onClick={ this.clickTitle }  />
      </div>
    )
  }
}


export default NewChart


const AssetCount = ({ detailLoading, data, rank, loading, onClick }) => {
  return (
    <div className={ styles.assetcount } >
        <div className={ styles.assetitem } >
          <AssetIcon title={ '资产总数' } count={ rank.assetsCount|| 0 } icon={ <Icon  type={'database'} style={{ color: '#4F5DCA' }} /> } />
          <AssetIcon title={ '新增资产' } count={rank.newAssets|| 0 } icon={ <Icon  type={'file-add'} style={{ color: '#4F5DCA' }} />} />
        </div>
        <div className={ styles.assetitem }  >
          <Spin spinning={ detailLoading } >
                <Pie  data={ data.attackedAssets } onClick={ onClick } 
                    title={ '受攻击资产' }
                    total={ data.attackedAssetsTotal }
                    unit={ '台' }
                    className={ styles.assetpie }
                    id={ idArr.filter(i => i.text==='受攻击资产' )[0].value }
                    />
          </Spin>
        </div>

        <div className={ styles.assetitem }  >
        <Wrap spinning={ loading } keys={ 2 } style={{ width: '100%' }}  >
                <Bar data={ rank.attackedAssets.data} title={ '受攻击资产IP排行TOP10'  }  className={ styles.assetrankitem }  /> 
        </Wrap>
        </div>
    </div>
  )
}

const AssetIcon = ({ icon, title, count }) => {
  return (
    <div className={ styles.asseticon } >
      <div>{icon}</div>
      <div>{title}</div>
      <div style={{ fontSize: 20,  fontWeight: 600 }} >{count }<span>台</span></div>
    </div>
  )
}