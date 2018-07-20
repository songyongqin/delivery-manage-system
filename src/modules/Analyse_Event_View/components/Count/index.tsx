
import React from 'react'
import CountItem from 'components/CountItem'
import  { ANALYSE_EVENT_VIEW_COUNT } from 'constants/model'
// import WithAnimateRender from 'components/WithAnimateRender'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'


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

  }

  fetchCount = 

  render(){
    
    return (
      <div>count</div>
    )
  }
}

export default Count



