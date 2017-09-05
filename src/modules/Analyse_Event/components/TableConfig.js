/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import {Icon,Switch,Card,Timeline} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import commonConstConfig from '../../../configs/ConstConfig';
import {filterRowDataIndexes,rowDataIndexes,tableTextConfig} from '../ConstConfig';


const rowsRenderer={
  description:value=>{
    try{
      return <div>
        {
          value.map((i,index)=>{
            return <div key={`${index}-des`}
                        style={{marginBottom:"8px"}}>
              <JoTag color={index%2===0?"#87d068":"#f50"}>
                {i}
              </JoTag>
            </div>
          })
        }
      </div>
    }catch(e){
      console.info(e);
    }
  }
}

export const getColumns=({queryFilters})=>{

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
  })



  const result=tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:tableTextConfig.rowTitles,
    filterTextConfig:commonConstConfig.textConfig,
    filterOptions:filterOptions,
    filteredValue:queryFilters,
    renderer
  })

  return result;

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
                  return <JoTag key={'item-'+index} color="#87d068">
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
              <JoTag color="#f50">{advice}</JoTag>
            </td>
          </tr>
          </tbody>
        </table>
      </Card>
    );
  };
};

