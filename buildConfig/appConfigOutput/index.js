
const copy = require('copy')
const config = require('./app.config')
const fs = require('fs')
const path = require('path')

const copyStatic = (appKey) => {
  return new Promise((resolve, reject) => {
    copy(
      path.join(__dirname, '../../__dist/**'),
      path.join(__dirname, `../../dist/${appKey}/`),
      function (error, files) {
        if (error) {
          reject(error)
          return
        }
        resolve(files)
      })

  })
}

const outputAppConfig = (appKey, appConfig) => {
  return new Promise((resolve, reject) => {
    const _path = path.join(__dirname, `../../dist/${appKey}/static/config/app.json`)

    fs.writeFile(_path, JSON.stringify(appConfig, null, 2), (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = () => {
  Object.keys(config).map(appKey => {
    copyStatic(appKey)
      .then(_ => outputAppConfig(appKey, config[appKey]))
  })
}

