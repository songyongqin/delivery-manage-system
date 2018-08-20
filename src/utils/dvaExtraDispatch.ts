

export const createDispatchWithPromise = dispatch => {

  return (action = {}) => {

    return new Promise((resolve, reject) => {

      const finalAction = { ...action, resolve, reject }

      dispatch(finalAction)

    })
  }
}

export const createMapDispatchWithPromise = mapDispatchToProps => {
  return (dispatch, ownProps) => {
    return mapDispatchToProps(createDispatchWithPromise(dispatch), ownProps)
  }
}