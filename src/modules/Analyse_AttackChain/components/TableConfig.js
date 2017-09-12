/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import constConfig,{stageRowDataIndexes,rowDataIndexes} from '../ConstConfig';
import {Icon,Switch,Card,Timeline,Row,Col} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import TimeLabel from '../../../components/TimesLabel';
import styles from './TableConfig.css';

const {tableTextConfig}=constConfig;

const stageRowRenderer=(value)=>{
  if(!value){
    return;
  }
  return (
    <div>
      {value.map((i,index)=>{
        return <p key={`${index}-title`}>{i.title}</p>
      })}
    </div>
  )
};

const attackTimesRenderer=value=>{
  return <TimeLabel times={value}/>
};

export const getColumns=({queryFilters,getCheckboxOnChange})=>{

  const renderer={attackTimes:attackTimesRenderer},
        titleRenderer={};


  stageRowDataIndexes.forEach(i=>{

    renderer[i]=stageRowRenderer;

    titleRenderer[i]=(
      <div style={{height:"30px",lineHeight:"30px"}}>
        {tableTextConfig.rowTitles[i]}
        <Switch style={{marginLeft:"10px",position:"relative",top:"-2px"}}
                checked={queryFilters.attackStage.indexOf(i)!==-1}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="cross" />}
                onChange={getCheckboxOnChange(i)} />
      </div>
    )
  });

  return tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:{...tableTextConfig.rowTitles,...titleRenderer},
    renderer
  });

};

export const getExpandedRowRender=({isDark})=>{
  const {expandedRow,rowTitles:title}=tableTextConfig;
  return (records)=>{

    const classes=classnames({
      ["expanded-row-dark"]:isDark,
      ["expanded-row-card-item"]:true,
      [styles["flex-item"]]:true,
    });

    const cardKeys=Object.keys(records).filter(i=>stageRowDataIndexes.indexOf(i)!==-1)


    const rows=[];

    const ROW_ITEM_COUNT=2;

    cardKeys.forEach((k,index)=>{
      const ROW_INDEX=Math.round((index+1)/ROW_ITEM_COUNT)-1;

      rows[ROW_INDEX]=rows[ROW_INDEX]||[];
      rows[ROW_INDEX].push(<Card title={tools.getKeyText(k,title)}
                                 key={`${k}-card`}
                                 className={classes}>
        <Timeline>
          {records[k].map((i,index)=>{
            return (
              <Timeline.Item key={`${index}-timeline-item`}>
                <div>
                  <JoTag color="#108ee9">{i.title}</JoTag>
                  <br/><br/>
                  {expandedRow.description+":"}{i.details}
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Card>);

    })


    return (
      <div>
        {rows.map((r,index)=>{
          return (
            <div key={`${index}-row`}
                 className={styles["flex"]}>
              {r}
            </div>
          )
        })}
      </div>

    )

  };
};
