const path = require("path");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
module.exports = {
  lintOnSave: false,
  configureWebpack: () => ({
    plugins: [
      new SVGSpritemapPlugin("src/_assets/img/icons/*.svg", {
        styles: path.join(__dirname, "src/_assets/styles/_sprites.scss")
      })
    ]
  }),

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/_assets/styles/_mixins.scss"),
        path.resolve(__dirname, "src/_assets/styles/_sprites.scss"),
        path.resolve(__dirname, "src/_assets/styles/_vars.scss")
      ]
    }
  }
};
