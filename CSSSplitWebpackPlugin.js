const fs = require("fs")

const isCSSSuffix = (fileName) => fileName.endsWith(".css")

const splitEvery = (arr, length) => {
  const count = Math.ceil(arr.length / length)
  return new Array(length).fill("").map((_, index) => {
    return arr.slice(index * count, (index + 1) * count)
  })
}

function CSSSplitWebpackPlugin(options) {
  this.options = options || {
    splitCount: 1
  }
}

CSSSplitWebpackPlugin.prototype.apply = function (compiler) {

  const { splitCount = 1 } = this.options

  compiler.plugin('compilation', function (compilation, options) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {

      htmlPluginData.assets.css = htmlPluginData.assets.css.reduce((final, item) => {
        return [...final, ...new Array(splitCount).fill(item).map((_, index) => {
          return item.replace(`.css`, `_${index}.css`)
        })]
      }, [])

      callback(null, htmlPluginData)

    })
  })

  compiler.plugin("emit", function (compilation, callback) {


    Object.entries(compilation.assets)

      .filter(([fileName]) => isCSSSuffix(fileName))

      .filter(([fileName, concatSource]) => "children" in concatSource)

      .map(([fileName, concatSource]) => {


        let fileContent = concatSource["children"].reduce((target, content) => {
          return target + content["_value"]
        }, "").trim()

        let classes = splitEvery(fileContent.split(/\{[^\}]+\}/), splitCount)
        let styles = splitEvery(fileContent.match(/\{[^\}]+\}/gm), splitCount)

        styles.map((item, outerIndex) => {
          return item.reduce((finalFileContent, style, index) => {
            return finalFileContent + classes[outerIndex][index] + style
          }, "").trim()
        })
          .forEach((content, index) => {
            compilation.assets[fileName.replace(`.css`, `_${index}.css`)] = {
              source: function () {
                return content
              },
              size: function () {
                return index + 1
              }
            }
          })

        delete compilation.assets[fileName]

      })


    callback()

  })
}


module.exports = CSSSplitWebpackPlugin