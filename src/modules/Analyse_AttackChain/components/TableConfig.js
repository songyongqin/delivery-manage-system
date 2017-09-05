/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import constConfig,{stageRowDataIndexes,rowDataIndexes} from '../ConstConfig';
import {Icon,Switch,Card,Timeline} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';

const {tableTextConfig}=constConfig;

const stageRowRenderer=(value)=>{
  return (
    <div>
      {value.map((i,index)=>{
        return <p key={`${index}-title`}>{i.title}</p>
      })}
    </div>
  )
}


export const getColumns=({queryFilters,getCheckboxOnChange})=>{

  const renderer={},
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
  })

  const result=tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:{...tableTextConfig.rowTitles,...titleRenderer},
    renderer
  })
  return result;

};

export const getExpandedRowRender=({isDark})=>{
  const {expandedRow,rowTitles:title}=tableTextConfig;
  return (records)=>{

    const classes=classnames({
      ["expanded-row-dark"]:isDark,
      ["expanded-row-card-item"]:true,
    });

    const cardKeys=Object.keys(records).filter(i=>stageRowDataIndexes.indexOf(i)!==-1)

    return (
      <div>
        {cardKeys.map(k=>{
          return (
            <Card title={tools.getKeyText(k,title)}
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
            </Card>
          )
        })}
      </div>
    )

  };
};

