import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { HOME_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import {Row, Col} from 'antd'
import ItemCount from './components/Item'
import Pie from './components/Pie'
import { isArray, sum } from 'lodash'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${HOME_NAMESPACE}/fetchCount`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCount: payload => dispatch({
      type: `${HOME_NAMESPACE}/fetchCount`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {

  state = {
    proTotal:0,
    cusTotal:0,
    testTotal:0,
    situationCount:[
    ]
  }
  componentDidMount() {
    this.props.fetchCount()
    .then(res => {
      console.log(res)
      this.setState({...res})
    })
  }

  render() {
    console.log(this.state)
    const {proTotal, cusTotal, testTotal, situationCount} = this.state
    const { loading } = this.props
    console.log(this.props.loading)

    const addComma = num => (num+'').replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')
    const Total = ({ num }) => {
      const needAddComma = num >1000000;
      let str = needAddComma ? `${addComma(Math.round(num/10000))}万` : addComma(Math.round(num))
      return (
        <div  className={ styles['total']} >
          { str }
        </div>
      )
    }
    const getTotal = (arr) => {
      if(!isArray(arr)||(isArray(arr)&&arr.length===0)){
        return '0'
      }
      else {
        let array = arr.map(i => typeof i.value ==='number' ? i.value : 0 )
        return `${sum(array)}`
      }
    }

    return (
      <Spin spinning={ loading }>
        <div key="homes">
          <Row >
            <ItemCount count = {proTotal} title="项目总数" icon = "ProIoc" />
            <ItemCount count = {cusTotal} title="客户总数" icon = "CusIoc"/>
            <ItemCount count = {testTotal} title="测试中的项目数" icon = "TesIoc"/>
          </Row>
          <Row className={styles['pieWrap']}>
            <Pie data={situationCount}></Pie>
            <Total num={ getTotal(situationCount)} />
          </Row>
        </div>
      </Spin>
    )
  }
}
export default Page;
