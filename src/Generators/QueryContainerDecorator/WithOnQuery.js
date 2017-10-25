/**
 * Created by jojo on 2017/9/15.
 */
import React from 'react';

const INIT_PAGE = 1;

export default namespace => {

  return WrappedComponent => {
    return (props) => {
      if (!props[namespace]) {
        console.error("namespace is not define : WithOnQuery");
      }
      function onQuery(payload) {
        props.query({
          ...props[namespace].queryFilters || [],
          page: INIT_PAGE,
          ...payload || {},
        });
      }
      return <WrappedComponent {...props} onQuery={onQuery} />
    }
  }
}
