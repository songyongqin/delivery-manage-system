export default asyncModuleChain => {
  return asyncModuleChain.then(asyncModule => {

    if ("default" in asyncModule) {
      asyncModule = asyncModule.default
    }
    if ("state" in asyncModule) {
      return asyncModule
    }
    asyncModule.state = {

    }
    return asyncModule
  })
}