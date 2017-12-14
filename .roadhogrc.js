export default {
  "entry": "./src/index.js",
  "publicPath": '/static/',
  "outputPath": './dist/static',
  "theme": {
    "@primary-color": "#108ee9",
    "@link-color": "#108ee9",
    "@border-radius-base": "2px",
    "@font-size-base": "16px",
    "@line-height-base": "1.2"
  },
  "autoprefixer": null,
  "proxy": {
    "/": {
      "target": "http://172.31.50.41:7300/mock/5a20f1b18f430a61b2505640/attack-capture-system",
      "changeOrigin": true
    }
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        "babel-plugin-dynamic-import-webpack",
        "transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "babel-plugin-dynamic-import-webpack",
        "transform-decorators-legacy",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  }
}
