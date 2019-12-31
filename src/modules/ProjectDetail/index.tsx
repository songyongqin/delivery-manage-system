import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import { queryString } from 'utils'
import Spin from 'domainComponents/Spin'
import ProjectDetails from './components/ProjectDetails'
import ProductDetails from './components/ProductDetails'


const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/fetchTable`],
    projectState: state[PROJECT_DETAIL_NAMESPACE]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/fetchTable`,
      payload
    }),
    save: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/save`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {

  state = {
    id: 0,
    data:{
      project:{}
    }
  }

  componentDidMount() {
    this.getTable()
  }
  getTable = () => {
    let id = queryString.parse(this.props.location.search)
    id['id'] = Number(id['id'])
    this.setState({id},()=>{
      this.props.fetchTable(this.state.id)
      .then(res => {
        this.props.save({ data:res })
        this.setState({data:res})
      })
    })
    
  }

  render() {
    const {loading} = this.props
    // let obj = JSON.parse(JSON.stringify(this.state.data.project))
    return (
      <Spin spinning={loading}>
        <ProjectDetails data = {this.state.data.project} getTable={this.getTable} />
        {/* <ProductDetails data = {this.state.data.project} getTable={this.getTable} /> */}
        {/* <ProjectDetails data = {...obj} /> */}
      </Spin>
    )
  }
}


export default Page