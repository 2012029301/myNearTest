let path = require("path");
let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");
let config = require("./webpack.config.js");

let lastArg = process.argv[process.argv.length - 1];

let compiler;
let port;

if (lastArg == "attract") {
  console.log("attract start");
  config.entry[0] = "./src/index-attract.tsx";
  compiler = webpack(config);
  port = 3006;
} else if (lastArg == "mobile") {
  console.log("squid mobile app start");
  config.entry[0] = "./src/index-mobile.tsx";
  compiler = webpack(config);
  port = 3005;
} else {
  console.log("squid pc app start");
  config.entry[0] = "./src/index-attract.tsx";
  compiler = webpack(config);
  port = 3004;
}

//init server
let app = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  contentBase: ["./public"],
  hot: true,
  inline: true,
  proxy: {
    "/api/": {
      // /api 表示拦截以/api开头的请求路径
      target: "https://noloss-bsc-test.kakifi.com/api", // 跨域的域名
      pathRewrite: { "^/api/": "" },
      secure: false,
      changeOrigin: true, // 是否开启跨域
    },
  },
});

app.listen(port, null, function (err) {
  if (err) {
    console.log(err);
  }
});

console.log(`listen at http://localhost:${port}`);
