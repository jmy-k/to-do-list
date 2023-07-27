const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devtool: 'inline-source-map', //so i can see where the errors are coming from
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif)$/, //process these file types
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", // send styles into DOM
        "css-loader"], //turn css into js
      },
    ]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};