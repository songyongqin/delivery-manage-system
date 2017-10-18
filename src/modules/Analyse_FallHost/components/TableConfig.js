/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import styles from './styles.css'
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import {Icon,Switch,Card,Timeline,InputNumber,Button} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import commonConstConfig from '../../../configs/ConstConfig';
import {filterRowDataIndexes,rowDataIndexes,tableTextConfig} from '../ConstConfig';
import FilterInputNumber from '../../../components/FilterInputNumber/index';
import TimeLabel from '../../../components/TimesLabel';
import {
  ATTACK_COUNTS_DATAINDEX,
  ITEMS_DATAINDEX,
  ATTACK_EVENT_TYPE_DATAINDEX,
  ATTACK_EVENT_TYPE_LIST_DATAINDEX,
  DESCRIPTION_DATAINDEX,
  ATTACKTIMES_DATAINDEX,
  expandTextConfig,
  sourceTextConfig,
  SOURCE_DATAINDEX
} from '../ConstConfig'

const rowsRenderer={
  [ATTACK_EVENT_TYPE_LIST_DATAINDEX]:value=>(
    <div>
      {value.map((i,index)=>(
        <JoTag color="#108ee9"
               key={`${index}-event-item`}>{i}</JoTag>
      ))}
    </div>
  )
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

    const items=records[ITEMS_DATAINDEX]||[]



    return (
      <Card title={tools.getKeyText("title",expandedRow)}
            className={classes}>
        {
          items.map((i,index)=>{

            let description=i[DESCRIPTION_DATAINDEX]||[],
                eventType=i[ATTACK_EVENT_TYPE_DATAINDEX],
                attackCount=i[ATTACK_COUNTS_DATAINDEX],
                attackTime=i[ATTACKTIMES_DATAINDEX]||[],
                source=i[SOURCE_DATAINDEX]

            console.info(source);

            return (
              <table key={`${index}-table`} className={styles["expanded-table"]}>
                <tbody>

                <tr>
                  <td>
                    {tools.getKeyText(ATTACK_EVENT_TYPE_DATAINDEX,expandTextConfig)}
                  </td>
                  <td>
                    {eventType}
                  </td>
                </tr>


                <tr>
                  <td>
                    {tools.getKeyText(SOURCE_DATAINDEX,expandTextConfig)}
                  </td>
                  <td>
                    {tools.getKeyText(source,sourceTextConfig)}
                  </td>
                </tr>


                <tr>
                  <td>
                    {tools.getKeyText(ATTACK_COUNTS_DATAINDEX,expandTextConfig)}
                  </td>
                  <td>
                    {attackCount}
                  </td>
                </tr>


                <tr>
                  <td>
                    {tools.getKeyText(ATTACKTIMES_DATAINDEX,expandTextConfig)}
                  </td>
                  <td>
                    <TimeLabel times={attackTime}/>
                  </td>
                </tr>


                <tr>
                  <td>
                    {tools.getKeyText(DESCRIPTION_DATAINDEX,expandTextConfig)}
                  </td>
                  <td>
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
                  </td>
                </tr>

                </tbody>
              </table>
            )
          })
        }
      </Card>
    );
  };
};

