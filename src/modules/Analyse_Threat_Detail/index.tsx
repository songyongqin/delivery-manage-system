import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import { ANALYSE_THREAT_DETAIL } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Icon ,Tag, Input } from 'antd'
import WithPagination from 'components/WithPagination'
import WhichSelect from 'components/WhichSelect'
import ExtraIcon from 'components/Icon'
// import FamilyTable from './components/FamilyTable'
// import LoopholeTable from './components/LoopholeTable'
import { SelectArr, typeArr, limit } from './constants'
import tranformParmToObj from 'utils/tranformParmToObj'
import FamilyEventTable from './components/FamilyEventTable'
import FamilyCcTable from './components/FamilyCcTable'
import FamilyAssetsTable from './components/FamilyAssetsTable'
import LoopholeEventTable from './components/LoopholeEventTable'
import LoopholeCcTable from './components/LoopholeCcTable'
import LoopholeAssetsTable from './components/LoopholeAssetsTable'

import SwitchItem from './components/SwitchItem'
import { selectArr } from '../Analyse_Attacked_Detail/constants';

const mapStateToprops = state => {
  return {
    state,
    familyEventLoading: state.loading.effects[`${ANALYSE_THREAT_DETAIL}/fetchFamilyEvent`],
    familyAssetsLoading: state.loading.effects[`${ANALYSE_THREAT_DETAIL}/fetchFamilyAssets`],
    familyCCLoading :state.loading.effects[`${ANALYSE_THREAT_DETAIL}/fetchFamilyCc`],

    loopholeEventLoading: state.loading.effects[`${ANALYSE_THREAT_DETAIL}/fetchLoopholeEvent`],
    loopholeAssetsLoading: state.loading.effects[`${ANALYSE_THREAT_DETAIL}/fetchLoopholeAssets`],
    loopholeCCLoading :state.loading.effects[`${ANALYSE_THREAT_DETAIL}/fetchLoopholeCc`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetchFamilyEvent: payload => dispatch({
      type: `${ANALYSE_THREAT_DETAIL}/fetchFamilyEvent`,
      payload
    }),

    fetchFamilyAssets: payload => dispatch({
      type: `${ANALYSE_THREAT_DETAIL}/fetchFamilyAssets`,
      payload
    }),

    fetchFamilyCc: payload => dispatch({
      type: `${ANALYSE_THREAT_DETAIL}/fetchFamilyCc`,
      payload
    }),

    fetchLoopholeEvent: payload => dispatch({
      type: `${ANALYSE_THREAT_DETAIL}/fetchLoopholeEvent`,
      payload
    }),

    fetchLoopholeAssets: payload => dispatch({
      type: `${ANALYSE_THREAT_DETAIL}/fetchLoopholeAssets`,
      payload
    }),

    fetchLoopholeCc: payload => dispatch({
      type: `${ANALYSE_THREAT_DETAIL}/fetchLoopholeCc`,
      payload
    }),
  }
}

interface state{
  selected: string
  selectValue: string
  type: string
  path: object
  familyEventArr: {
    total: number
    data: Array<object>
  }
  familyEventPage: number
  familyAssetsArr: {
    total: number
    data: Array<object>
  }
  familyAssetsPage: number
  familyCcArr: {
    total: number
    data: Array<object>
  }
  familyCcPage: number
  
  loopholeEventArr: {
    total: number
    data: Array<object>
  }
  loopholeEventPage: number
  loopholeAssetsArr: {
    total: number
    data: Array<object>
  }
  loopholeAssetsPage: number
  loopholeCcArr: {
    total: number
    data: Array<object>
  }
  loopholeCcPage: number
  isFetch:{
    familyEvent:boolean 
    familyAssets: boolean
    familyCc: boolean
    loopholeEvent: boolean 
    loopholeAssets: boolean
    loopholeCc: boolean
  }
}


const getType = str => {
  if(str==='/analyse/threat/family/detail') {
    return typeArr[0]
  }
  else return typeArr[1]
}



@WithAnimateRender
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, state> {
  constructor(props) {
    super(props);
    this.state = {
      selected: SelectArr[0],
      selectValue: SelectArr[0],
      type: getType(props.location.pathname),
      path: tranformParmToObj(props.location.search),
      familyEventArr: {
        total:0,
        data: []
      },
      familyEventPage:1,
      familyAssetsArr: {
        total: 0,
        data: []
      },
      familyAssetsPage: 1,
      familyCcArr: {
        total: 0,
        data: []
      },
      familyCcPage: 1,
      
      loopholeEventArr: {
        total:0,
        data: []
      },
      loopholeEventPage:1,
      loopholeAssetsArr: {
        total: 0,
        data: []
      },
      loopholeAssetsPage: 1,
      loopholeCcArr: {
        total: 0,
        data: []
      },
      loopholeCcPage: 1,


      isFetch:{
        familyEvent:false, 
        familyAssets: false,
        familyCc: false,
        loopholeEvent: false, 
        loopholeAssets: false,
        loopholeCc: false
      }
    }
  }

  componentDidMount(){
    if(this.state.type===typeArr[0]){
      this.fetchFamilyEvent(1)
    }
    else {
      this.fetchLoopholeEvent(1)
    }
  }

  // getSelect = e => {
  //   const id = e.currentTarget.dataset.id 
  //   let type = this.state.type
  //   let isFetch = this.state.isFetch
  //   console.log()
  //   this.setState({ selected: id })
  //   if(id===SelectArr[0]){
  //     if(type===typeArr[0]&&!isFetch.familyEvent){
  //       this.fetchFamilyEvent(1)
  //     }
  //     else if(type===typeArr[1]&&!isFetch.loopholeEvent) {
  //       this.fetchLoopholeEvent(1)
  //     }
  //   }
  //   if(id===SelectArr[1]){
  //     if(type===typeArr[0]&&!isFetch.familyAssets){
  //       this.fetchFamilyAssets(1)
  //     }
  //     else if(type===typeArr[1]&&!isFetch.loopholeAssets) {
  //       this.fetchLoopholeAssets(1)
  //     }
  //   }
  //   if(id===SelectArr[2]){
  //     if(type===typeArr[0]&&!isFetch.familyCc){
  //       this.fetchFamilyCc(1)
  //     }
  //     else if(type===typeArr[1]&&!isFetch.loopholeCc) {
  //       this.fetchLoopholeCc(1)
  //     }
  //   }

  // }

  fetchFamilyEvent = num => {
    let page = num ? num : 1
    let objs = { ...this.state.path, limit, page }
    this.props.fetchFamilyEvent(objs)
    .then(res => this.setState({ 
      familyEventArr: res, 
      familyEventPage:page,
      isFetch: { ...this.state.isFetch, familyEvent:true } })  )
    .catch(err => console.error(err) )
  }

  fetchFamilyAssets = num => {
    let page = num ? num : 1
    let objs = { ...this.state.path, limit, page }
    this.props.fetchFamilyAssets(objs)
    .then(res => this.setState({ 
      familyAssetsArr: res, 
      familyAssetsPage:page,
      isFetch: { ...this.state.isFetch, familyAssets:true } 
     })  )
    .catch(err => console.error(err) )
  }

  fetchFamilyCc = num => {
    let page = num ? num : 1
    let objs = { ...this.state.path, limit, page }
    this.props.fetchFamilyCc(objs)
    .then(res => this.setState({ 
      familyCcArr: res, 
      familyCcPage:page,
      isFetch: { ...this.state.isFetch, familyCc:true } 
     })  )
    .catch(err => console.error(err) )
  }


  fetchLoopholeEvent = num => {
    let page = num ? num : 1
    let objs = { ...this.state.path, limit, page }
    this.props.fetchLoopholeEvent(objs)
    .then(res => this.setState({ 
      loopholeEventArr: res, 
      loopholeEventPage:page,
      isFetch: { ...this.state.isFetch, loopholeEvent:true } })  )
    .catch(err => console.error(err) )
  }

  fetchLoopholeAssets = num => {
    let page = num ? num : 1
    let objs = { ...this.state.path, limit, page }
    this.props.fetchLoopholeAssets(objs)
    .then(res => this.setState({ 
      loopholeAssetsArr: res, 
      loopholeAssetsPage:page,
      isFetch: { ...this.state.isFetch, loopholeAssets:true } 
     })  )
    .catch(err => console.error(err) )
  }

  fetchLoopholeCc = num => {
    let page = num ? num : 1
    let objs = { ...this.state.path, limit, page }
    this.props.fetchLoopholeCc(objs)
    .then(res => this.setState({ 
      loopholeCcArr: res, 
      loopholeCcPage:page,
      isFetch: { ...this.state.isFetch, loopholeCc:true } 
     })  )
    .catch(err => console.error(err) )
  }

  getSelectValue = selectValue => {
    console.log('value', selectValue)
    const { type, isFetch } = this.state
    this.setState({ selectValue })
    if(selectValue===SelectArr[0]){
      if(type===typeArr[0]&&!isFetch.familyEvent){
        this.fetchFamilyEvent(1)
      }
      else if(type===typeArr[1]&&!isFetch.loopholeEvent) {
        this.fetchLoopholeEvent(1)
      }
    }
    if(selectValue===SelectArr[1]){
      if(type===typeArr[0]&&!isFetch.familyAssets){
        this.fetchFamilyAssets(1)
      }
      else if(type===typeArr[1]&&!isFetch.loopholeAssets) {
        this.fetchLoopholeAssets(1)
      }
    }
    if(selectValue===SelectArr[2]){
      if(type===typeArr[0]&&!isFetch.familyCc){
        this.fetchFamilyCc(1)
      }
      else if(type===typeArr[1]&&!isFetch.loopholeCc) {
        this.fetchLoopholeCc(1)
      }
    }
  }


  render() {
    const { selected, selectValue, type, familyEventArr, familyEventPage,
      familyAssetsArr, familyAssetsPage, familyCcArr, familyCcPage, loopholeEventArr, loopholeEventPage, loopholeAssetsArr, loopholeAssetsPage , loopholeCcArr, loopholeCcPage } = this.state
   
    const { familyEventLoading, familyAssetsLoading, familyCCLoading, loopholeEventLoading, loopholeAssetsLoading, loopholeCCLoading  } = this.props
    // console.log(type, this.state)
    return (
      <div >
        <WhichSelect data={ SelectArr } getValue={ this.getSelectValue } ></WhichSelect>
        {/* <SwitchItem text={ SelectArr[0] } selected={ selected } onClick={ this.getSelect } > */}
        <div style={{ display: selectValue===SelectArr[0] ?'block':'none' }} >
          {
            type===typeArr[0] ? 
              <Spin spinning={ familyEventLoading } >
              <div  >
                <FamilyEventTable tableData={ familyEventArr.data }  />
                
                <WithPagination total={ familyEventArr.total } 
                                current={ familyEventPage }
                                limit={ limit }
                                onChange={ this.fetchFamilyEvent } />
                                </div>
              </Spin>
              : 
              <Spin spinning={ loopholeEventLoading } >
                <LoopholeEventTable tableData={ loopholeEventArr.data }  />
                <WithPagination total={ loopholeEventArr.total } 
                                current={ loopholeEventPage }
                                limit={ limit }
                                onChange={ this.fetchLoopholeEvent } />
              </Spin>
          }
          </div>
        {/* </SwitchItem> */}
         {/* <SwitchItem text={ SelectArr[1] } selected={ selected } onClick={ this.getSelect } > */}
          <div style={{ display: selectValue===SelectArr[1] ?'block':'none' }} >
          {
            type===typeArr[0] ? 
              <Spin spinning={ familyAssetsLoading } >
                <FamilyAssetsTable tableData={ familyAssetsArr.data }  />
                <WithPagination total={ familyAssetsArr.total } 
                                current={ familyAssetsPage }
                                limit={ limit }
                                onChange={ this.fetchFamilyAssets } />
              </Spin>
              : 
              <Spin spinning={ loopholeAssetsLoading } >
                <LoopholeAssetsTable tableData={ loopholeAssetsArr.data }  />
                <WithPagination total={ loopholeAssetsArr.total } 
                                current={ loopholeAssetsPage }
                                limit={ limit }
                                onChange={ this.fetchLoopholeAssets } />
              </Spin>
          }
          </div>
        {/* </SwitchItem> */}
        {/* <SwitchItem text={ SelectArr[2] } selected={ selected } onClick={ this.getSelect } > */}
          <div style={{ display: selectValue===SelectArr[2] ?'block':'none' }} >
          {
            type===typeArr[0] ? 
              <Spin spinning={ familyCCLoading } >
                <FamilyCcTable tableData={ familyCcArr.data }  />
                <WithPagination total={ familyCcArr.total } 
                                current={ familyCcPage }
                                limit={ limit }
                                onChange={ this.fetchFamilyCc } />
              </Spin>
              : 
              <Spin spinning={ loopholeCCLoading } >
                <LoopholeCcTable tableData={ loopholeCcArr.data }  />
                <WithPagination total={ loopholeCcArr.total } 
                                current={ loopholeCcPage }
                                limit={ limit }
                                onChange={ this.fetchLoopholeCc } />
              </Spin>
          }
          </div>
        {/* </SwitchItem> */}
      </div>
    )
  }
}

export default Page