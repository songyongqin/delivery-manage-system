
let path = require("path")

const getCommonAbsPath = (name) => path.resolve(__dirname, `./src/${name}`)

module.exports = [
  'components',
  'constants',
  'containers',
  'domain',
  'domainComponents',
  'domainUtils',
  'locales',
  'models',
  'routes',
  'secrets',
  'services',
  'statics',
  'styles',
  'themes',
  'utils',
  'navConfig',
  'modules',
].reduce((final, item) => {
  final[item] = getCommonAbsPath(item)
  return final
}, {})