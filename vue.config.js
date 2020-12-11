process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  devServer: {
    disableHostCheck: true,
    host: "localhost",
    watchOptions: {
      // для исключения зацикливания компиляции при hot reload на некоторых машинах
      poll: 1000
    }
  },
  pluginOptions: {
    moment: {
      locales: ['ru']
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    devtool: "source-map",
  },
  transpileDependencies: ["uuid", "@rcr-azure/pdfjs-cbr"]
};
