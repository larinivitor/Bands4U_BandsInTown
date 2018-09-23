const path = require("path");

module.exports = {
  configureWebpack: 
  {
    output: {
      publicPath: "./"
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        components: path.join(__dirname, "src", "components")
      }
    }
  },
  outputDir: path.resolve(__dirname, "docs")
};
