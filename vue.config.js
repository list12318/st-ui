const webpack = require("webpack");

module.exports = {
  productionSourceMap: false,
  // 将entry指向examples
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      }),
    ],
  },
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 8085,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/design": {
        target: "http://192.168.77.102:9222",
        headers: {
          cookie: "tokenId=C1D60565406B4751B3AF644AE6212C2F",
        },
      },
      "/ipms": {
        target: "http://192.168.77.102:9222",
        headers: {
          cookie: "tokenId=C1D60565406B4751B3AF644AE6212C2F",
        },
      },
      // "/dataV": {
      //   // target: "http://52.82.112.3:15033", //测试环境
      //   target: "http://192.168.10.43:15033", // 伟哥
      //   changeOrigin: true,
      // },
      "/cdn": {
        target: "http://192.168.77.102:9222",
        changeOrigin: true,
      },
    },
  },
};
