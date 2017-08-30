/**
 * Created by 13944 on 2017/8/1.
 */
/*
* 给单独的dispacth方法添加promise
* */
const createDispatchWithPromise=(dispath)=>{

  return (action={})=>{

    return new Promise((resolve,reject)=>{

      const extraAction=Object.assign({},action,{resolve,reject});

      dispath(extraAction);

    })

  }

}
/*
* 传入mapDispacthToProps 可获得添加promise后的方法
* */
export const createMapDispatchWithPromise=(mapDispatchToProps)=>{

  return (dispatch,ownProps)=>{

    return mapDispatchToProps(createDispatchWithPromise(dispatch),ownProps)

  }
}


