var path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "web"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
