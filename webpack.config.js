const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.join(__dirname, "/public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            },
          },
          {
            test: /\.css$/,
            use: [
                "style-loader", 
                "css-loader"
            ]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./frontend/index.html"
        })
    ]        
}