import React from 'react';
import styles from './styles.css'
import {Menu,Button,Breadcrumb,Popover,Icon,Tooltip} from 'antd';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/index'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import {connect} from 'dva';
import classnames from 'classnames';
import CreateForm from './components/CreateForm';

import {
  NAMESPACE,
  THREAT_NAME_NAME_DATAINDEX

} from './ConstConfig'
import * as tableConfig from './components/TableConfig';
import EnhanciveTable from '../../components/EnhanciveTable';

const mapStateToProps=state=>{
  const effectLoading=state.loading.effects;

  return {
    [NAMESPACE]:state[NAMESPACE],
    commonLayout:state.layout.commonLayout,
    loading:effectLoading[`${NAMESPACE}/query`]||
    effectLoading[`${NAMESPACE}/put`]
  }

}

const mapDispatchToProps=dispatch=>({
  get:()=>dispatch({
    type:`${NAMESPACE}/query`
  }),
  put:payload=>dispatch({
    type:`${NAMESPACE}/put`,
    payload,
  }),
})


@connect(mapStateToProps,createMapDispatchWithPromise(mapDispatchToProps))
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      newItems:[],
      createVisible:false,
    }
  }
  onCreateHandle=(values)=>{

    let _newItems=this.state.newItems;

    _newItems.unshift(values)

    this.setState({newItems:_newItems});
    this.switchCreatePopover();
  }
  switchCreatePopover=()=>this.setState({createVisible:!this.state.createVisible})
  componentDidMount=()=> {
    this.props.get();
    this.addScroll();
    addAutoResizeTableScrollHeight(this.addScroll);
  }
  componentWillUnmount=()=>{
    removeAutoResizeTableScrollHeight(this.addScroll);
  }
  componentDidUpdate=()=>{
    this.addScroll();
  }
  addScroll=()=>{
    const $target = $(`.ant-table-body`);
    $target.niceScroll({
      cursorborder:"",
      cursorcolor:"#cccccc",
      boxzoom:false,
      autohidemode:true
    });
    $target[0].style.maxHeight=$("#strategy-expand-page")[0].offsetHeight-160+"px";
  }
  render=()=>{
    const {commonLayout}=this.props;
    const {queryResults,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;
    const isDark=commonLayout.darkTheme;
    const finalData=[...this.state.newItems,...data];
    const tableProps={
      columns:tableConfig.getColumns(),
      dataSource:finalData.map((i,index)=>({
        ...i,
        key:`item-${index}-${lastReqTime}`
      })),
      scroll:{y:600},
      size:"small"
    };

    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          <h4  className={classnames({
            [styles["title"]]:true,
            [styles["title-dark"]]:isDark,
          })}>
            <Icon type="setting"/> 威胁等级配置
          </h4>
          <div style={{marginBottom:"15px"}}>
            <Popover placement="bottom"
                     trigger={"click"}
                     visible={this.state.createVisible}
                     content={<div style={{width:"400px",paddingTop:"20px"}}>
                       <CreateForm onSubmit={this.onCreateHandle}
                                   key={`${this.state.createVisible}-create-form`}
                                   onCancel={this.switchCreatePopover}
                                   threatnameList={finalData.map(i=>i[THREAT_NAME_NAME_DATAINDEX])}/>
                     </div>}
                     title={<p><Icon type="plus"/>&nbsp;添加攻击行为</p>}>
              <Button type="primary"
                      onClick={this.switchCreatePopover}
                      icon="plus">
                添加
              </Button>
            </Popover>
            <Button type="primary"
                    style={{
                      marginLeft:"15px"
                    }}
                    icon="save">
              保存
            </Button>
            {/*<Button type="danger"*/}
                    {/*icon="close"*/}
                    {/*style={{*/}
                      {/*marginLeft:"15px",*/}
                      {/*// borderColor:"#d73435",*/}
                      {/*// background:"#d73435",*/}
                      {/*// color:"white"*/}
                    {/*}}*/}
                    {/*className="btn-danger">*/}
              {/*取消*/}
            {/*</Button>*/}
            <Tooltip title="撤销/重新加载" placement="bottomLeft">
              <Button  style={{float:"right"}}
                       type="primary"
                       onClick={this.props.get}
                       icon="reload"/>
            </Tooltip>
          </div>
          <EnhanciveTable tableProps={tableProps}
                          isDark={isDark}
                          inverse={true}
                          pagination={false}/>

        </JoSpin>
      </div>
    )
  }
}

export default Page;



function addAutoResizeTableScrollHeight(callback) {
  window.addEventListener("resize",callback)
}

function removeAutoResizeTableScrollHeight(callback) {
  window.removeEventListener("resize",callback)
}
