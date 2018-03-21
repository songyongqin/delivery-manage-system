

export const createDispatchWithPromise = dispatch => {

  return (action = {}) => {

    return new Promise((resolve, reject) => {

      const finalAction = { ...action, resolve, reject }

      dispatch(finalAction)

    })
  }
}
//为mapDispatchToProps 方法添加promise 方便链式回调
export const createMapDispatchWithPromise = mapDispatchToProps => {
  return (dispatch, ownProps) => {
    return mapDispatchToProps(createDispatchWithPromise(dispatch), ownProps)
  }
}