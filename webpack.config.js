import path from 'path';
import webpack from 'webpack'
import aliasConfig from './alias.configs'
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = (webpackConfig, env) => {
  const production = env === 'production'

  webpackConfig.output.filename = 'static/[name].[hash].bundle.js';
  webpackConfig.output.chunkFilename = 'static/[name].[chunkhash].async.js';


  webpackConfig.entry.vendor = [
    "babel-polyfill",
    "dva",
    "dva-loading",
    "react",
    "react-dom",
    "moment"
  ]


  if (production) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }
  // const lessRule = webpackConfig.module.rules[3];

  // const sassRule = { ...lessRule },
  //   sassRuleUse = sassRule.use;

  // sassRule.test = /\.scss$/;

  // sassRuleUse[sassRuleUse.length - 1] = {
  //   loader: "sass"
  // };

  // webpackConfig.module.rules.push(sassRule);

  //awesome-typescript
  // webpackConfig.module.rules[7].use.pop();
  // console.info(webpackConfig.module.rules[7].use[0].options.)

  // return

  webpackConfig.resolve.alias = aliasConfig
  webpackConfig.plugins.push(new CopyWebpackPlugin([
    {
      from: 'src/public',
      to: webpackConfig.output.outputPath,
    },
  ]))
  webpackConfig.plugins.push(new CopyWebpackPlugin([
    {
      from: './config',
      to: path.join(__dirname, './dist/config'),
    },
  ]))
  webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin())
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: "static/vendor.[hash].js"
  }))

  const finalPlugins = webpackConfig.plugins.map(item => {
    if (item instanceof HtmlWebpackPlugin) {
      return new HtmlWebpackPlugin({
        template: `${__dirname}/src/index.ejs`,
        filename: production ? 'index.html' : 'index.html',
      })
    }
    if (item instanceof ExtractTextPlugin) {
      item.filename = 'static/[name].[chunkhash].css'
      return item
    }
    return item
  })

  webpackConfig.plugins = finalPlugins

  return webpackConfig
};
