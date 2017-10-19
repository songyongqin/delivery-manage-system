/**
 * Created by jojo on 2017/9/15.
 */
import React from 'react';


export default namespace=>{

  return WrappedComponent=>{
    return (props)=>{
      if(!props[namespace]){
        console.error("namespace is not define : WithPageOnChange");
      }
      function pageOnChange(current) {
        props.onQuery({page:current});
      }
      return <WrappedComponent {...props} pageOnChange={pageOnChange}/>
    }
  }
}