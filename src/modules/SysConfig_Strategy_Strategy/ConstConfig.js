/**
 * Created by jojo on 2017/10/9.
 */
export const NAMESPACE="strategy";

/*******************************************************************/


export const  PROTOCOLTYPE_DATAINDEX="protocolType",
              USEFUL_DATAINDEX="useful",
              TOTAL_DATAINDEX="total";

export const STRATEGY_OPERATION_KEY="operation";

export const textConfig={
  [PROTOCOLTYPE_DATAINDEX]:"协议类型",
  [TOTAL_DATAINDEX]:"总量",
  [USEFUL_DATAINDEX]:"是否可用",
  [STRATEGY_OPERATION_KEY]:"操作"
}

export const dataIndexes=Object.keys(textConfig);




export const  USERFUL_VALUE=1,
              UN_USEFUL_VALUE=0;
