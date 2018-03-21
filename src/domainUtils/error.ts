
const onError = (...args) => {
  console.error(...args)
}


export const initGlobalOnErrorListener = () => {
  window.addEventListener("error", onError)
}

export default onError