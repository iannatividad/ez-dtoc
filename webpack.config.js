const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development", // or 'production'
  entry: "./src/code.ts", // Adjust this path if your entry file is different
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "code.js",
  },
  resolve: {
    extensions: [".ts", ".js"], // Add '.tsx' if you're using React
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Use /\.tsx?$/ for React projects
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/ui.html", // Path to your UI HTML file
      filename: "ui.html", // Optional: Specify the output name
    }),
  ],
  devtool: "source-map", // This option controls if and how source maps are generated.
};
