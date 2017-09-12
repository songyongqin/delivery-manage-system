

import ApiConfig from './ApiConfig'
import * as tools from '../utils/tools';

const httpApi=ApiConfig.http;

const openApi=[
  {
    url:httpApi.USER_SIGN,
    method:"POST"
  }
];

export default (url,options)=>{

  const isOpen=openApi.some(i=>{
    return i.url===url&&i.method===options.method
  });

  if(isOpen){
    return options;
  }

  let token=null;

  try{
    token=tools.getTemp("userData").token
  }catch(e){
    throw e;
  }

  const wrappedHeaders={
    ...options.headers,
    "access-token":token
  };


  return {
    ...options,
    headers:wrappedHeaders
  };
}
