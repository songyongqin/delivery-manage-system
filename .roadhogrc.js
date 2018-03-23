export default {
  "entry": "./src/index.tsx",
  "publicPath": '/static/',
  "outputPath": './dist/static',
  "proxy": {
    "/user": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/overview": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/analyse": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
    "/warning":"http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system"
  },
  "theme": "./theme.config.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        "transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  }
}
