import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CSSSplitWebpackPlugin from './CSSSplitWebpackPlugin'

module.exports = (webpackConfig, env) => {

  const production = env === 'production'

  webpackConfig.output.filename = '[name].[hash].bundle.js';
  webpackConfig.output.chunkFilename = '[name].[chunkhash].async.js';

  webpackConfig.module.loaders.map(item => {
    if (item.test && item.test.toString() === "/\\.html$/") {
      item.loader = "html"
    }
  })

  if (production) {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./devPublic/index.html"),
      filename: "../index.html"
    }))

    webpackConfig.plugins.push(new CSSSplitWebpackPlugin({
      splitCount: 4
    }))
  } else {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./devPublic/index.html"),
      filename: "index.html"
    }))
  }

  webpackConfig.resolve.alias = {
    'components': path.resolve(__dirname, './src/components'),
    'domainComponents': path.resolve(__dirname, './src/domainComponents'),
    'utils': path.resolve(__dirname, './src/utils'),
    'modules': path.resolve(__dirname, './src/modules'),
    'configs': path.resolve(__dirname, "./src/configs"),
    "Generators": path.resolve(__dirname, "./src/Generators"),
    "domain": path.resolve(__dirname, "./src/domain")
  }

  return webpackConfig;
}