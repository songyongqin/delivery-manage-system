

import React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { WHITE_LIST } from 'constants/model'
import WithTable from 'components/WithTable'
import WithPagination from 'components/WithPagination'
import { columns } from './constants'
import { Button, message, Modal } from 'antd'
import NewWhiteList from './components/NewWhiteList'
import Spin from 'domainComponents/Spin'


const mapStateToprops = state => {
  return {
    state,
    loading: state.loading.effects[`${WHITE_LIST}/get`]||state.loading.effects[`${WHITE_LIST}/del`],
    postLoading: state.loading.effects[`${WHITE_LIST}/post`],
    useLoading: state.loading.effects[`${WHITE_LIST}/postUse`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    get: payload => dispatch({
      type: `${WHITE_LIST}/get`,
      payload
    }),
    post: payload => dispatch({
      type: `${WHITE_LIST}/post`,
      payload
    }),
    del: payload => dispatch({
      type: `${WHITE_LIST}/del`,
      payload
    }),
    postUse: payload => dispatch({
      type: `${WHITE_LIST}/postUse`,
      payload
    })
  }
}

const initArg = {
  limit:10,
  page:1 
}

@extraConnect( mapStateToprops, mapDispatchToprops )
class WhiteList extends React.Component<any, any>{
  constructor(props){
    super(props)
    this.state={
      total:0,
      data:[],
      showNewWhite: false,
      ...initArg
    }
  }

  componentDidMount(){
    this.get(initArg)
  }

  get = obj => {
    this.props.get(obj).then(res => {
      const { page=1 } = obj
      const { total=0, data=[] } = res
      this.setState({ total, data, page })
    } )
  }

  del = id => {
    this.props.del({id}).then(() =>{ message.success('删除成功'); this.get({...initArg}) } )
  }

  paginationChange = page => {
    this.get({ limit: initArg.limit, page })
  }

  onSubmit = values => {
    this.props.post(values).then(res => {console.log(res); message.success('新增白名单成功');  this.get({...initArg})})
  }
  hiden = () => {
    this.setState({ showNewWhite: false })
  }

  show = () => {
    this.setState({ showNewWhite: true })
  }

  use = () => {
    this.props.postUse().then(() => message.success('应用成功') )
  }

  render(){
    let renderColumns = columns.map(i => {
      if(i.dataIndex==='action'){
        i['render'] = (_, record) => <Button type='danger' onClick={ () => this.del(record.id||record.feature) }  >删除</Button>
      }
      return i
    })

    const { page=1, total, showNewWhite, data } = this.state

    return(
      <div>
        <div style={{ margin:15 }} >
          <Button icon='plus' type='primary' onClick={ this.show } >新增白名单</Button>
          <Button icon='file-pdf' type='primary'  style={{ float:"right" }} onClick={ this.use } loading={ this.props.useLoading } >应用</Button>
        </div>
        <Modal  onCancel={ this.hiden } footer={ null }  visible={ showNewWhite } >
          <NewWhiteList onSubmit={ this.onSubmit } loading={ this.props.postLoading } />
        </Modal>
        <Spin spinning={ this.props.loading } >
          <WithTable  tableData={ data } config={ renderColumns }   />
        </Spin>
        <WithPagination current={ page } total={ total } onChange={ this.paginationChange } />
      </div>
    )
  }
}


export default WhiteList