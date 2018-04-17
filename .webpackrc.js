const alias = require('./alias.configs')
const theme = require('./theme')

export default {
  "alias": alias,
  "theme": theme,
  "entry": "./src/index.tsx",
  "html": { "template": "./src/index.ejs" },
  "publicPath": '/',
  "outputPath": './dist',
  "proxy": {
    "/user": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/overview": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/analyse": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/warning": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/sys-config": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/device": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/virtual-machine": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/occupying": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/report": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system"
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
