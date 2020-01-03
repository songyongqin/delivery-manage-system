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
import { Anchor } from 'antd'
const { Link } = Anchor


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
      project:{},
      products:[],
      id:0
    }
  }

  componentDidMount() {
    this.getTable()
  }
  getTable = () => {
    let idObj = queryString.parse(this.props.location.search)
    let id = Number(idObj['id'])
    this.setState({id},()=>{
      this.props.fetchTable({id:this.state.id})
      .then(res => {
        this.props.save({ data:res })
        this.setState({data:res})
      })
    })
    
  }

  render() {
    const {products, id} = this.state.data
    const {loading} = this.props
    const {role} = this.props.state.domainUser.userData
    return (
      <Spin spinning={loading}>
        <div id="project" style={{marginRight: 150}}>
          <ProjectDetails role={role} data = {this.state.data.project} id = {id} getTable={this.getTable} />
        </div>
        {
          products.map((el,index) => 
            <div id={index.toString()} key={index} style={{marginRight: 150}}>
              <ProductDetails role={role}  data = {el} id = {id} getTable={this.getTable} />
            </div>
          )
        }
        <Anchor showInkInFixed={true} className={styles['scroll']} >
          <Link href={location.hash+"#project"} title="项目详情" />
          {
            products.map((el,index) => {
              return <Link key={index} href={location.hash+"#"+index} title={el.productName} />
            })
          }
        </Anchor>
      </Spin>
    )
  }
}


export default Page