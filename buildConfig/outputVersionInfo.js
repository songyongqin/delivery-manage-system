const fs = require('fs')
const version = require('../package.json').version

const versionInfo = {
  buildDate: new Date().getTime(),
  version: version
}

module.exports = () => {
  fs.writeFile("./dist/static/versionInfo.json", JSON.stringify(versionInfo, null, 2), (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("create versionInfo success")
  })
}