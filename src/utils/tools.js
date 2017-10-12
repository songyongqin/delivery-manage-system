/**
 * Created by jojo on 2017/6/13.
 */
import moment from 'moment';

export const domainRegWithChinese=/^[0-9a-zA-Z\u4e00-\u9faf]+[0-9a-zA-Z\u4e00-\u9faf\.-]*\.[0-9a-zA-Z\u4e00-\u9faf]+$/


export const judgeIP=(str_ip="")=>{
  let ipReg=new RegExp("^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\."
    +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
    +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
    +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$");
  return ipReg.test(str_ip);

}


export const judgeURL =(str_url="")=> {
  let urlReg=/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  return urlReg.test(str_url);
};


export const jsonToQueryString=(jsonObject)=>{


  let keys=Object.keys(jsonObject),
    queryString="?";
  keys.forEach(k=>{

    let content=jsonObject[k]

    try{
      if(content.constructor===[].constructor){
        content=content.join(",")
      }
    }catch(e){
      console.warn(`jsonToQueryString:${e.message}`);
    }

    queryString+=`${k}=${content}&`
  });
  return  queryString.substring(0,queryString.length-1);
};


export const momentToDateFormat=(moment)=>{
  try{
    let year=moment.year(),
      month=moment.month(),
      date=moment.date();
    month+=1;
    month=month<10?`0${month}`:month;
    date=date<10?`0${date}`:date;
    return `${year}${month}${date}`
  }catch(e){
    throw  e;
  }
};

export const createSetResultsReducer=(stateType)=>{
  return (preState,{payload})=>{
    return {
      ...preState,
      isInit:true,
      [stateType]:{
        ...preState[stateType]||{},
        ...payload||{},
      }
    }
  }
}

export const createSetQueryFilters=(filtersKey="queryFilters")=>{
  return (preState,{payload})=>{
    return {
      ...preState,
      [filtersKey]:{
        ...preState[filtersKey]||{},
        ...payload||{}
      }
    }
  }
}

export function download(url="",fileName=url.substring(url.lastIndexOf("/"))) {
  let a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display="none";
  document.body.appendChild(a);
  a.click();
}

export function isFunction(fn,name) {
  if(typeof fn!=="function"){
    throw new Error(`${name} should type of function`)
  }
}

export const getTimeDiff=(before,after)=>{
  return Math.abs((after.unix()-before.unix())/3600/24);
}
export const getDateStr=(start,offset=1)=>{
  const startMoment=moment(start.format("YYYY-MM-DD"));
  const dateStr=[];
  dateStr.push(startMoment.format("YYYY-MM-DD"));
  for(let i=offset-1;i>=0;--i){
    dateStr.push(startMoment.subtract(-1,"days").format("YYYY-MM-DD"));
  }
  return dateStr;
}

export const getDates=(before,after,sort=false)=>{
  const dayDiff=getTimeDiff(before,after);
  return getDateStr(before,dayDiff).sort((before,after)=>{
    return (Date.parse(new Date(before))-Date.parse(new Date(after)))&&sort;
  })
}


export const setTemp=(key,value)=>{
  window.sessionStorage.setItem(key,JSON.stringify(value));
}

export const getTemp=(key)=>{
  return JSON.parse(window.sessionStorage.getItem(key));
}

export const setCache=(key,value)=>{
  window.localStorage.setItem(key,JSON.stringify(value));
}

export const getCache=(key)=>{
  return JSON.parse(window.localStorage.getItem(key));
}


export const momentToTimestamp=(timestampRange=[])=>{
  if(timestampRange.length===0){
    return [0,0]
  }
  return [timestampRange[0].unix(),timestampRange[1].unix()];
}

export const jsonToQueryStringImprove=(jsonObject)=>{


  let keys=Object.keys(jsonObject),
      queryString="?";

  keys.forEach(k=>{

    let content=jsonObject[k]

    try{
      if(content.constructor===[].constructor){

        content.forEach(c=>{
          queryString+=`${k}=${c}&`;
        })

        return;
      }
      if(content===null){

        return;

      }
    }catch(e){

      console.warn(`jsonToQueryString:${e.message}`);

    }
    queryString+=`${k}=${content}&`
  });


  return  queryString.substring(0,queryString.length-1);

};


export const getKeyText=(key,textConfig={})=>{
  return key in textConfig?textConfig[key]:key;
};


export function delay(times) {
  return new Promise((resolve)=>{
    setTimeout(function () {
      resolve();
    },times)
  })
}


export function curry(...args) {
  args=args||[]

  let fn=args[0],
      rest=[...args.slice(1)];

  return ()=>fn(rest);
}


export const getTableRowKey=(index,lastReqTime)=>`item-${index}-${lastReqTime}`
