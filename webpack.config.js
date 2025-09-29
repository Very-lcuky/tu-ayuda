const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require("fs");

// Buscar todos los .html en la carpeta raíz
const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".html"));

module.exports = {
  mode: "production",
  entry: "./assets/scss/style.scss", // entrada: estilos SCSS
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].bundle.js",
    clean: true,
    publicPath: "./", // rutas relativas → funcionan en IPFS
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
      filename: "assets/css/style.css",
    }),

    // Generar automáticamente un HtmlWebpackPlugin para cada HTML
    ...htmlFiles.map(file =>
      new HtmlWebpackPlugin({
        template: `./${file}`,
        filename: file,
        inject: false, // no inyecta scripts, solo copia el HTML
      })
    ),

    // Copiar assets completos a dist/assets
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
  ],
};

