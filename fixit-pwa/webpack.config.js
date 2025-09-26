const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./assets/scss/style.scss",
  output: {
    path: path.resolve(__dirname, "assets/css"),
    filename: "style.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new BrowserSyncPlugin({
      files: ["template/user-app/index.html"],
      host: "localhost",
      port: 3000,
      server: {
        baseDir: ["template/user-app", "./assets"], // Serve both user-app and assets directories
        routes: {
          "/assets": "assets", // Map /assets route to your assets folder
        },
      },
      // server: { baseDir: ["."] },
      injectChanges: true,
    }),
  ],
  watch: true,
};
