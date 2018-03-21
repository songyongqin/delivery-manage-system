/**
 * Created by jojo on 2017/10/9.
 */
export const NAMESPACE="whiteList";

/*******************************************************************/


export const  TYPE_DATAINDEX="type",
              FEATURE_DATAINDEX="feature",
              OPEN_DATAINDEX="open",
              ID_DATAINDEX="id";

export const STRATEGY_OPERATION_KEY="operation";

export const textConfig={
  [TYPE_DATAINDEX]:"白名单类型",
  [FEATURE_DATAINDEX]:"白名单特征",
  [OPEN_DATAINDEX]:"是否可用",
  [STRATEGY_OPERATION_KEY]:"操作"
}

export const dataIndexes=Object.keys(textConfig);

export const DOMAIN_TYPE="domain",
             IP_TYPE="ip";

export const typeTextConfig={
  [DOMAIN_TYPE]:"域名",
  [IP_TYPE]:"IP"
}

export const types=Object.keys(typeTextConfig)

export const  OPEN_VALUE=1,
              UN_OPEN_VALUE=0;
