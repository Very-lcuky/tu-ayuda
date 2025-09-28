const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "production", // 👈 modo producción
  entry: "./assets/scss/style.scss",
  output: {
    path: path.resolve(__dirname, "dist/assets/css"), // 👈 carpeta final dist
    filename: "style.bundle.js",
    clean: true, // limpia la carpeta antes de compilar
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extrae CSS a un archivo
          "css-loader", // interpreta @import y url()
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          "sass-loader", // compila SCSS a CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css", // archivo final de estilos
    }),
  ],
};

