const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require("fs");

const htmlFolders = [
  "template/user-app",
  "template/provider-app",
  "template/servicemen-app",
  "template/elements",
];

// Recoger todos los archivos HTML dentro de esos directorios
const htmlFiles = htmlFolders.flatMap(folder => {
  const fullPath = path.resolve(__dirname, folder);
  if (fs.existsSync(fullPath)) {
    return fs.readdirSync(fullPath)
      .filter(file => file.endsWith(".html"))
      .map(file => ({
        folder,
        file,
      }));
  }
  return [];
});

module.exports = {
  mode: "production",
  entry: "./assets/scss/style.scss",
  output: {
    path: path.resolve(__dirname, "dist"), // Aseguramos que la salida está dentro de dist/
    filename: "assets/js/[name].bundle.js",
    clean: true, // Limpia los archivos previos en dist/
    publicPath: "./", // Usamos ruta relativa para evitar problemas con las rutas absolutas
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

    // Generar un HtmlWebpackPlugin por cada archivo HTML en cada carpeta
    ...htmlFiles.map(({ folder, file }) => {
      const templatePath = path.resolve(__dirname, folder, file);
      const outputFilename = path.join(
        folder.replace("template", ""), // Eliminar "template" de la ruta para crear directorios relativos en dist
        file
      );

      return new HtmlWebpackPlugin({
        template: templatePath,
        filename: outputFilename,
        inject: false, // No inyecta los scripts automáticamente
      });
    }),

    // Copiar assets y las carpetas de template pero excluyendo archivos .html
    new CopyWebpackPlugin({
      patterns: [
        // Copiar recursos estáticos como imágenes y otros archivos
        { from: "assets", to: path.resolve(__dirname, "dist/assets") },

        // Copiar todas las carpetas de template pero excluyendo los archivos .html
        { 
          from: "template/user-app", 
          to: path.resolve(__dirname, "dist/user-app"), 
          globOptions: { 
            ignore: ['**/*.html'] 
          } 
        },
        { 
          from: "template/provider-app", 
          to: path.resolve(__dirname, "dist/provider-app"), 
          globOptions: { 
            ignore: ['**/*.html'] 
          } 
        },
        { 
          from: "template/servicemen-app", 
          to: path.resolve(__dirname, "dist/servicemen-app"), 
          globOptions: { 
            ignore: ['**/*.html'] 
          } 
        },
        { 
          from: "template/elements/**/*", 
          to: path.resolve(__dirname, "dist/elements"), 
          globOptions: { 
            ignore: [] // Aquí no excluimos nada
          } 
        },
      ],
    }),
  ],
};

