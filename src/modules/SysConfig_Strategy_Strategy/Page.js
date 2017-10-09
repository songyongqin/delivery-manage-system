import React from 'react';
import styles from './styles.css'
import {
  Menu,
  Button,
  Breadcrumb,
  Card,
  Icon,
  message as Message
} from 'antd';

import {WithAnimateRender} from '../../components/HOSComponents/index'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import {connect} from 'dva';
import classnames from 'classnames';
import * as tableConfig from './components/TableConfig';
import EnhanciveTable from '../../components/EnhanciveTable';

import {
  NAMESPACE,
  USERFUL_VALUE,
  UN_USEFUL_VALUE,
  PROTOCOLTYPE_DATAINDEX,
} from './ConstConfig'

const mapStateToProps=state=>({
  [NAMESPACE]:state[NAMESPACE],
  // putLoading:state.loading.effects[`${NAMESPACE}/put`],
  // getLoading:state.loading.effects[`${NAMESPACE}/query`],
  commonLayout:state.layout.commonLayout
})

const mapDispatchToProps=dispatch=>({
  get:()=>dispatch({
    type:`${NAMESPACE}/query`
  }),
  put:payload=>dispatch({
    type:`${NAMESPACE}/put`,
    payload,
  }),
  apply:()=>dispatch({
    type:`${NAMESPACE}/apply`
  })
})

@connect(mapStateToProps,createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      selectedRows:[]
    }

  }
  componentDidMount=()=>{
    this.props.get();
  }

  setSelectedRows=(selectedRows)=>this.setState({
    selectedRows
  })

  getUsefulOnChangeHandle=protocolType=>value=>this.props.put({
    [protocolType]:value?USERFUL_VALUE:UN_USEFUL_VALUE
  })
    .then(this.props.get)

  createPutStrategy=value=>()=>{
    let payload={};
    this.state.selectedRows.forEach(i=>payload[i[PROTOCOLTYPE_DATAINDEX]]=value)
    this.props.put(payload)
      .then(Message.success.call(null,"修改成功"))
      .then(this.props.get)
      .then(this.initSelected)
  }

  applyHandle=()=>this.props.apply()
    .then(Message.success.call(null,"应用成功"))
    .then(this.props.get)

  initSelected=()=>this.setState({
    selectedRows:[]
  })
  render=()=>{

    const {commonLayout}=this.props;
    const {queryResults,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;
    const {getUsefulOnChangeHandle}=this;
    const {selectedRows} =this.state;
    const isDark=commonLayout.darkTheme;

    const tableProps={
      columns:tableConfig.getColumns({
        getUsefulOnChangeHandle
      }),
      dataSource:data.map((i,index)=>({
        ...i,
        key:`item-${index}-${lastReqTime}`
      })),
      rowSelection:{
        onChange: (selectedRowKeys, selectedRows) =>this.setSelectedRows(selectedRows)
      }
    };

    const title=(
      <div>
        <Button.Group>
          <Button type="primary"
                  onClick={this.createPutStrategy(USERFUL_VALUE)}
                  disabled={selectedRows.length===0}>
            <Icon type="check"/>启用
          </Button>
          <Button type="danger"
                  onClick={this.createPutStrategy(UN_USEFUL_VALUE)}
                  disabled={selectedRows.length===0}
                  className="btn-danger">
            关闭<Icon type="close"/>
          </Button>
        </Button.Group>
        <Button type="primary"
                icon="plus"
                style={{marginLeft:"15px"}}>
          新增特征
        </Button>
        <div style={{float:"right"}}>
          <Button type="primary"
                  icon="setting">
            威胁等级配置
          </Button>
          <Button type="primary"
                  onClick={this.applyHandle}
                  style={{marginLeft:"15px"}}
                  icon="save">
            应用
          </Button>
        </div>
      </div>
    )

    const classes=classnames({
      ["card-dark"]:isDark
    });


    return (
        <Card title={title}
              className={classes}>
          <EnhanciveTable title={null}
                          inverse={true}
                          tableProps={tableProps}
                          isDark={isDark}
                          pagination={false}/>

        </Card>
    )
  }
}

export default Page;
