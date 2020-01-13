const alias = require('./alias.configs')
const theme = require('./theme')

// const proxyServer = "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system"

// const proxyServer = "http://172.31.50.41:7300/mock/5b3ae25f3a04b867a240d558/ids"

// const proxyServer = "http://172.31.50.85:3366/mock/5c9c275d5c6cc5480c899da8/v0.2.0"

// const proxyServer = "http://172.31.50.41:7300/mock/5b3ae25f3a04b867a240d558/ids"

// const proxyServer = "http://172.31.50.41:3357/mock/5dedbe5890fac70d0f7e8260"

// const proxyServer = "http://172.31.50.224:80"


// const proxyServer = "http://172.31.50.140:5207"

const proxyServer = "http://172.31.50.41:3357/mock/5de8c6c990fac70d0f7e8242"


const test = 'http://localhost:3366'

export default {
  "alias": alias,
  "theme": theme,
  "entry": {
    "index": "./src/index.tsx"
  },
  "html": { "template": "./src/index.ejs" },
  "publicPath": '/',
  "outputPath": './__dist',
  "proxy": {
    "/home": proxyServer,
    "/user": proxyServer,
    "/analyse": proxyServer,
    "/file": proxyServer,
    "/project": proxyServer,

    "/overview": proxyServer,
    "/warning": proxyServer,
    "/sys-config": proxyServer,
    "/device": proxyServer,
    "/virtual-machine": proxyServer,
    "/occupying": proxyServer,
    "/report": proxyServer,
    "/mirror": proxyServer,
    "/product-type": proxyServer,
    "/snort": proxyServer,
    "/file-restore": proxyServer,
    "/audit": proxyServer,
    "/strategy": proxyServer,
    "/node":proxyServer,
    "/whiteList": proxyServer,
    "/typical-case": proxyServer,
    "/config": proxyServer,
    "/api": proxyServer,
    "/mock": test
  },
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "style": true }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        // "transform-decorators-legacy",
        // ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      enableSourcemaps: true,
      "extraBabelPlugins": [
        // "transform-decorators-legacy",
        // ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  }
}
