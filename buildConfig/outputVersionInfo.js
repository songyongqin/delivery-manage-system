const fs = require('fs')
const moment = require('moment')
const version = require('../package.json').version
const { execSync } = require('child_process')
const commitMsg =  execSync(`git log -1  --pretty=format:"%H %cd"`, { encoding:'utf-8' })

const versionInfo = {
  buildDate: moment().format('YYYY-MM-DD HH:mm:ss'),
  version: version,
  commitMsg
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