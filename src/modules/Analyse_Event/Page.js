import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge,Modal } from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import * as tools from '../../utils/tools.js';
import * as tableConfig from './components/TableConfig';
import {statisticDataIndexes,statisticsTextConfig,tableTextConfig,haveDetailsDataIndexes,FALLHOST_DATAINDEX} from './ConstConfig';
import {NAMESPACE} from './ConstConfig'
import JoIcon from '../../components/JoIcon';
import {Link} from 'dva/router';
import ThreatEvent from '../ThreatEvent/Page';
import { routerRedux } from 'dva/router';
import CountUp from 'react-countup';

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
  }
}

@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
})
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      activeKey:null,
    }
  }
  switchModal=()=>{
    this.setState({
      visible:!this.state.visible
    })
  }
  setActiveKey=(key)=>{
    this.setState({
      activeKey:key,
    })
  }
  onQuery=(payload)=>{

    this.props.query({
      ...this.props[NAMESPACE].queryFilters||[],
      ...payload||{},
    });

  };
  pageOnChange=(current)=>{
    this.onQuery({page:current})
  };
  tableOnChange=(pagination, filters, sorter)=>{
    this.onQuery({...filters})
  };
  getQueryPanel=()=>{

    const {queryFilters}=this.props[NAMESPACE];

    return (
      <div key="query-panel" style={{marginTop:"15px"}}>
        {this.props.getContainerHeader({
          routes:this.props.routes,
          queryFilters,
          onQuery:this.onQuery
        })}
      </div>
    )
  };
  getStatisticResultPanel=()=>{

    const {commonLayout}=this.props,
          {statistics}=this.props[NAMESPACE].queryResults,
          {title,units,items,icons}=statisticsTextConfig;

    const listClasses=classnames({
      [styles["statistic-list"]]:true,
      [styles["statistic-list-dark"]]:commonLayout.darkTheme,
      ["ant-row-flex"]:true,
      ["ant-row-flex-space-between"]:true,
    });

    const itemClasses=classnames({
      [styles["statistic-item"]]:true,
      ["shadow-hover"]:true,
    });

    const titleClasses=classnames({
      ["secondary-title"]:true,
      ["secondary-title-dark"]:commonLayout.darkTheme,
    });

    const spanConfig={lg:{span:4},md:{span:8},sm:{span:12},xs:{span:24}};

    const statisticItems=statisticDataIndexes.map(k=>{

        let titleClasses=classnames({
          ["txt-color-dark"]:commonLayout.darkTheme,
          [styles["title"]]:true,
        });

        let haveDetails=haveDetailsDataIndexes.indexOf(k)!==-1,
          isFallHosts=k===FALLHOST_DATAINDEX;

        let clickHandle=haveDetails
          ?
          ()=>{
            this.switchModal();
            this.setActiveKey(k);
          }
          :
          null;

        clickHandle=isFallHosts
          ?
          ()=>{
            this.props.dispatch(routerRedux.push("/analyse/fall-host"))
          }
          :
          clickHandle;

        let itemStyles=(haveDetails||isFallHosts)?{"cursor":"pointer"}:null

        return (
          <Col {...spanConfig}
               key={'item-'+k}
               className={styles["statistic-item-wrapper"]}>
            <div style={itemStyles}
                 className={itemClasses}
                 onClick={clickHandle}>
                <span className={styles["statistic-item-icon"]}>
                  {icons[k]}
                </span>
              <p className={styles["counts"]}>
                <CountUp start={0}
                         end={statistics[k]}
                         separator={","}
                         useGrouping={true}
                         duration={1}
                         delay={0}
                         suffix={units[k]}/>
                {/*{statistics[k]}{units[k]}*/}
              </p>
              <h3 className={titleClasses}>
                {tools.getKeyText(k,items)}
              </h3>
              {
                haveDetails
                  ?
                  <span className={styles["statistic-item-check-details"]}>
                        <JoIcon type="ellipsis1"/>
                      </span>
                  :
                  null
              }
              {
                isFallHosts
                  ?
                  <span className={styles["statistic-item-check-details"]}>
                        <JoIcon type="link2"/>
                      </span>
                  :
                  null
              }
            </div>
          </Col>
        )
      }
    );


    return (
      <div key="statistic-panel">
        <h2 className={titleClasses}>{title}</h2>
        <div className={listClasses}>
          {statisticItems}
        </div>
      </div>
    )
  };
  onFilter=(value)=>{
    this.onQuery({mergeCounts:value})
  };
  getDataResultPanel=()=>{

    const {commonLayout}=this.props;
    const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;

    const tableProps={
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns({queryFilters,onSubmit:this.onFilter}),
      expandedRowRender:tableConfig.getExpandedRowRender({isDark:commonLayout.darkTheme}),
      dataSource:data.map((i,index)=>{
        return {
          ...i,
          key:`item-${index}-${lastReqTime}`
        }
      })
    };

    const paginationProps={
      total:queryResults.total,
      current:queryFilters.page,
      onChange:this.pageOnChange,
      pageSize:queryFilters.limit,
    };

    return (
      <div key={"results-panel"}>
        <EnhanciveTable title={tableTextConfig.title}
                        key={"table"+lastReqTime}
                        tableProps={tableProps}
                        isDark={commonLayout.darkTheme}
                        paginationProps={paginationProps}/>
      </div>
    )
  };
  render=()=> {

    const {queryFilters}=this.props[NAMESPACE];

    const pageClasses=classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });

    const modalClasses=classnames({
      [styles["modal"]]:true,
      [styles["modal-dark"]]:this.props.commonLayout.darkTheme
    });

    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getQueryPanel(),
            this.getStatisticResultPanel(),
            this.getDataResultPanel(),
          ])}
        </JoSpin>
        <Modal width={"90%"}
               className={modalClasses}
               style={{top:"80px"}}
               key={`${this.state.visible}-modal-threat-event`}
               footer={null}
               visible={this.state.visible}
               onCancel={this.switchModal}>
          <ThreatEvent defaultActiveKey={this.state.activeKey}
                       timestampRange={queryFilters.timestampRange}/>
        </Modal>
      </div>
    )
  }
}

export default Page;
