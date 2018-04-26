const alias = require('./alias.configs')
const theme = require('./theme')

const proxyServer = "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system"

export default {
  "alias": alias,
  "theme": theme,
  "entry": "./src/index.tsx",
  "html": { "template": "./src/index.ejs" },
  "publicPath": '/',
  "outputPath": './__dist',
  "proxy": {
    "/user": proxyServer,
    "/overview": proxyServer,
    "/analyse": proxyServer,
    "/warning": proxyServer,
    "/sys-config": proxyServer,
    "/device": proxyServer,
    "/virtual-machine": proxyServer,
    "/occupying": proxyServer,
    "/report": proxyServer,
    "/mirror": proxyServer,
    "/product-type": proxyServer,
    "/snort": proxyServer,
    "/file-restore": proxyServer
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      enableSourcemaps: true,
      "extraBabelPlugins": [
        "transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  }
}
