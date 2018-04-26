const fs = require('fs')
const version = require('../package.json').version

const versionInfo = {
  buildDate: new Date().getTime(),
  version: version
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./__dist/static/versionInfo.json", JSON.stringify(versionInfo, null, 2), (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      resolve()
      console.log("create versionInfo success")
    })
  })
}