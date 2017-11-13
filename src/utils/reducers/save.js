export default (key, replace = false) =>
  replace
    ?
    (preState, { payload = {} }) => (
      {
        ...preState,
        [key]: payload
      }
    )
    :
    (preState, { payload = {} }) => (
      {
        ...preState,
        [key]: {
          ...preState[key],
          ...payload
        }
      }
    )
