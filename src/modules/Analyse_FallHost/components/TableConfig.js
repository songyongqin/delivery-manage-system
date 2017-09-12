/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import {Icon,Switch,Card,Timeline,InputNumber,Button} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import commonConstConfig from '../../../configs/ConstConfig';
import {filterRowDataIndexes,rowDataIndexes,tableTextConfig} from '../ConstConfig';
import FilterInputNumber from '../../../components/FilterInputNumber/FilterInputNumber';
import TimeLabel from '../../../components/TimesLabel';

const rowsRenderer={
  attackTimes:value=>{
    return <TimeLabel times={value}/>
  }
};


export const getColumns=({queryFilters,onSubmit})=>{
  const renderer={
          ...rowsRenderer
        },
        filterOptions={

        };



  return tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:tableTextConfig.rowTitles,
    filterTextConfig:commonConstConfig.textConfig,
    filterOptions:filterOptions,
    filteredValue:queryFilters,
    renderer,
    extraProps:{
      attackCounts:{
        filterIcon:<Icon type="filter" style={{color:"#108ee9"}}/>,
        filterDropdown: <FilterInputNumber  textConfig={{label:"攻击次数筛选",placeholder:"输入整数n，表示不少于n次"}}
                                            defaultValue={queryFilters.attackCounts}
                                            onSubmit={onSubmit}/>

      }
    }
  });

};

export const getExpandedRowRender=({isDark})=>{
  const {expandedRow}=tableTextConfig;
  return (records)=>{

    const classes=classnames({
      ["expanded-row-dark"]:isDark
    });

    const {description}=records;
    return (
      <Card title={tools.getKeyText("title",expandedRow)}
            className={classes}>
        <Timeline>
          {description.map((i,index)=>{
            return (
              <Timeline.Item key={`${index}-timeline-item`}>
                <div>
                  <JoTag color="#108ee9">{i.title}</JoTag>
                  <br/><br/>
                  {expandedRow.description+":"}{i.detials}
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Card>
    );
  };
};

