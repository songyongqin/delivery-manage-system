import path from 'path';


module.exports = webpackConfig => {

  webpackConfig.resolve.alias = {
    'components': path.resolve(__dirname, './src/components'),
    'domainComponents': path.resolve(__dirname, './src/domainComponents'),
    'utils': path.resolve(__dirname, './src/utils'),
    'modules': path.resolve(__dirname, './src/modules'),
    'configs': path.resolve(__dirname, "./src/configs"),
    "Generators":path.resolve(__dirname,"./src/Generators")
  }

  return webpackConfig;
}