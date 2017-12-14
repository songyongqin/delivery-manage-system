import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = (webpackConfig, env) => {

  const production = env === 'production'

  webpackConfig.module.loaders.map(item => {
    if (item.test && item.test.toString() === "/\\.html$/") {
      item.loader = "html"
    }
  })

  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./devPublic/index.html"),
    filename: "index.html"
  }))

  webpackConfig.resolve.alias = {
    'components': path.resolve(__dirname, './src/components'),
    'domainComponents': path.resolve(__dirname, './src/domainComponents'),
    'utils': path.resolve(__dirname, './src/utils'),
    'modules': path.resolve(__dirname, './src/modules'),
    'configs': path.resolve(__dirname, "./src/configs"),
    "Generators": path.resolve(__dirname, "./src/Generators")
  }

  return webpackConfig;
}