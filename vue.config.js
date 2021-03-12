module.exports = {
  publicPath: "./",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        // ws: true,
        target: 'http://localhosit:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};