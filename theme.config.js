const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

module.exports = () => {
  const themePath = process.env.NODE_ENV === "development"
    ?
    path.join(__dirname, './src/themes/default.less')
    :
    path.join(__dirname, './src/themes/default.prod.less')

  return lessToJs(fs.readFileSync(themePath, 'utf8'))
}
