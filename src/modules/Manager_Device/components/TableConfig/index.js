/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import {
  deviceRowDataIndexes,
  tableTextConfig,
  devicePropsTextConfig,
  licenceValueTextConfig,
  LICENCE_STATUS_VALUE_DATAINDEX,
  LICENCE_STATUS_EXPIRATION_DATAINDEX,
  LICENCE_OVERDUE_VALUE,
  LICENCE_NULL_VALUE,
  LICENCE_STATUS_DATAINDEX,
  OPERATION_ROW_KEY,
  LICENCE_VALID_VALUE
}from '../../ConstConfig';
import {Progress,Row,Col,Badge,Button,Dropdown,Icon,Menu} from 'antd'
import JoTag from '../../../../components/JoTag';
import TimesLabel from '../../../../components/TimesLabel';
import styles from './styles.css';
import moment from 'moment';
import classnames from 'classnames';

const diskPerRenderer=value=>{
  return <div style={{textAlign:"center"}}>
      <Progress type="dashboard"
                percent={value}
                width={80} />
    </div>
}

const devicePropsRender=value=>{
  return <div style={{textAlign:"center"}}>
    <JoTag color="#108ee9">{devicePropsTextConfig[value]}</JoTag>
  </div>
}


const tagRenderer=value=>{
  return <div style={{textAlign:"center"}}>
    <JoTag color="#108ee9">{value}</JoTag>
  </div>
}

const licenceValueRenderer=(value,isDark)=>{
  if(value===LICENCE_VALID_VALUE){
    return <Badge className={isDark?"lbl-dark":null}
                  status="success"
                  text={licenceValueTextConfig[value]}/>
  }
  return <Badge className={isDark?"lbl-dark":null}
                status="error"
                text={licenceValueTextConfig[value]}/>
}

const getTimeFormat=time=>moment(time*1000).format("YYYY-MM-DD");

const getLiencenRenderer=isDark=>value=>(
    <div style={{textAlign:"center"}} >
      {licenceValueRenderer(value[LICENCE_STATUS_VALUE_DATAINDEX],isDark)}
      <br/><br/>
      {
        value[LICENCE_STATUS_VALUE_DATAINDEX]!==LICENCE_NULL_VALUE
        ?
        <span>授权到期时间:&nbsp;</span>
        :
        null
      }
      {
        value[LICENCE_STATUS_VALUE_DATAINDEX]!==LICENCE_NULL_VALUE
        ?
        <JoTag color="#108ee9">
          {getTimeFormat(value[LICENCE_STATUS_EXPIRATION_DATAINDEX])}
        </JoTag>
        :
        null
      }
    </div>
)

const getOperationRenderer=({isAdmin})=>{
  return records=>{
    const isLicence=records[LICENCE_STATUS_DATAINDEX][LICENCE_STATUS_VALUE_DATAINDEX]===LICENCE_VALID_VALUE,
          menu=(
            <Menu>
              <Menu.Item disabled={isLicence||!isAdmin}>
                <span>
                  <Icon type="unlock"/>&nbsp;授权
                </span>
              </Menu.Item>
              <Menu.Item  disabled={!isAdmin}>
                <span>
                  <Icon type="reload"/>&nbsp;检查升级
                </span>
              </Menu.Item>
              <Menu.Item  disabled={!isAdmin}>
                <span>
                  <Icon type="delete"/>&nbsp;磁盘清理
                </span>
              </Menu.Item>
            </Menu>
          )



    return (
      <div style={{textAlign:"center"}}>
        <Dropdown overlay={menu}>
          <Button icon="ellipsis" />
        </Dropdown>
      </div>
    )

  }
}

export const getColumns=({isDark,isAdmin,handle})=>{

  const renderer={
    diskPer:diskPerRenderer,
    hostIp:tagRenderer,
    deviceProps:devicePropsRender,
    applicationVersion:tagRenderer,
    libraryVersion:tagRenderer,
    licenceStatus:getLiencenRenderer(isDark)
  }


  const finalTitleTextConfig={};

  Object.entries(tableTextConfig.colTitles).forEach(i=>{
    finalTitleTextConfig[i[0]]= <p style={{textAlign:"center"}}>
      {i[1]}
    </p>
  })


  const columns=tableColumnsGenerator({
    keys:deviceRowDataIndexes,
    titleTextConfig:finalTitleTextConfig,
    renderer,

  });

  return isAdmin
    ?
    [
      ...columns,
      {
        title:<p style={{textAlign:"center"}}>
          {tableTextConfig.colTitles[OPERATION_ROW_KEY]}
        </p>,
        key:OPERATION_ROW_KEY,
        render:getOperationRenderer({isAdmin,handle})
      }
    ]
    :
    columns

};


