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
  description:value=>{

    const color="#108ee9";

    try{
      return <div>
        {
          value.map((i,index)=>{
            return <div key={`${index}-des`}
                        style={{marginBottom:"8px"}}>
              <JoTag color={color}
                     // color={index%2===0?"#87d068":"#f50"}
              >
                {i}
              </JoTag>
            </div>
          })
        }
      </div>
    }catch(e){
      console.info(e);
    }
  },
  attackTimes:value=>{
    return <TimeLabel times={value}/>
  }
};



export const getColumns=({queryFilters,onSubmit})=>{

  const renderer={...rowsRenderer},
        filterOptions={};

  filterRowDataIndexes.forEach(k=>{
    /*添加所有选项*/
    filterOptions[k]=commonConstConfig.enums[k];
    /*单元格内内容文本转化*/
    let targetFilter=commonConstConfig.textConfig[k]||{};
    renderer[k]=value=>{
      return value in targetFilter?targetFilter[value]:value;
    }
  });


  return tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:tableTextConfig.rowTitles,
    filterTextConfig:commonConstConfig.textConfig,
    filterOptions:filterOptions,
    filteredValue:queryFilters,
    renderer,
    extraProps:{
      counts:{
        filterIcon:<Icon type="filter" style={{color:"#108ee9"}}/>,
        filterDropdown: <FilterInputNumber  textConfig={{label:"归并次数阈值设置"}}
                                            defaultValue={queryFilters.mergeCounts}
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

    const {details=[],advice}=records;

    return (
      <Card title={tools.getKeyText("title",expandedRow)}
            className={classes}>
        <table>
          <tbody>
          <tr>
            <td style={{padding:"10px 0px",width:"80px"}}>
              {tools.getKeyText("details",expandedRow.rows)}
            </td>
            <td style={{padding:"10px 0px"}}>
              <div>
                {details.map((d,index)=>{
                  return <JoTag key={'item-'+index} color="#108ee9">
                    {d}
                  </JoTag>
                })}
              </div>
            </td>
          </tr>
          <tr>
            <td style={{padding:"10px 0px",width:"80px"}}>
              {tools.getKeyText("advice",expandedRow.rows)}
            </td>
            <td style={{padding:"10px 0px"}}>
              <JoTag color="#108ee9">{advice}</JoTag>
            </td>
          </tr>
          </tbody>
        </table>
      </Card>
    );
  };
};

