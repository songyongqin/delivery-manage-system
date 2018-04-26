const outputVersionInfo = require('./outputVersionInfo')
const outputAppConfig = require('./appConfigOutput')

outputVersionInfo().then(_ => outputAppConfig())